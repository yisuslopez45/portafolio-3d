
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'
import { useMemo } from 'react'
import { createToonStyle } from './toonStyle'

type GLTFResult = GLTF & {
  nodes: {
    blueprint: THREE.Mesh
  }
  materials: {
    Blueprint_Toon: THREE.MeshPhysicalMaterial
  }
}

export function BluePrintModel(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/blueprint_model.glb') as unknown as GLTFResult
  // Es una hoja de 3 mm: con 1 mm de contorno basta para marcar el borde.
  const { toon, outline } = useMemo(() => createToonStyle(materials.Blueprint_Toon, 0.001), [materials])
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.blueprint.geometry}
        material={toon}
      />
      <mesh geometry={nodes.blueprint.geometry} material={outline} />
    </group>
  )
}

useGLTF.preload('/blueprint_model.glb')
