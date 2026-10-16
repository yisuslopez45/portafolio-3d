import { CameraRig } from './CameraRig'
import { ComputerModel } from './ComputerModel'
import { DESKTOP_TOP_Y, DesktopModel } from './DesktopModel'
import { LamparaModel } from './LamparaModel'
import { RepisaModel } from './RepisaModel'
import { VasoModel } from './VasoModel'

export function Experience() {
  return (
    <>
      <color attach="background" args={['#14141c']} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[1.5, 3, 2]} intensity={2} />
      <CameraRig />
      <DesktopModel />
      <LamparaModel position={[0.7, DESKTOP_TOP_Y, -0.22]} />
      <VasoModel position={[-0.8, DESKTOP_TOP_Y, 0.20]} />
      <RepisaModel position={[0.1 , DESKTOP_TOP_Y + 0.4 , -0.15]} />
      <ComputerModel position={[-0.7, DESKTOP_TOP_Y, -0.15]} />
    </>
  )
}
