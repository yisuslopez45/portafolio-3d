
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-dev-runtime'
import { useMemo } from 'react'
import { createToonStyle } from './toonStyle'

type GLTFResult = GLTF & {
    nodes: {
        vhs_body: THREE.Mesh
        vhs_dial_L: THREE.Mesh
        vhs_dial_R: THREE.Mesh
        vhs_key_1: THREE.Mesh
        vhs_key_2: THREE.Mesh
        vhs_key_3: THREE.Mesh
        vhs_key_4: THREE.Mesh
        vhs_key_5: THREE.Mesh
        vhs_key_6: THREE.Mesh
        vhs_key_7: THREE.Mesh
        vhs_key_8: THREE.Mesh
        vhs_lid: THREE.Mesh
    }
    materials: {
        Toon_VHS: THREE.MeshPhysicalMaterial
    }
}

export function VhsModel(props: JSX.IntrinsicElements['group']) {

    const { nodes, materials } = useGLTF('/vhs_model.glb') as unknown as GLTFResult
    const { toon, outline } = useMemo(() => createToonStyle(materials.Toon_VHS, 0.002), [materials])

    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.vhs_body.geometry}
                material={toon}
            />
            <mesh
                geometry={nodes.vhs_body.geometry}
                material={outline}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.vhs_dial_L.geometry}
                material={materials.Toon_VHS}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.vhs_dial_R.geometry}
                material={materials.Toon_VHS}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.vhs_key_1.geometry}
                material={materials.Toon_VHS}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.vhs_key_2.geometry}
                material={materials.Toon_VHS}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.vhs_key_3.geometry}
                material={materials.Toon_VHS}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.vhs_key_4.geometry}
                material={materials.Toon_VHS}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.vhs_key_5.geometry}
                material={materials.Toon_VHS}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.vhs_key_6.geometry}
                material={materials.Toon_VHS}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.vhs_key_7.geometry}
                material={materials.Toon_VHS}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.vhs_key_8.geometry}
                material={materials.Toon_VHS}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.vhs_lid.geometry}
                material={materials.Toon_VHS}
            />
        </group>
    )
}

useGLTF.preload('/vhs_model.glb')