import { useEffect, useRef } from 'react'
import { LOFI_VIDEO_ID } from '@/data/music'
import { useMusicStore } from '@/hooks/useMusicStore'
import { createPlayerMount, loadYouTubeApi } from '@/utils/youtube'
import type { YTPlayer } from '@/utils/youtube'

// Solo imagen: el audio sale de <BackgroundMusic>. Va silenciado, sin controles ni clics,
// y se reproduce o pausa al ritmo de la tecla del VHS.
export function LofiSection() {
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
        playerVars: { mute: 1, controls: 0, disablekb: 1, loop: 1, playlist: LOFI_VIDEO_ID, playsinline: 1, rel: 0 },
        events: {
          onReady: () => {
            p.mute()
            player.current = p
            if (playingRef.current) p.playVideo()
          },
        },
      })
    })
    return () => {
      cancelled = true
      player.current?.destroy()
      player.current = null
    }
  }, [])

  useEffect(() => {
    playingRef.current = playing
    if (playing) player.current?.playVideo()
    else player.current?.pauseVideo()
  }, [playing])

  return (
    <div className="video" ref={container} />
  )
}
