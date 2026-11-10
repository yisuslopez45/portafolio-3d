import * as THREE from 'three'
import { useMemo } from 'react'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'
import { createToonStyle } from './toonStyle'

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

// Cada post-it con la posición donde va pegado en el tablero.
const POSTITS = [
  { node: 'postit_1', position: [-0.3, 0.43, 0.003] },
  { node: 'postit_2', position: [0, 0.46, 0.003] },
  { node: 'postit_3', position: [0.3, 0.41, 0.003] },
  { node: 'postit_4', position: [-0.15, 0.22, 0.003] },
  { node: 'postit_5', position: [0.17, 0.2, 0.003] },
] as const

export function BulletinModel(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/bulletin-model.glb') as unknown as GLTFResult
  const board = useMemo(() => createToonStyle(materials.Board_Toon, 0.002), [materials])
  // Los post-its son láminas delgadas: contorno más fino para que no se vean gruesos.
  const postit = useMemo(() => createToonStyle(materials.Postit_Baked, 0.001), [materials])
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.bulletin_board.geometry}
        material={board.toon}
      />
      <mesh geometry={nodes.bulletin_board.geometry} material={board.outline} />
      {POSTITS.map(({ node, position }) => (
        <group key={node} position={position}>
          <mesh castShadow receiveShadow geometry={nodes[node].geometry} material={postit.toon} />
          <mesh geometry={nodes[node].geometry} material={postit.outline} />
        </group>
      ))}
    </group>
  )
}

useGLTF.preload('/bulletin-model.glb')
