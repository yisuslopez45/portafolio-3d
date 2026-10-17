import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'

type GLTFResult = GLTF & {
  nodes: {
    room_baseboard: THREE.Mesh
    room_floor: THREE.Mesh
    room_wall_front: THREE.Mesh
    room_wall_left_1: THREE.Mesh
    room_wall_left_2: THREE.Mesh
    room_wall_right_1: THREE.Mesh
    room_wall_right_2: THREE.Mesh
    window_frame: THREE.Mesh
  }
  materials: {
    Room_Wood: THREE.MeshPhysicalMaterial
    Room_Floor: THREE.MeshPhysicalMaterial
    Room_Wall: THREE.MeshPhysicalMaterial
  }
}

export function RoomModel(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/room_model.glb') as unknown as GLTFResult
  return (
    <group scale={1} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.room_baseboard.geometry}
        material={materials.Room_Wood}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.room_floor.geometry}
        material={materials.Room_Floor}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.room_wall_front.geometry}
        material={materials.Room_Wall}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.window_frame.geometry}
        material={materials.Room_Wood}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.room_wall_left_1.geometry}
        material={materials.Room_Wall}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.room_wall_left_2.geometry}
        material={materials.Room_Wood}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.room_wall_right_1.geometry}
        material={materials.Room_Wall}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.room_wall_right_2.geometry}
        material={materials.Room_Wood}
      />
    </group>
  )
}

useGLTF.preload('/room_model.glb')