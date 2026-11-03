import * as THREE from 'three'
import { useGLTF, useTexture } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'
import { useMemo } from 'react'
import { createToonStyle } from './toonStyle'

const SCREEN_IMAGE = '/imgs/background_pc.jpeg'

// Las UV de la pantalla vienen empaquetadas en el atlas del modelo; se rehacen proyectando la pantalla de frente (x, y).
// La imagen (2464 x 1728) tiene casi la misma proporción que la pantalla (0.27 x 0.19), así que la cubre entera.
function createScreenGeometry(source: THREE.BufferGeometry) {
    const geometry = source.clone()
    geometry.computeBoundingBox()
    const { min, max } = geometry.boundingBox!
    const width = max.x - min.x
    const height = max.y - min.y
    const pos = geometry.getAttribute('position')
    const uv = new Float32Array(pos.count * 2)
    for (let i = 0; i < pos.count; i++) {
        uv[i * 2] = (pos.getX(i) - min.x) / width
        uv[i * 2 + 1] = (pos.getY(i) - min.y) / height
    }
    geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
    return geometry
}

type GLTFResult = GLTF & {
    nodes: {
        computer_body: THREE.Mesh
        computer_screen: THREE.Mesh
        rack_1: THREE.Mesh
        rack_2: THREE.Mesh
        rack_3: THREE.Mesh
        rack_4: THREE.Mesh
    }
    materials: {
        Toon_Palette: THREE.MeshPhysicalMaterial
        Toon_Screen: THREE.MeshStandardMaterial
    }
}


export function ComputerModel(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/computer-model.glb') as unknown as GLTFResult
    const { toon, outline } = useMemo(() => createToonStyle(materials.Toon_Palette , 0.002 ), [materials])
    const screenTexture = useTexture(SCREEN_IMAGE)
    screenTexture.colorSpace = THREE.SRGBColorSpace
    const screenGeometry = useMemo(() => createScreenGeometry(nodes.computer_screen.geometry), [nodes])


    return (
        <group  rotation={[0, Math.PI/4, 0]} {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.computer_body.geometry}
                material={toon}
            />
            <mesh  
                geometry={nodes.computer_body.geometry} 
                material={outline} 
            />
            
            {/* Sin luces (meshBasicMaterial): la pantalla emite su propia imagen. */}
            <mesh geometry={screenGeometry}>
                <meshBasicMaterial map={screenTexture} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.rack_1.geometry}
                material={nodes.rack_1.material}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.rack_2.geometry}
                material={nodes.rack_2.material}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.rack_3.geometry}
                material={nodes.rack_3.material}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.rack_4.geometry}
                material={nodes.rack_4.material}
            />
        </group>
    )
}

useGLTF.preload('/computer-model.glb')
useTexture.preload(SCREEN_IMAGE)