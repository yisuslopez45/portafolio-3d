
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'
import { useMemo } from 'react'
import { createToonStyle } from './toonStyle'


type GLTFResult = GLTF & {
  nodes: {
    books: THREE.Mesh
  }
  materials: {
    Books_Toon: THREE.MeshPhysicalMaterial
  }
}

export function Books1Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/books1_model.glb') as unknown as GLTFResult
  const { toon, outline } = useMemo(() => createToonStyle(materials.Books_Toon, 0.002), [materials])
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.books.geometry}
        material={toon}
      />
      <mesh geometry={nodes.books.geometry} material={outline} />
    </group>
  )
}

useGLTF.preload('/books1_model.glb')
