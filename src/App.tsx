import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Loader } from '@react-three/drei'
import { Experience } from '@/components/canvas/Experience'
import { HoverLabel } from '@/components/ui/HoverLabel'
import { InfoPanel } from '@/components/ui/InfoPanel'
import { BackgroundMusic } from '@/components/ui/BackgroundMusic'

function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 1.25, 1], fov: 75, near: 0.05, far: 50 }}>
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
      <Loader />
      <HoverLabel />
      <InfoPanel />
      <BackgroundMusic />
    </>
  )
}

export default App
