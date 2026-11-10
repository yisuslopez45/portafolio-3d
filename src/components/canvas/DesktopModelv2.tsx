import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'
import { useMemo } from 'react'
import { createToonStyle } from './toonStyle'

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
  // El GLB está en cm (por eso scale 0.01), así que usa el grosor de contorno por defecto.
  const { toon, outline } = useMemo(() => createToonStyle(materials.table_mat), [materials])
  return (
    <group scale={0.01} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.table.geometry}
        material={toon}
      />
      <mesh geometry={nodes.table.geometry} material={outline} />
    </group>
  )
}

useGLTF.preload('/table-desktop-toon-v2.glb')
