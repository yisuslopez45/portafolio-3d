import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MathUtils, Vector3 } from 'three'

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

export function CameraRig() {
  const look = useRef({ yaw: 0, pitch: 0 })

  useFrame(({ camera, pointer }, delta) => {
    const l = look.current
    l.yaw = MathUtils.damp(l.yaw, -pointer.x * MAX_YAW, SMOOTHING, delta)
    const targetPitch = pointer.y > 0 ? pointer.y * MAX_PITCH_UP : pointer.y * MAX_PITCH_DOWN
    l.pitch = MathUtils.damp(l.pitch, targetPitch, SMOOTHING, delta)

    camera.position.copy(EYE)
    camera.rotation.order = 'YXZ'
    camera.lookAt(TARGET)
    camera.rotation.y += l.yaw
    camera.rotation.x += l.pitch
  })

  return null
}
