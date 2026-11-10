import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'
import { useMemo } from 'react'
import { createToonStyle } from './toonStyle'

type GLTFResult = GLTF & {
  nodes: {
    desk_mat: THREE.Mesh
  }
  materials: {
    DeskMat_Toon: THREE.MeshPhysicalMaterial
  }
}

export function DeskMatModel(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/deskmat_model.glb') as unknown as GLTFResult
  const { toon, outline } = useMemo(() => createToonStyle(materials.DeskMat_Toon, 0.001), [materials])

  
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.desk_mat.geometry}
        material={toon}
      />
      <mesh
        geometry={nodes.desk_mat.geometry}
        material={outline}
      />
    </group>
  )
}

useGLTF.preload('/deskmat_model.glb')
