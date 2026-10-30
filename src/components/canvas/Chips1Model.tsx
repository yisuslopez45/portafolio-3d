
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'
import { useMemo } from 'react'
import { createToonStyle } from './toonStyle'


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
  // El chip mide ~1 cm: con el grosor normal (2 mm) el contorno lo taparía.
  const { toon, outline } = useMemo(() => createToonStyle(materials.NE555_Toon, 0.0005), [materials])
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.ne555.geometry}
        material={toon}
      />
      <mesh geometry={nodes.ne555.geometry} material={outline} />
    </group>
  )
}

useGLTF.preload('/chips1_model.glb')
