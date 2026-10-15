



import * as THREE from 'three'
import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import { createToonStyle } from './toonStyle'
import type { JSX } from 'react/jsx-runtime'

type GLTFResult = GLTF & {
  nodes: {
    table: THREE.Mesh
  }
  materials: {
    table_mat: THREE.MeshStandardMaterial
  }
}

export const DESKTOP_SCALE = 0.01
export const DESKTOP_TOP_Y = 0.715

export function DesktopModel(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/desktop-model.glb') as unknown as GLTFResult
  const { toon, outline } = useMemo(() => createToonStyle(materials.table_mat), [materials])

  return (
    <group scale={DESKTOP_SCALE} {...props} dispose={null}>
      <group rotation={[Math.PI, -0.004, Math.PI]}>
        <mesh geometry={nodes.table.geometry} material={toon} castShadow receiveShadow />
        <mesh geometry={nodes.table.geometry} material={outline} />
      </group>
    </group>
  )
}

useGLTF.preload('/desktop-model.glb')
