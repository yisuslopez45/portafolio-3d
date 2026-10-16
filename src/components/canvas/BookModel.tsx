import * as THREE from 'three'
import React, { useMemo, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'
import { createToonStyle } from './toonStyle'

type GLTFResult = GLTF & {
    nodes: {
        books: THREE.Mesh
    }
    materials: {
        Toon_Palette: THREE.MeshPhysicalMaterial
    }
}

export function BookModel(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/book_model.glb') as unknown as GLTFResult
    const { toon, outline } = useMemo(() => createToonStyle(materials.Toon_Palette, 0.002), [materials])


    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.books.geometry}
                material={toon}
            />
            <mesh
                geometry={nodes.books.geometry}
                material={outline}
            />
        </group>
    )
}

useGLTF.preload('/book_model.glb')
