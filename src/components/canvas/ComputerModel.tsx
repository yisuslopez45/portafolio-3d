import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'
import { useMemo } from 'react'
import { createToonStyle } from './toonStyle'

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
    const { toon, outline } = useMemo(() => createToonStyle(materials.Toon_Palette , 0.0002 ), [materials])


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
            
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.computer_screen.geometry}
                material={materials.Toon_Screen}
            />
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