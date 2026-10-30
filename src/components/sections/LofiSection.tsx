// Solo el ID del video de YouTube (lo que va después de "watch?v="), no la URL completa.
const LOFI_VIDEO_ID = 'BYTxPFj44uo'

export function LofiSection() {
  return (
    <div className="video">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${LOFI_VIDEO_ID}?autoplay=1`}
        title="Lofi en YouTube"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
