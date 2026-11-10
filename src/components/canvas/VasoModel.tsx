import * as THREE from 'three'
import type { JSX } from 'react/jsx-runtime'
import type { GLTF } from 'three-stdlib'
import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import { createToonStyle } from './toonStyle'

type GLTFResult = GLTF & {
  nodes: {
    vaso: THREE.Mesh
  }
  materials: {
    Vaso_Export_Final: THREE.MeshPhysicalMaterial
  }
}

// Este GLB está en metros (no en cm como el escritorio y la lámpara), así que el contorno es 100 veces menor.
const VASO_OUTLINE_THICKNESS = 0.0012

export function VasoModel(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/vaso_model.glb') as unknown as GLTFResult

    const { outline, toon } = useMemo(
        () => createToonStyle(materials.Vaso_Export_Final, VASO_OUTLINE_THICKNESS),
        [materials],
    )

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.vaso.geometry}
        material={toon}
      />
      <mesh geometry={nodes.vaso.geometry} material={outline} />
    </group>
  )
}

useGLTF.preload('/vaso_model.glb')