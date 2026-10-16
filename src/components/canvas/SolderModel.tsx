import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'
import { useMemo } from 'react'
import { createToonStyle } from './toonStyle'

type GLTFResult = GLTF & {
    nodes: {
        solder_base: THREE.Mesh
        solder_button: THREE.Mesh
        solder_iron: THREE.Mesh
        solder_tip: THREE.Mesh
        solder_knob: THREE.Mesh
    }
    materials: {
        Toon_Palette: THREE.MeshPhysicalMaterial
        Toon_Tip: THREE.MeshPhysicalMaterial
    }
}

export function SolderModel(props: JSX.IntrinsicElements['group']) {

    const { nodes, materials } = useGLTF('/solder_model.glb') as unknown as GLTFResult
    const { toon, outline } = useMemo(() => createToonStyle(materials.Toon_Palette, 0.002 ), [materials])

    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.solder_base.geometry}
                material={toon}
            />

            <mesh
                geometry={nodes.solder_base.geometry}
                material={outline}
            />
            
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.solder_button.geometry}
                material={materials.Toon_Palette}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.solder_iron.geometry}
                material={materials.Toon_Palette}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.solder_tip.geometry}
                    material={materials.Toon_Tip}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.solder_knob.geometry}
                material={materials.Toon_Palette}
            />
        </group>
    )
}

useGLTF.preload('/solder_model.glb')