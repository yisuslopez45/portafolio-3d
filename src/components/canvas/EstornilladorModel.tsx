
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'
import { useMemo } from 'react'
import { createToonStyle } from './toonStyle'

type GLTFResult = GLTF & {
  nodes: {
    screwdriver: THREE.Mesh
  }
  materials: {
    Screwdriver_Toon: THREE.MeshPhysicalMaterial
  }
}

export function EstornilladorModel(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/estornillador_model.glb') as unknown as GLTFResult
  // El destornillador es delgado (~2.5 cm): contorno algo más fino que el resto.
  const { toon, outline } = useMemo(() => createToonStyle(materials.Screwdriver_Toon, 0.0015), [materials])
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.screwdriver.geometry}
        material={toon}
      />
      <mesh geometry={nodes.screwdriver.geometry} material={outline} />
    </group>
  )
}

useGLTF.preload('/estornillador_model.glb')
