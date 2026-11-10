import { useEffect, useRef } from 'react'
import { LOFI_VIDEO_ID, LOFI_VOLUME } from '@/data/music'
import { useMusicStore } from '@/hooks/useMusicStore'
import { createPlayerMount, loadYouTubeApi } from '@/utils/youtube'
import type { YTPlayer } from '@/utils/youtube'

// Reproductor de YouTube oculto con el lofi a bajo volumen, en bucle. Es la única fuente de audio
// y solo se controla con useMusicStore (tecla del VHS); arranca en pausa hasta que el usuario la pulsa.
export function BackgroundMusic() {
  const container = useRef<HTMLDivElement>(null)
  const player = useRef<YTPlayer | null>(null)
  const playing = useMusicStore((s) => s.playing)
  const playingRef = useRef(playing)

  useEffect(() => {
    let cancelled = false
    loadYouTubeApi().then((YT) => {
      if (cancelled || !container.current) return
      const p = new YT.Player(createPlayerMount(container.current), {
        videoId: LOFI_VIDEO_ID,
        // loop solo funciona si el mismo video también va en playlist.
        playerVars: { loop: 1, playlist: LOFI_VIDEO_ID, controls: 0, playsinline: 1 },
        events: {
          onReady: () => {
            p.setVolume(LOFI_VOLUME)
            player.current = p
            // Si se pulsó la tecla antes de que el reproductor cargara.
            if (playingRef.current) p.playVideo()
          },
        },
      })
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    playingRef.current = playing
    if (playing) player.current?.playVideo()
    else player.current?.pauseVideo()
  }, [playing])

  return (
    <div className="background-music" ref={container} aria-hidden />
  )
}
