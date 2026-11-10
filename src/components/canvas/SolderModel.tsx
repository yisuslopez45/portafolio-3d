import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-runtime'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import { useFocusStore } from '@/hooks/useFocusStore'
import { createToonStyle } from './toonStyle'

// Cuánto se hunde el botón (está en la cara frontal de la base, así que se hunde hacia -z; asoma ~1.5 cm).
const BUTTON_PRESS_DEPTH = 0.004
// Punta del cautín: gris metálico apagada, rojo incandescente encendida.
const TIP_COLOR_HOT = new THREE.Color('#ff2a12')
const TIP_EMISSIVE = 1.2

type GLTFResult = GLTF & {
    nodes: {
        solder_base: THREE.Mesh
        solder_button: THREE.Mesh
        solder_iron: THREE.Mesh
        solder_tip: THREE.Mesh
        solder_knob: THREE.Mesh
    }
    materials: {
        Toon_Palette: THREE.MeshPhysicalMaterial
        Toon_Tip: THREE.MeshPhysicalMaterial
    }
}

export function SolderModel(props: JSX.IntrinsicElements['group']) {

    const { nodes, materials } = useGLTF('/solder_model.glb') as unknown as GLTFResult
    const { toon, outline } = useMemo(() => createToonStyle(materials.Toon_Palette, 0.002 ), [materials])
    // La punta lleva su propio material para poder calentarla (color y brillo) sin tocar el resto.
    const tip = useMemo(() => {
        const m = createToonStyle(materials.Toon_Tip, 0.002).toon
        m.emissive.copy(TIP_COLOR_HOT)
        m.emissiveIntensity = 0
        return m
    }, [materials])
    const tipColdColor = useMemo(() => materials.Toon_Tip.color.clone(), [materials])

    const [on, setOn] = useState(false)
    const [buttonHovered, setButtonHovered] = useState(false)
    // El botón solo responde con el zoom puesto en el cautín; antes, el click hace zoom como en el resto del objeto.
    const focused = useFocusStore((s) => s.active === 'solder')
    const button = useRef<THREE.Group>(null)
    // Clic del interruptor (el mismo de la lámpara).
    const clickSound = useMemo(() => new Audio('/sounds/welder.mp3'), [])

    // La punta se calienta y se enfría poco a poco (más lento que la lámpara).
    useFrame((_, delta) => {
        const t = 1 - Math.exp(-3 * delta)
        tip.color.lerp(on ? TIP_COLOR_HOT : tipColdColor, t)
        tip.emissiveIntensity = THREE.MathUtils.lerp(tip.emissiveIntensity, on ? TIP_EMISSIVE : 0, t)
        if (button.current) {
            button.current.position.z = THREE.MathUtils.damp(button.current.position.z, on ? -BUTTON_PRESS_DEPTH : 0, 15, delta)
        }
    })

    useEffect(() => {
        if (!focused) setButtonHovered(false)
    }, [focused])

    useEffect(() => {
        if (!buttonHovered) return
        document.body.style.cursor = 'pointer'
        return () => {
            document.body.style.cursor = 'auto'
        }
    }, [buttonHovered])

    // stopPropagation solo con zoom: así el primer click sobre el botón sigue haciendo zoom en el cautín.
    const buttonHandlers = {
        onClick: (e: ThreeEvent<MouseEvent>) => {
            if (!focused) return
            e.stopPropagation()
            clickSound.currentTime = 0
            clickSound.play().catch(() => {})
            setOn((v) => !v)
        },
        onPointerOver: () => focused && setButtonHovered(true),
        onPointerOut: () => setButtonHovered(false),
    }

    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.solder_base.geometry}
                material={toon}
            />

            <mesh
                geometry={nodes.solder_base.geometry}
                material={outline}
            />

            <group ref={button}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.solder_button.geometry}
                    material={materials.Toon_Palette}
                    {...buttonHandlers}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.solder_iron.geometry}
                material={materials.Toon_Palette}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.solder_tip.geometry}
                    material={tip}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.solder_knob.geometry}
                material={materials.Toon_Palette}
            />
        </group>
    )
}

useGLTF.preload('/solder_model.glb')
