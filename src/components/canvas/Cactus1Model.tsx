import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'
import { useMemo } from 'react'
import { createToonStyle } from './toonStyle'

type GLTFResult = GLTF & {
  nodes: {
    cactus_pot: THREE.Mesh
  }
  materials: {
    CactusPot_Toon: THREE.MeshPhysicalMaterial
  }
}

export function Cactus1Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/cactus1_model.glb')  as unknown as GLTFResult
  const { toon, outline } = useMemo(() => createToonStyle(materials.CactusPot_Toon, 0.002), [materials])
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cactus_pot.geometry}
        material={toon}
      />
      <mesh geometry={nodes.cactus_pot.geometry} material={outline} />
    </group>
  )
}

useGLTF.preload('/cactus1_model.glb')
