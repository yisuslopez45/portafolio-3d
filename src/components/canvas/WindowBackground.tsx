import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

// El hueco de la ventana va de x=-0.95 a 0.95 e y=0.91 a 2.11, en la pared frontal (z de -0.62 a -0.5).
// La imagen se aleja de la pared para que al mover la cámara se mueva menos que la habitación (da profundidad);
// por eso es bastante más grande que el hueco: así no se le ven los bordes al hacer zoom en los objetos.
const BACKGROUND_Z = -1.2
const BACKGROUND_CENTER_Y = 1.4
// Misma proporción que la imagen (2752 x 1536).
const BACKGROUND_WIDTH = 3.6
const BACKGROUND_HEIGHT = BACKGROUND_WIDTH * (1536 / 2752)

// Ciudad de noche que se ve por la ventana. Sin luces (meshBasicMaterial): la imagen ya trae su iluminación.
export function WindowBackground() {
  const texture = useTexture('/imgs/background.jpeg')
  texture.colorSpace = THREE.SRGBColorSpace

  return (
    <mesh position={[0, BACKGROUND_CENTER_Y, BACKGROUND_Z]}>
      <planeGeometry args={[BACKGROUND_WIDTH, BACKGROUND_HEIGHT]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}

useTexture.preload('/imgs/background.jpeg')
