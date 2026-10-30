
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'


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
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.books.geometry}
        material={materials.Books_Toon}
      />
    </group>
  )
}

useGLTF.preload('/books1_model.glb')
