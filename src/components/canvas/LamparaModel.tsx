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

const MESHES = [
  'foco_1',
  'foco_2',
  'foco_3',
  'foco_4',
  'lampara_1',
  'lampara_2',
  'lampara_3',
] as const

export function LamparaModel(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/lampara-model.glb') as unknown as GLTFResult

  const { toon, outline } = useMemo(
    () => createToonStyle(materials.BakedMaterial_GLB),
    [materials],
  )

  return (
    <group scale={LAMPARA_SCALE} {...props} dispose={null}>
      {MESHES.map((name) => (
        <group key={name}>
          <mesh geometry={nodes[name].geometry} material={toon} castShadow receiveShadow />
          <mesh geometry={nodes[name].geometry} material={outline} />
        </group>
      ))}
    </group>
  )
}

useGLTF.preload('/lampara-model.glb')
