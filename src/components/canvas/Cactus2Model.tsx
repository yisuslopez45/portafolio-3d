import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'

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
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cactus_tall.geometry}
        material={materials.CactusTall_Toon}
      />
    </group>
  )
}

useGLTF.preload('/cactus2_model.glb')

