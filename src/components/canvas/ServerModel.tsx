import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'
import { useMemo, useRef } from 'react'
import { createToonStyle } from './toonStyle'
import { useFrame } from '@react-three/fiber'

type GLTFResult = GLTF & {
    nodes: {
        server: THREE.Mesh
        server_led_1: THREE.Mesh
        server_led_2: THREE.Mesh
        server_led_3: THREE.Mesh
        server_led_4: THREE.Mesh
        server_led_5: THREE.Mesh
        server_led_6: THREE.Mesh
        server_led_7: THREE.Mesh
    }
    materials: {
        Toon_Palette: THREE.MeshPhysicalMaterial
        Toon_LED: THREE.MeshPhysicalMaterial
    }
}

export function ServerModel(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/server_model.glb') as unknown as GLTFResult
    const { toon, outline } = useMemo(() => createToonStyle(materials.Toon_Palette, 0.002), [materials])
    
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.server.geometry}
                material={toon}
            />
            <mesh
                geometry={nodes.server.geometry}
                material={outline}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.server_led_1.geometry}
                material={materials.Toon_LED}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.server_led_2.geometry}
                material={materials.Toon_LED}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.server_led_3.geometry}
                material={materials.Toon_LED}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.server_led_4.geometry}
                material={materials.Toon_LED}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.server_led_5.geometry}
                material={materials.Toon_LED}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.server_led_6.geometry}
                material={materials.Toon_LED}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.server_led_7.geometry}
                material={materials.Toon_LED}
            />
        </group>
    )
}

useGLTF.preload('/server_model.glb')