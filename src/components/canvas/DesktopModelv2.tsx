import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'

type GLTFResult = GLTF & {
  nodes: {
    table: THREE.Mesh
  }
  materials: {
    table_mat: THREE.MeshStandardMaterial
  }
}

export function DesktopModelv2(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/table-desktop-toon-v2.glb') as unknown as GLTFResult
  return (
    <group scale={0.01} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.table.geometry}
        material={materials.table_mat}
      />
    </group>
  )
}

useGLTF.preload('/table-desktop-toon-v2.glb')
