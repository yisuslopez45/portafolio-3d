import * as THREE from 'three'
import React, { useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'
import { createToonStyle } from './toonStyle'

type GLTFResult = GLTF & {
    nodes: {
        joystick: THREE.Mesh
        joystick_stick: THREE.Mesh
        keyboard: THREE.Mesh
        mouse: THREE.Mesh
    }
    materials: {
        Toon_Peripherals: THREE.MeshPhysicalMaterial
    }
}

export function PeripheralModel(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/peripheral_model.glb') as unknown as GLTFResult
    const { toon, outline } = useMemo(() => createToonStyle(materials.Toon_Peripherals, 0.002), [materials])

    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.joystick.geometry}
                material={toon}
                position={[-0.216, 0, 0.009]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.joystick_stick.geometry}
                    material={toon}
                    position={[-0.002, 0.017, -0.022]}
                />
                <mesh
                    geometry={nodes.joystick_stick.geometry}
                    material={outline}
                    position={[-0.002, 0.017, -0.022]}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.keyboard.geometry}
                material={toon}
                position={[0.022, 0, 0]}
            />

            <mesh
                geometry={nodes.keyboard.geometry}
                material={outline}
                position={[0.022, 0, 0]}
            />

            <mesh
                castShadow
                receiveShadow
                geometry={nodes.mouse.geometry}
                material={toon}
                position={[0.235, 0, 0.006]}
            />

            <mesh
                geometry={nodes.mouse.geometry}
                material={outline}
                position={[0.235, 0, 0.006]}
            />
        </group>
    )
}

useGLTF.preload('/peripheral_model.glb')