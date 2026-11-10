import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import type { ThreeEvent } from '@react-three/fiber'
import { Select } from '@react-three/postprocessing'
import type { JSX } from 'react/jsx-runtime'
import type { GLTF } from 'three-stdlib'
import { useFocusStore } from '@/hooks/useFocusStore'
import { createToonStyle } from './toonStyle'

type GLTFResult = GLTF & {
  nodes: {
    foco_1: THREE.Mesh
    foco_2: THREE.Mesh
    foco_3: THREE.Mesh
    foco_4: THREE.Mesh
    lampara_1: THREE.Mesh
    lampara_2: THREE.Mesh
    lampara_3: THREE.Mesh
  }
  materials: {
    BakedMaterial_GLB: THREE.MeshPhysicalMaterial
  }
}

const LAMPARA_SCALE = 0.01
// El botón viene fundido dentro de lampara_3: es la pieza que asoma sobre la base, por delante (unidades del GLB, cm).
const BUTTON_BOX = new THREE.Box3(new THREE.Vector3(-0.7, 3.3, 0.4), new THREE.Vector3(0.85, 5.1, 3))
// Cuánto se hunde el botón con la lámpara encendida (asoma ~1 cm sobre la base).
const BUTTON_PRESS_DEPTH = 0.5
// Origen del cono (justo delante del foco, que llega hasta z=8.5) y punto del escritorio al que apunta (unidades del GLB).
// Fuera del foco para no alumbrar su cara interior (salía una mancha blanca).
// Lejos y poco inclinado (~25°) para que el cono alumbre la PC y la alfombrilla y no la base de la propia lámpara.
const BULB_POSITION: [number, number, number] = [0, 31, 9]
const LIGHT_TARGET: [number, number, number] = [0, 0, 60]
const LIGHT_COLOR = '#ffd59a'
const SPOT_INTENSITY = 4
// Apertura del cono (radianes, medio ángulo): más o menos la boca de la pantalla.
const SPOT_ANGLE = 0.45
const BULB_EMISSIVE = 0.9
// Color plano del foco (sin la textura bakeada) para que encendido brille parejo.
const BULB_COLOR = '#f2e6c9'

// Haz de luz visible: cono translúcido desde la boca de la pantalla hacia el escritorio (unidades del GLB).
const BEAM_TOP_RADIUS = 6
// Fracción del recorrido hasta LIGHT_TARGET: se queda corto para que no se vea el corte contra la mesa.
const BEAM_LENGTH = 0.85
const BEAM_OPACITY = 0.18

// Más opaco junto al foco y en el centro del cono; se desvanece hacia el escritorio y hacia los bordes.
const BEAM_VERTEX = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vUv = uv;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`
const BEAM_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    // Sin pow(): con base 0 (los bordes del cono vistos de canto) algunas GPUs dan NaN y se pinta una línea negra.
    float along = clamp(vUv.y, 0.0, 1.0);
    along *= sqrt(along);
    float facing = clamp(abs(dot(normalize(vNormal), normalize(vView))), 0.0, 1.0);
    float edge = facing * facing;
    gl_FragColor = vec4(uColor, uOpacity * along * edge);
  }
`

// Cilindro abierto orientado del objetivo (base ancha) al foco (punta estrecha, uv.y = 1).
function createBeam() {
  const from = new THREE.Vector3(...BULB_POSITION)
  const to = new THREE.Vector3(...LIGHT_TARGET)
  const dir = to.clone().sub(from)
  const length = dir.length() * BEAM_LENGTH
  const bottomRadius = BEAM_TOP_RADIUS + Math.tan(SPOT_ANGLE) * length
  const geometry = new THREE.CylinderGeometry(BEAM_TOP_RADIUS, bottomRadius, length, 32, 1, true)
  const material = new THREE.ShaderMaterial({
    uniforms: { uColor: { value: new THREE.Color(LIGHT_COLOR) }, uOpacity: { value: 0 } },
    vertexShader: BEAM_VERTEX,
    fragmentShader: BEAM_FRAGMENT,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  })
  const position = from.clone().addScaledVector(dir.normalize(), length / 2)
  const quaternion = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.negate())
  return { geometry, material, position, quaternion }
}

// Separa en dos geometrías (compartiendo atributos) los triángulos dentro de `box` y el resto.
function splitByBox(geometry: THREE.BufferGeometry, box: THREE.Box3) {
  const pos = geometry.getAttribute('position')
  const index = geometry.getIndex()
  const count = index ? index.count : pos.count
  const vertex = (i: number) => (index ? index.getX(i) : i)
  const inside: number[] = []
  const outside: number[] = []
  const centroid = new THREE.Vector3()
  const v = new THREE.Vector3()
  for (let i = 0; i < count; i += 3) {
    centroid.set(0, 0, 0)
    for (let k = 0; k < 3; k++) centroid.add(v.fromBufferAttribute(pos, vertex(i + k)))
    centroid.divideScalar(3)
    const target = box.containsPoint(centroid) ? inside : outside
    target.push(vertex(i), vertex(i + 1), vertex(i + 2))
  }
  const make = (indices: number[]) => {
    const g = new THREE.BufferGeometry()
    for (const [name, attr] of Object.entries(geometry.attributes)) g.setAttribute(name, attr)
    g.setIndex(indices)
    return g
  }
  return { inside: make(inside), outside: make(outside) }
}

export function LamparaModel(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('/lampara-model.glb') as unknown as GLTFResult

  const { toon, outline } = useMemo(
    () => createToonStyle(materials.BakedMaterial_GLB),
    [materials],
  )
  // Los focos llevan su propio material para poder encenderlos sin que brille el resto de la lámpara.
  const bulb = useMemo(() => {
    const m = toon.clone()
    m.map = null
    m.color.set(BULB_COLOR)
    m.emissive.set(LIGHT_COLOR)
    m.emissiveIntensity = 0
    return m
  }, [toon])
  const { inside: buttonGeometry, outside: baseGeometry } = useMemo(
    () => splitByBox(nodes.lampara_3.geometry, BUTTON_BOX),
    [nodes],
  )
  const target = useMemo(() => new THREE.Object3D(), [])
  const beam = useMemo(createBeam, [])

  const [on, setOn] = useState(false)
  const [buttonHovered, setButtonHovered] = useState(false)
  // El botón solo responde con el zoom puesto en la lámpara; antes, el click hace zoom como en el resto del objeto.
  const focused = useFocusStore((s) => s.active === 'lamp')
  const button = useRef<THREE.Group>(null)
  const spot = useRef<THREE.SpotLight>(null)
  // Clic del interruptor (suena igual al encender y al apagar).
  const clickSound = useMemo(() => new Audio('/sounds/off.mp3'), [])

  // Las luces quedan montadas y solo se anima su intensidad (añadir/quitar luces recompila los shaders).
  useFrame((_, delta) => {
    const t = 1 - Math.exp(-12 * delta)
    if (spot.current) spot.current.intensity = THREE.MathUtils.lerp(spot.current.intensity, on ? SPOT_INTENSITY : 0, t)
    bulb.emissiveIntensity = THREE.MathUtils.lerp(bulb.emissiveIntensity, on ? BULB_EMISSIVE : 0, t)
    const beamOpacity = beam.material.uniforms.uOpacity
    beamOpacity.value = THREE.MathUtils.lerp(beamOpacity.value, on ? BEAM_OPACITY : 0, t)
    if (button.current) {
      button.current.position.y = THREE.MathUtils.damp(button.current.position.y, on ? -BUTTON_PRESS_DEPTH : 0, 15, delta)
    }
  })

  useEffect(() => {
    if (!focused) setButtonHovered(false)
  }, [focused])

  useEffect(() => {
    if (!buttonHovered) return
    document.body.style.cursor = 'pointer'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [buttonHovered])

  // stopPropagation solo con zoom: así el primer click sobre el botón sigue haciendo zoom en la lámpara.
  const buttonHandlers = {
    onClick: (e: ThreeEvent<MouseEvent>) => {
      if (!focused) return
      e.stopPropagation()
      // Se rebobina para que suene aunque se pulse rápido varias veces; play() falla si el navegador bloquea el audio.
      clickSound.currentTime = 0
      clickSound.play().catch(() => {})
      setOn((v) => !v)
    },
    onPointerOver: () => focused && setButtonHovered(true),
    onPointerOut: () => setButtonHovered(false),
  }

  return (
    <group scale={LAMPARA_SCALE} {...props} dispose={null}>
      <mesh geometry={nodes.foco_1.geometry} material={bulb} castShadow receiveShadow />
      <mesh geometry={nodes.foco_1.geometry} material={outline} />
      <mesh geometry={nodes.foco_2.geometry} material={bulb} castShadow receiveShadow />
      <mesh geometry={nodes.foco_2.geometry} material={outline} />
      <mesh geometry={nodes.foco_3.geometry} material={bulb} castShadow receiveShadow />
      <mesh geometry={nodes.foco_3.geometry} material={outline} />
      <mesh geometry={nodes.foco_4.geometry} material={bulb} castShadow receiveShadow />
      <mesh geometry={nodes.foco_4.geometry} material={outline} />
      <mesh geometry={nodes.lampara_1.geometry} material={toon} castShadow receiveShadow />
      <mesh geometry={nodes.lampara_1.geometry} material={outline} />
      <mesh geometry={nodes.lampara_2.geometry} material={toon} castShadow receiveShadow />
      <mesh geometry={nodes.lampara_2.geometry} material={outline} />
      <mesh geometry={baseGeometry} material={toon} castShadow receiveShadow />
      <mesh geometry={baseGeometry} material={outline} />
      {/* Botón de encendido (en un grupo para que el contorno se hunda con él). */}
      <group ref={button}>
        <mesh geometry={buttonGeometry} material={toon} castShadow receiveShadow {...buttonHandlers} />
        <mesh geometry={buttonGeometry} material={outline} />
      </group>
      {/* Luz cálida del foco: solo un cono, para que alumbre hacia donde mira la pantalla. */}
      <primitive object={target} position={LIGHT_TARGET} />
      <spotLight
        ref={spot}
        position={BULB_POSITION}
        target={target}
        color={LIGHT_COLOR}
        intensity={0}
        angle={SPOT_ANGLE}
        penumbra={0.5}
        distance={2.8}
        decay={2}
      />
      {/* Haz visible: fuera del borde azul del hover y sin raycast, para que no capture el mouse. */}
      <Select exclude>
        <mesh
          geometry={beam.geometry}
          material={beam.material}
          position={beam.position}
          quaternion={beam.quaternion}
          raycast={() => null}
          renderOrder={1}
        />
      </Select>
    </group>
  )
}

useGLTF.preload('/lampara-model.glb')
