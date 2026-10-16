import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import  type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'
import { useMemo } from 'react'
import { createToonStyle } from './toonStyle'


type GLTFResult = GLTF & {
  nodes: {
    support: THREE.Mesh
    table: THREE.Mesh
  }
  materials: {
    support_mat: THREE.MeshPhysicalMaterial
  }
}

const REPISA_SCALE = 0.01

export function RepisaModel(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/repisa_model.glb') as unknown as GLTFResult

  const { toon, outline } = useMemo(() => createToonStyle(materials.support_mat ), [materials])

  return (
    <group scale={REPISA_SCALE} {...props} dispose={null}>
      <mesh geometry={nodes.support.geometry} material={toon} castShadow receiveShadow />
      <mesh geometry={nodes.support.geometry} material={outline} />
      <mesh geometry={nodes.table.geometry} material={toon} castShadow receiveShadow />
      <mesh geometry={nodes.table.geometry} material={outline} />
    </group>
  )
}

useGLTF.preload('/repisa_model.glb')
