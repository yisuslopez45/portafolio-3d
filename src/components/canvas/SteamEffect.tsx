import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Billboard } from '@react-three/drei'
import * as THREE from 'three'
import type { JSX } from 'react/jsx-runtime'

// Tamaño de cada voluta de vapor (metros).
const WIDTH = 0.07
const HEIGHT = 0.12

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSeed;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;
    // Ondula hacia los lados, más cuanto más arriba (la base queda pegada al vaso).
    float sway = sin(uv.y * 5.0 - uTime * 0.5 + uSeed) * 0.5 + sin(uv.y * 9.0 - uTime * 0.3 + uSeed * 2.0) * 0.25;
    pos.x += sway * 0.25 * uv.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uSeed;
  uniform vec3 uColor;
  uniform vec3 uOutline;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  void main() {
    // El ruido sube con el tiempo: da la sensación de vapor que se eleva y se deshace.
    vec2 p = vec2(vUv.x * 3.0, vUv.y * 1.5 - uTime * 0.12 + uSeed);
    float n = noise(p) * 0.65 + noise(p * 2.3) * 0.35;

    // Campo suave: hilo en el centro que se adelgaza hacia los bordes, abajo y arriba.
    float field = n;
    field *= 1.0 - smoothstep(0.05, 0.45, abs(vUv.x - 0.5));
    field *= smoothstep(0.0, 0.15, vUv.y) * (1.0 - smoothstep(0.4, 1.0, vUv.y));

    // Toon: cortes duros en vez de degradado. Relleno plano y, justo por fuera, un contorno de tinta.
    float fill = step(0.3, field);
    float line = step(0.24, field) - fill;
    if (fill + line < 0.5) discard;

    vec3 color = mix(uOutline, uColor, fill);
    gl_FragColor = vec4(color, fill * 0.9 + line * 0.75);
  }
`

function SteamWisp({ seed, ...props }: JSX.IntrinsicElements['mesh'] & { seed: number }) {
  const material = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSeed: { value: seed },
      uColor: { value: new THREE.Color('#fff6e6') },
      // Mismo tono que el contorno de los modelos toon.
      uOutline: { value: new THREE.Color('#1b1226') },
    }),
    [seed],
  )

  useFrame(({ clock }) => {
    if (material.current) material.current.uniforms.uTime.value = clock.elapsedTime
  })

  return (
    // Sin raycast: el vapor no intercepta el mouse (el hover del vaso sigue funcionando a través de él).
    <mesh raycast={() => null} {...props}>
      {/* Muchas divisiones en alto para que la ondulación del vertex shader sea suave. */}
      <planeGeometry args={[WIDTH, HEIGHT, 1, 32]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

// Vapor sencillo sobre una bebida caliente. `position` es la boca del vaso: el vapor sale hacia arriba desde ahí.
export function SteamEffect(props: JSX.IntrinsicElements['group']) {
  return (
    <group {...props}>
      {/* Gira solo en Y para mirar siempre a la cámara sin inclinarse. */}
      <Billboard lockX lockZ>
        <SteamWisp seed={0} position={[-0.008, HEIGHT / 2, 0]} />
        <SteamWisp seed={4.7} position={[0.012, HEIGHT / 2 + 0.02, 0.001]} scale={[0.8, 0.85, 1]} />
      </Billboard>
    </group>
  )
}
