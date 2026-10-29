import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils, Vector3 } from 'three'
import { SECTIONS } from '@/data/sections'
import { useFocusStore } from '@/hooks/useFocusStore'

// Ojos de la persona sentada frente al escritorio (metros). La cámara no se traslada: solo gira.
const EYE = new Vector3(0, 1.30, 0.8)
// Hacia dónde mira en reposo.
const TARGET = new Vector3(0, 0.97, -0.05)

// Giro máximo de la cabeza (grados) cuando el mouse llega al borde, y suavidad del movimiento.
const MAX_YAW = MathUtils.degToRad(22)
// Asimétrico: puede levantar mucho la mirada (ventana) y bajarla poco (escritorio).
const MAX_PITCH_UP = MathUtils.degToRad(22)
const MAX_PITCH_DOWN = MathUtils.degToRad(8)
const SMOOTHING = 4
// Velocidad de la transición entre reposo y zoom.
const FOCUS_SMOOTHING = 3

const UP = new Vector3(0, 1, 0)

export function CameraRig() {
  const look = useRef({ yaw: 0, pitch: 0 })
  // 0 = reposo, 1 = zoom completo.
  const blend = useRef(0)
  // Pose del zoom. Se conserva al salir para poder volver suavemente desde ella.
  const focusPos = useRef(new Vector3())
  const focusLook = useRef(new Vector3())
  const pos = useRef(new Vector3())
  const target = useRef(new Vector3())
  const forward = useRef(new Vector3())
  const right = useRef(new Vector3())

  useFrame(({ camera, pointer }, delta) => {
    const { active, center } = useFocusStore.getState()

    if (active) {
      const { cameraOffset, sideShift } = SECTIONS[active]
      const offset = pos.current.set(...cameraOffset)
      // Se desplaza la mirada hacia la derecha del objeto para que quede a la izquierda y el panel entre a la derecha.
      forward.current.copy(offset).negate().normalize()
      right.current.crossVectors(forward.current, UP).normalize().multiplyScalar(sideShift * offset.length())
      focusLook.current.copy(center).add(right.current)
      focusPos.current.copy(center).add(offset).add(right.current)
    }

    blend.current = MathUtils.damp(blend.current, active ? 1 : 0, FOCUS_SMOOTHING, delta)
    const k = MathUtils.smoothstep(blend.current, 0, 1)

    // El giro con el mouse solo se aplica en reposo.
    const m = pointer
    look.current.yaw = MathUtils.damp(look.current.yaw, active ? 0 : -m.x * MAX_YAW, SMOOTHING, delta)
    const targetPitch = m.y > 0 ? m.y * MAX_PITCH_UP : m.y * MAX_PITCH_DOWN
    look.current.pitch = MathUtils.damp(look.current.pitch, active ? 0 : targetPitch, SMOOTHING, delta)

    camera.position.lerpVectors(EYE, focusPos.current, k)
    target.current.lerpVectors(TARGET, focusLook.current, k)
    camera.rotation.order = 'YXZ'
    camera.lookAt(target.current)
    camera.rotation.y += look.current.yaw
    camera.rotation.x += look.current.pitch
  })

  return null
}
