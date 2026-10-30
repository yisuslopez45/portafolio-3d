
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'


type GLTFResult = GLTF & {
  nodes: {
    ne555: THREE.Mesh
  }
  materials: {
    NE555_Toon: THREE.MeshPhysicalMaterial
  }
}

export function Chips1Model(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/chips1_model.glb') as unknown as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ne555.geometry}
        material={materials.NE555_Toon}
      />
    </group>
  )
}

useGLTF.preload('/chips1_model.glb')
