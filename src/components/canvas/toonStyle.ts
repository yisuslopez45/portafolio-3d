import * as THREE from 'three'

// Grosor del contorno por defecto, en unidades del modelo (0.12 = 1.2 mm si el GLB está en cm).
const OUTLINE_THICKNESS = 0.12
const OUTLINE_COLOR = '#1b1226'

// Rampa de 3 tonos (sombra / medio / luz) sin interpolar: da el corte duro tipo pintado a mano.
function createGradientMap() {
  const data = new Uint8Array([90, 90, 90, 255, 175, 175, 175, 255, 255, 255, 255, 255])
  const tex = new THREE.DataTexture(data, 3, 1, THREE.RGBAFormat)
  tex.minFilter = tex.magFilter = THREE.NearestFilter
  tex.generateMipmaps = false
  tex.needsUpdate = true
  return tex
}

// Material toon que conserva la textura bakeada del material original (o su color, si no tiene textura), más su contorno.
// `thickness` va en las unidades del propio GLB: usa 0.12 para modelos en cm y 0.0012 para modelos en metros.
export function createToonStyle(baked: THREE.MeshStandardMaterial, thickness = OUTLINE_THICKNESS) {
  const toon = new THREE.MeshToonMaterial({
    map: baked.map,
    // Sin textura, el color plano del material es lo único que lo distingue (si no, saldría blanco).
    ...(baked.map ? {} : { color: baked.color }),
    gradientMap: createGradientMap(),
    side: THREE.DoubleSide,
  })

  // Casco invertido: copia por la cara trasera, inflada a lo largo de la normal.
  const outline = new THREE.MeshBasicMaterial({ color: OUTLINE_COLOR, side: THREE.BackSide })
  outline.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `#include <begin_vertex>
        transformed += normalize(normal) * ${thickness};`,
    )
  }

  // three cachea el shader por el texto de onBeforeCompile; sin esto, dos grosores distintos compartirían programa.
  outline.customProgramCacheKey = () => `outline-${thickness}`

  return { toon, outline }
}
