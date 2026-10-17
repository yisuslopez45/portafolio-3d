import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'

type GLTFResult = GLTF & {
  nodes: {
    bulletin_board: THREE.Mesh
    postit_1: THREE.Mesh
    postit_2: THREE.Mesh
    postit_3: THREE.Mesh
    postit_4: THREE.Mesh
    postit_5: THREE.Mesh
  }
  materials: {
    Board_Toon: THREE.MeshPhysicalMaterial
    Postit_Baked: THREE.MeshPhysicalMaterial
  }
}

export function BulletinModel(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/bulletin-model.glb') as unknown as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bulletin_board.geometry}
        material={materials.Board_Toon}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.postit_1.geometry}
        material={materials.Postit_Baked}
        position={[-0.3, 0.43, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.postit_2.geometry}
        material={materials.Postit_Baked}
        position={[0, 0.46, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.postit_3.geometry}
        material={materials.Postit_Baked}
        position={[0.3, 0.41, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.postit_4.geometry}
        material={materials.Postit_Baked}
        position={[-0.15, 0.22, 0.003]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.postit_5.geometry}
        material={materials.Postit_Baked}
        position={[0.17, 0.2, 0.003]}
      />
    </group>
  )
}

useGLTF.preload('/bulletin-model.glb')
