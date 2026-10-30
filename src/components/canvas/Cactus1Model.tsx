import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'

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
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cactus_pot.geometry}
        material={materials.CactusPot_Toon}
      />
    </group>
  )
}

useGLTF.preload('/cactus1_model.glb')

