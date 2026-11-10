
import * as THREE from 'three'

import { useGLTF } from '@react-three/drei'
import type { JSX } from 'react/jsx-runtime'
import type { GLTF } from 'three-stdlib'
import { useMemo } from 'react'
import { createToonStyle } from './toonStyle'

type GLTFResult = GLTF & {
    nodes: {
        laptop_base: THREE.Mesh
        laptop_lid: THREE.Mesh
        laptop_screen: THREE.Mesh
    }
    materials: {
        Toon_Palette: THREE.MeshPhysicalMaterial
        Toon_Screen: THREE.MeshPhysicalMaterial
    }
}

export function LaptopModel(props: JSX.IntrinsicElements['group']) {
    const { nodes, materials } = useGLTF('/laptop_model.glb') as unknown as GLTFResult
    const { toon, outline } = useMemo(() => createToonStyle(materials.Toon_Palette, 0.002), [materials])

    return (
        <group  scale={1.2} rotation={[0, 310* (Math.PI / 180), 0]}  {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.laptop_base.geometry}
                material={toon}
            />
            <mesh
                 geometry={nodes.laptop_base.geometry}
                 material={outline}
             />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.laptop_lid.geometry}
                material={toon}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.laptop_screen.geometry}
                    material={materials.Toon_Screen}
                />
            </mesh>
        </group>
        // <group  scale={0.6} rotation={[0, 310* (Math.PI / 180), 0]} {...props} dispose={null}>
        //     <mesh
        //         castShadow
        //         receiveShadow
        //         geometry={nodes.laptop_base.geometry}
        //         material={toon}
        //     />

        //     <mesh
        //         geometry={nodes.laptop_base.geometry}
        //         material={outline}
        //     />

        //     <mesh
        //         castShadow
        //         receiveShadow
        //         geometry={nodes.laptop_lid.geometry}
        //         material={materials.Toon_Palette}>
        //         <mesh
        //             castShadow
        //             receiveShadow
        //             geometry={nodes.laptop_screen.geometry}
        //             material={materials.Toon_Screen}
        //         />
        //     </mesh>
        // </group>
    )
}

useGLTF.preload('/laptop_model.glb')