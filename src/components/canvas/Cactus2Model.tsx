import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'
import { useMemo } from 'react'
import { createToonStyle } from './toonStyle'

type GLTFResult = GLTF & {
  nodes: {
    cactus_tall: THREE.Mesh
  }
  materials: {
    CactusTall_Toon: THREE.MeshPhysicalMaterial
  }
}

export function Cactus2Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/cactus2_model.glb') as unknown as GLTFResult
  const { toon, outline } = useMemo(() => createToonStyle(materials.CactusTall_Toon, 0.002), [materials])
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cactus_tall.geometry}
        material={toon}
      />
      <mesh geometry={nodes.cactus_tall.geometry} material={outline} />
    </group>
  )
}

useGLTF.preload('/cactus2_model.glb')
