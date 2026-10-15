import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader } from '@react-three/drei'
import { Experience } from '@/components/canvas/Experience'

function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 1.25, 1], fov: 50, near: 0.05, far: 50 }}>
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  )
}

export default App
