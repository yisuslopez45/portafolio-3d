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

const LED_COLORS = ['#00ff88', '#00ff88', '#ffaa00', '#00ff88', '#ff3355', '#00ff88', '#00aaff']


export function ServerModel(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/server_model.glb') as unknown as GLTFResult
    const { toon, outline } = useMemo(() => createToonStyle(materials.Toon_Palette, 0.002), [materials])


    const ledMaterials = useMemo(
        () => LED_COLORS.map((color) => {
            const m = materials.Toon_LED.clone()
            m.emissive = new THREE.Color(color)
            m.emissiveIntensity = 0
            m.toneMapped = false   // evita que el tone mapping apague el brillo
            return m
        }),
        [materials]
    )

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime()
        ledMaterials.forEach((m, i) => {
            m.emissiveIntensity = Math.sin(t * 3 + i * 1.3) > 0 ? 2 : 0.05
        })
    })


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
            { ledMaterials.map((mat, i)=>(
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes[`server_led_${i + 1}` as keyof typeof nodes].geometry}
                    material={ledMaterials[i]}
                />
            ))}
           
        </group>
    )
}

useGLTF.preload('/server_model.glb')