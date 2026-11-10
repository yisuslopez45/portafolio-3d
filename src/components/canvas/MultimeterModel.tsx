
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'
import { useMemo } from 'react'
import { createToonStyle } from './toonStyle'

type GLTFResult = GLTF & {
  nodes: {
    multimeter: THREE.Mesh
  }
  materials: {
    Multimeter_Toon: THREE.MeshPhysicalMaterial
  }
}

export function MultimeterModel(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/multimeter_model.glb') as unknown as GLTFResult
  const { toon, outline } = useMemo(() => createToonStyle(materials.Multimeter_Toon, 0.002), [materials])
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.multimeter.geometry}
        material={toon}
      />
      <mesh geometry={nodes.multimeter.geometry} material={outline} />
    </group>
  )
}

useGLTF.preload('/multimeter_model.glb')
