import { useMemo } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import type { JSX } from 'react/jsx-runtime'
import type { GLTF } from 'three-stdlib'
import { createToonStyle } from './toonStyle'

type GLTFResult = GLTF & {
  nodes: {
    foco_1: THREE.Mesh
    foco_2: THREE.Mesh
    foco_3: THREE.Mesh
    foco_4: THREE.Mesh
    lampara_1: THREE.Mesh
    lampara_2: THREE.Mesh
    lampara_3: THREE.Mesh
  }
  materials: {
    BakedMaterial_GLB: THREE.MeshPhysicalMaterial
  }
}

const LAMPARA_SCALE = 0.01

export function LamparaModel(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/lampara-model.glb') as unknown as GLTFResult

  const { toon, outline } = useMemo(
    () => createToonStyle(materials.BakedMaterial_GLB),
    [materials],
  )

  return (
    <group scale={LAMPARA_SCALE} {...props} dispose={null}>
      <mesh geometry={nodes.foco_1.geometry} material={toon} castShadow receiveShadow />
      <mesh geometry={nodes.foco_1.geometry} material={outline} />
      <mesh geometry={nodes.foco_2.geometry} material={toon} castShadow receiveShadow />
      <mesh geometry={nodes.foco_2.geometry} material={outline} />
      <mesh geometry={nodes.foco_3.geometry} material={toon} castShadow receiveShadow />
      <mesh geometry={nodes.foco_3.geometry} material={outline} />
      <mesh geometry={nodes.foco_4.geometry} material={toon} castShadow receiveShadow />
      <mesh geometry={nodes.foco_4.geometry} material={outline} />
      <mesh geometry={nodes.lampara_1.geometry} material={toon} castShadow receiveShadow />
      <mesh geometry={nodes.lampara_1.geometry} material={outline} />
      <mesh geometry={nodes.lampara_2.geometry} material={toon} castShadow receiveShadow />
      <mesh geometry={nodes.lampara_2.geometry} material={outline} />
      <mesh geometry={nodes.lampara_3.geometry} material={toon} castShadow receiveShadow />
      <mesh geometry={nodes.lampara_3.geometry} material={outline} />
    </group>
  )
}

useGLTF.preload('/lampara-model.glb')
