import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils, Vector3 } from 'three'

// Ojos de la persona sentada frente al escritorio (metros). La cámara no se traslada: solo gira.
const EYE = new Vector3(0, 1.25, 1.0)
// Hacia dónde mira en reposo.
const TARGET = new Vector3(0, 0.78, -0.05)

// Giro máximo de la cabeza (grados) cuando el mouse llega al borde, y suavidad del movimiento.
const MAX_YAW = MathUtils.degToRad(22)
const MAX_PITCH = MathUtils.degToRad(10)
const SMOOTHING = 4

export function CameraRig() {
  const look = useRef({ yaw: 0, pitch: 0 })

  useFrame(({ camera, pointer }, delta) => {
    const l = look.current
    l.yaw = MathUtils.damp(l.yaw, -pointer.x * MAX_YAW, SMOOTHING, delta)
    l.pitch = MathUtils.damp(l.pitch, pointer.y * MAX_PITCH, SMOOTHING, delta)

    camera.position.copy(EYE)
    camera.rotation.order = 'YXZ'
    camera.lookAt(TARGET)
    camera.rotation.y += l.yaw
    camera.rotation.x += l.pitch
  })

  return null
}
