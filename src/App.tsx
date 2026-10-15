import { Canvas } from '@react-three/fiber'
import { Experience } from '@/components/canvas/Experience'

function App() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <Experience />
    </Canvas>
  )
}

export default App
