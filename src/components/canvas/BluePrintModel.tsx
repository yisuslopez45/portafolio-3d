
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'

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
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.blueprint.geometry}
        material={materials.Blueprint_Toon}
      />
    </group>
  )
}

useGLTF.preload('/blueprint_model.glb')
