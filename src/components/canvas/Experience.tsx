import { BookModel } from './BookModel'
import { CameraRig } from './CameraRig'
import { ComputerModel } from './ComputerModel'
import { DESKTOP_TOP_Y, DesktopModel } from './DesktopModel'
import { LamparaModel } from './LamparaModel'
import { LaptopModel } from './LaptopModel'
import { PeripheralModel } from './PeripheralModel'
import { RepisaModel } from './RepisaModel'
import { ServerModel } from './ServerModel'
import { ShelfModel } from './ShelfModel'
import { SolderModel } from './SolderModel'
import { VasoModel } from './VasoModel'
import { VhsModel } from './VhsModel'

export function Experience() {
  return (
    <>
      <color attach="background" args={['#14141c']} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[1.5, 3, 2]} intensity={2} />
      <CameraRig />
      <DesktopModel />
      <LamparaModel position={[0.4, DESKTOP_TOP_Y, -0.22]} />
      <VasoModel position={[-0.8, DESKTOP_TOP_Y, 0.20]} />
      <RepisaModel position={[0.1 , DESKTOP_TOP_Y + 0.4 , -0.15]} />
      <ComputerModel position={[-0.7, DESKTOP_TOP_Y, -0.15]} />
      <SolderModel position={[0.1 , DESKTOP_TOP_Y , -0.15]} />
      <VhsModel position={[-0.2 , DESKTOP_TOP_Y+0.1 , -0.15]} />
      <ShelfModel position={[-0.2 , DESKTOP_TOP_Y , -0.15]} />
      <LaptopModel position={[0.7, DESKTOP_TOP_Y, 0.10]} />
      <PeripheralModel position={[-0.2 , DESKTOP_TOP_Y , 0.2]} />
      <ServerModel position={[0.1 , DESKTOP_TOP_Y + ( 0.5 + 0.08) , -0.15]} />
      <BookModel position={[-0.1 , DESKTOP_TOP_Y + ( 0.5 + 0.08) , -0.15]} />

    </>
  )
}
