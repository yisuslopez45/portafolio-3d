import { EffectComposer, Outline, Selection, ToneMapping } from '@react-three/postprocessing'
import { ToneMappingMode } from 'postprocessing'
import { BluePrintModel } from './BluePrintModel'
import { BookModel } from './BookModel'
import { Chips1Model } from './Chips1Model'
import { BulletinModel } from './BulletinModel'
import { CameraRig } from './CameraRig'
import { ComputerModel } from './ComputerModel'
import { DESKTOP_TOP_Y, DesktopModel } from './DesktopModel'
import { DesktopModelv2 } from './DesktopModelv2'
import { DeskMatModel } from './DeskMatModel'
import { EstornilladorModel } from './EstornilladorModel'
import { Interactive } from './Interactive'
import { LamparaModel } from './LamparaModel'
import { LaptopModel } from './LaptopModel'
import { MultimeterModel } from './MultimeterModel'
import { PeripheralModel } from './PeripheralModel'
import { RepisaModel } from './RepisaModel'
import { RoomModel } from './RoomModel'
import { ServerModel } from './ServerModel'
import { ShelfModel } from './ShelfModel'
import { SolderModel } from './SolderModel'
import { VasoModel } from './VasoModel'
import { VhsModel } from './VhsModel'
import { Cactus1Model } from './Cactus1Model'
import { Cactus2Model } from './Cactus2Model'
import { Books1Model } from './Books1Model'
import { Books2Model } from './Books2Model'

// La cubierta del escritorio va de z=-0.41 (pared) a z=0.41 (borde frontal).
// Z de la fila trasera del escritorio (hacia la pared).
const BACK_Z = -0.15
// Z de la fila delantera (periféricos y objetos sueltos).
const FRONT_Z = 0.2
// Chips NE555 sueltos entre la repisita del VHS y la alfombrilla (que empieza en x=-0.45): [x, z, giro en Y].
const CHIPS: [number, number, number][] = [
  [-0.62, 0.02, 0.3],
  [-0.56, 0.06, -0.8],
  [-0.5, 0.01, 1.2],
  [-0.49, 0.08, 0.1],
  [-0.6, 0.09, -0.4],
]
// Grosor de la alfombrilla del escritorio (los periféricos se apoyan encima).
const DESK_MAT_HEIGHT = 0.004
// Altura del estante respecto a la cubierta del escritorio.
const SHELF_TOP_Y = 0.5

export function Experience() {
  return (
    <Selection>
      <color attach="background" args={['#14141c']} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[1.5, 3, 2]} intensity={2} />
      <CameraRig />
      <RoomModel />
      {/* <DesktopModel /> */}
      <DesktopModelv2 />
      {/* Todo lo de la cubierta del escritorio: las posiciones son relativas a ella (y=0 es la cubierta). */}
      <group position={[0, DESKTOP_TOP_Y, 0]}>
        {/* Fila trasera (pegada a la pared), de izquierda a derecha. La PC retro va al centro, frente a la cámara (x=0). */}
        <SolderModel position={[-1.1, 0, BACK_Z]} />
        {/* Repisita con el VHS encima, a la izquierda de la PC. */}
        <ShelfModel position={[-0.6, 0, BACK_Z]} />
        <Interactive section="lofi" position={[-0.6, 0.1, BACK_Z]}>
          <VhsModel />
        </Interactive>
        {/* rotation 0 anula el giro de 45° que trae el modelo, para que la pantalla mire de frente (ocupa x de -0.23 a 0.23). */}
        <ComputerModel position={[0, 0, BACK_Z]} rotation={[0, 0, 0]} />
        {/* La pantalla de la lámpara mira hacia +z; girada hacia la izquierda para alumbrar el teclado. */}
        <LamparaModel position={[0.42, 0, BACK_Z]} rotation={[0, -0.7, 0]} />
        {/* Repisa acortada en X (el grupo escala encima del scale interno del modelo). */}
        <group position={[-1, 0.2, BACK_Z]} scale={[0.7, 1, 1]}>
          <RepisaModel  position={[0, 0.6, 0]} />
        </group>
        {/* Sobre la tabla de la repisa: 0.2 (grupo) + 0.6 (modelo) + 0.18 (altura de la tabla en el GLB) = 0.98.
            Fuera del grupo escalado para no aplastar los libros; escala 0.75 para caber en los ~19 cm de fondo. */}
        <Books2Model position={[-1, 0.98, BACK_Z]} scale={0.75} />

        {/* Fila delantera, de izquierda a derecha */}
        <Interactive section="about" position={[-0.90, 0, FRONT_Z]}>
          <VasoModel />
        </Interactive>
        {/* Herramientas sueltas (donde la referencia tiene el cuaderno), un poco giradas para que no se vean alineadas. */}
        {/* Fuera de la alfombrilla (x < -0.45); el destornillador más girado para que no la invada. */}
        <MultimeterModel position={[-0.75, 0, 0.3]} rotation={[0, -0.5, 0]} scale={1.1} />
        <EstornilladorModel position={[-0.57, 0, 0.27]} rotation={[0, 1.2, 0]} scale={1.3} />
        {CHIPS.map(([x, z, rotY]) => (
          <Chips1Model key={`${x},${z}`} position={[x, 0, z]} rotation={[0, rotY, 0]} scale={3} />
        ))}
        {/* Alfombrilla bajo los periféricos (0.9 x 0.38, 4 mm de grosor). */}
        <DeskMatModel position={[0, 0, FRONT_Z]} />
        {/* Joystick + teclado + ratón (~0.51 m de ancho), centrados bajo la PC; elevados sobre la alfombrilla. */}
        <Interactive section="projects" position={[0, DESK_MAT_HEIGHT, FRONT_Z]}>
          <PeripheralModel />
        </Interactive>
        {/* Laptop a la derecha, junto a la lámpara. */}
        <LaptopModel position={[0.8, 0, 0]} />
        {/* Cactus en la esquina delantera derecha (la cubierta llega hasta x≈1.5). */}
        <Cactus2Model position={[1, 0.02, 0.28]} scale={1.5} />

      </group>

      {/* Nicho de la pared izquierda: x de -1.9 (fondo) a -1.6 (boca), z de -0.4 a 0.4, base del estante en y=1.31. */}
      <group position={[-1.75, 1.31, 0]}>

        <Interactive section="downloads" position={[0, 0, 0.15]} >
          <ServerModel  rotation={[0, Math.PI / 2, 0]} />
        </Interactive>
        <BookModel position={[0, 0, -0.15]} scale={0.85} />
      </group>


      {/* Hueco inferior del mismo nicho: base en y=0.9, 0.8 de largo (z de -0.4 a 0.4).
          Girado 90° para mirar a la habitación; en este grupo x va de izquierda (-) a derecha (+) vista desde la sala. */}
      <group position={[-1.75, 0.9, 0]} rotation={[0, Math.PI / 2, 0]}>
        <Books1Model position={[-0.21, 0, 0]} scale={1} />
        <Cactus1Model position={[0.2, 0, 0]} scale={1.5} />
      </group>


      {/* Pared frontal (z=-0.5), entre el borde derecho de la ventana (x=0.95) y la pared derecha (x≈1.57). */}
      <BluePrintModel position={[1.26, 1.39, -0.5]} scale={0.65} />

      <Interactive section="experience" position={[1.6, 1.4, 0.001]} rotation={[0, (3 * Math.PI) / 2, 0]} scale={0.7}>
        <BulletinModel />
      </Interactive>

      {/* Borde azul claro del objeto bajo el mouse (los <Interactive> hover se marcan con <Select>). */}
      <EffectComposer autoClear={false}>
        <Outline
          visibleEdgeColor={0x7dd3fc}
          hiddenEdgeColor={0x7dd3fc}
          edgeStrength={3}
          width={600}
          blur
        />
        {/* El composer desactiva el tone mapping del Canvas; se repone para que los colores no cambien. */}
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    </Selection>
  )
}
