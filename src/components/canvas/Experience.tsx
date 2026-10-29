import { BookModel } from './BookModel'
import { BulletinModel } from './BulletinModel'
import { CameraRig } from './CameraRig'
import { ComputerModel } from './ComputerModel'
import { DESKTOP_TOP_Y, DesktopModel } from './DesktopModel'
import { DesktopModelv2 } from './DesktopModelv2'
import { Interactive } from './Interactive'
import { LamparaModel } from './LamparaModel'
import { LaptopModel } from './LaptopModel'
import { PeripheralModel } from './PeripheralModel'
import { RepisaModel } from './RepisaModel'
import { RoomModel } from './RoomModel'
import { ServerModel } from './ServerModel'
import { ShelfModel } from './ShelfModel'
import { SolderModel } from './SolderModel'
import { VasoModel } from './VasoModel'
import { VhsModel } from './VhsModel'

// Z de la fila trasera del escritorio (hacia la pared).
const BACK_Z = -0.15
// Altura del estante respecto a la cubierta del escritorio.
const SHELF_TOP_Y = 0.5

export function Experience() {
  return (
    <>
      <color attach="background" args={['#14141c']} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[1.5, 3, 2]} intensity={2} />
      <CameraRig />
      <RoomModel />
      {/* <DesktopModel /> */}
      <DesktopModelv2 />
      {/* Todo lo de la cubierta del escritorio: las posiciones son relativas a ella (y=0 es la cubierta). */}
      <group position={[0, DESKTOP_TOP_Y, 0]}>
        {/* Fila trasera (pegada a la pared) */}
        <ComputerModel position={[-0.7, 0, BACK_Z]} />
        <ShelfModel position={[-0.2, 0, BACK_Z]} />
        <Interactive section="lofi" position={[-0.2, 0.1, BACK_Z]}>
          <VhsModel />
        </Interactive>
        <SolderModel position={[0.1, 0, BACK_Z]} />
        <LamparaModel position={[0.4, 0, -0.22]} />
        <RepisaModel position={[1, 0.4, BACK_Z]}   />

  

        {/* Fila delantera */}
        <Interactive section="about" position={[-0.8, 0, 0.2]}>
          <VasoModel />
        </Interactive>
        <Interactive section="projects" position={[-0.2, 0, 0.2]}>
          <PeripheralModel />
        </Interactive>
        <LaptopModel position={[0.7, 0, 0.1]} />

      </group>

      {/* Nicho de la pared izquierda: x de -1.9 (fondo) a -1.6 (boca), z de -0.4 a 0.4, base del estante en y=1.31. */}
      <group position={[-1.75, 1.31, 0]}>
        <ServerModel position={[0, 0, 0.15]} rotation={[0, Math.PI / 2, 0]} />
        <BookModel position={[0, 0, -0.15]} scale={0.85} />
      </group>


      <Interactive section="experience" position={[1.6, 1.4, 0.001]} rotation={[0, (3 * Math.PI) / 2, 0]} scale={0.7}>
        <BulletinModel />
      </Interactive>
    </>
  )
}
