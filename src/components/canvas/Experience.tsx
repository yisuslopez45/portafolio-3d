import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

export function Experience() {
  const cube = useRef<Mesh>(null)

  useFrame((_, delta) => {
    if (!cube.current) return
    cube.current.rotation.x += delta * 0.5
    cube.current.rotation.y += delta * 0.8
  })

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 3]} intensity={1.5} />
      <mesh ref={cube}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>
    </>
  )
}
