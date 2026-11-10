
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'
import { useMemo } from 'react'
import { createToonStyle } from './toonStyle'

type GLTFResult = GLTF & {
    nodes: {
        shelf: THREE.Mesh
    }
    materials: {
        Toon_Palette: THREE.MeshPhysicalMaterial
    }
}

export function ShelfModel(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/shelf_model.glb') as unknown as GLTFResult
    const { toon, outline } = useMemo(() => createToonStyle(materials.Toon_Palette, 0.002), [materials])


    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.shelf.geometry}
                material={toon}
            />
            <mesh
                geometry={nodes.shelf.geometry}
                material={outline}
            />
        </group>
    )
}

useGLTF.preload('/shelf_model.glb')
