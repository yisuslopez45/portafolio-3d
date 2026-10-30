// Lo mínimo de la IFrame API de YouTube que usa el proyecto.
export interface YTPlayer {
  playVideo: () => void
  pauseVideo: () => void
  setVolume: (volume: number) => void
  mute: () => void
  destroy: () => void
}
interface YTNamespace {
  Player: new (
    el: HTMLElement,
    options: {
      videoId: string
      playerVars: Record<string, string | number>
      events: { onReady: () => void }
    },
  ) => YTPlayer
}
declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

// La API sustituye el elemento por su iframe: se le da un nodo creado a mano dentro de `parent`
// para no romper el DOM que maneja React.
export function createPlayerMount(parent: HTMLElement) {
  return parent.appendChild(document.createElement('div'))
}

let apiPromise: Promise<YTNamespace> | null = null

// Carga el script de la API una sola vez, aunque la pidan varios reproductores.
export function loadYouTubeApi(): Promise<YTNamespace> {
  apiPromise ??= new Promise((resolve) => {
    if (window.YT?.Player) return resolve(window.YT)
    window.onYouTubeIframeAPIReady = () => resolve(window.YT!)
    const script = document.createElement('script')
    script.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(script)
  })
  return apiPromise
}
