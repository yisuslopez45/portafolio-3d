
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'


type GLTFResult = GLTF & {
  nodes: {
    books_2: THREE.Mesh
  }
  materials: {
    Books2_Toon: THREE.MeshPhysicalMaterial
  }
}

export function Books2Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/books2_model.glb') as unknown as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.books_2.geometry}
        material={materials.Books2_Toon}
      />
    </group>
  )
}

useGLTF.preload('/books2_model.glb')