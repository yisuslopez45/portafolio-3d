
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import type { GLTF } from 'three-stdlib'
import type { JSX } from 'react/jsx-dev-runtime'
import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import { useFocusStore } from '@/hooks/useFocusStore'
import { useMusicStore } from '@/hooks/useMusicStore'
import { createToonStyle } from './toonStyle'

// Cuánto se hunde la tecla de play mientras suena la música (la tecla mide ~0.017 de alto).
const KEY_PRESS_DEPTH = 0.006
// Color de la tecla: menta sonando, rosa en pausa (los mismos tonos que la UI).
const KEY_COLOR_PLAYING = new THREE.Color('#7ee0b5')
const KEY_COLOR_PAUSED = new THREE.Color('#ff8fb1')

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
    // La tecla de play lleva su propio color plano (sin la textura bakeada) para destacar sobre el VHS.
    const keyStyle = useMemo(() => {
        const style = createToonStyle(materials.Toon_VHS, 0.001)
        style.toon.map = null
        style.toon.color.copy(KEY_COLOR_PLAYING)
        style.toon.emissive.copy(KEY_COLOR_PLAYING)
        return style
    }, [materials])
    const playing = useMusicStore((s) => s.playing)
    const keyHovered = useMusicStore((s) => s.keyHovered)
    const playKey = useRef<THREE.Group>(null)
    const playKeyMesh = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.MeshToonMaterial>>(null)

    useFrame(({ clock }, delta) => {
        if (!playKey.current || !playKeyMesh.current) return
        playKey.current.position.y = THREE.MathUtils.damp(playKey.current.position.y, playing ? -KEY_PRESS_DEPTH : 0, 15, delta)

        const material = playKeyMesh.current.material
        const target = playing ? KEY_COLOR_PLAYING : KEY_COLOR_PAUSED
        material.color.lerp(target, 1 - Math.exp(-10 * delta))
        material.emissive.copy(material.color)
        // En pausa late para invitar al clic; sonando brilla fijo y suave. Más brillo con el mouse encima.
        const pulse = playing ? 0.25 : 0.35 + 0.3 * Math.sin(clock.elapsedTime * 4)
        material.emissiveIntensity = pulse + (keyHovered ? 0.4 : 0)
    })

    // Al salir del hover se devuelve el cursor de la mano solo si el puntero sigue sobre el VHS.
    useEffect(() => {
        if (!keyHovered) return
        document.body.style.cursor = 'pointer'
        return () => {
            document.body.style.cursor = useFocusStore.getState().hovered ? 'pointer' : 'auto'
        }
    }, [keyHovered])

    // stopPropagation: la tecla pausa/reanuda la música sin abrir el panel Lofi (el click del <Interactive>).
    const playKeyHandlers = {
        onClick: (e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation()
            useMusicStore.getState().toggle()
        },
        onPointerOver: () => useMusicStore.getState().hoverKey(true),
        onPointerOut: () => useMusicStore.getState().hoverKey(false),
    }

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
            {/* Tecla de play/pausa de la música de fondo (en un grupo para que el contorno se hunda con ella). */}
            <group ref={playKey}>
                <mesh
                    ref={playKeyMesh}
                    castShadow
                    receiveShadow
                    geometry={nodes.vhs_key_1.geometry}
                    material={keyStyle.toon}
                    {...playKeyHandlers}
                />
                <mesh
                    geometry={nodes.vhs_key_1.geometry}
                    material={keyStyle.outline}
                />
            </group>
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