// Los archivos van en public/docs/ y se referencian desde la raíz (public/docs/cv.pdf → '/docs/cv.pdf').
// TODO: agrega tus archivos reales en public/docs/ y ajusta esta lista.
const DOWNLOADS = [
  { name: 'Curriculum Vitae', description: 'Mi CV actualizado en español.', file: '/docs/cv.pdf', format: 'PDF' },
  { name: 'Resume (English)', description: 'English version of my resume.', file: '/docs/resume-en.pdf', format: 'PDF' },
]

export function DownloadSection() {
  return (
    <ul className="cards downloads">
      {DOWNLOADS.map((doc) => (
        <li key={doc.file}>
          <strong>{doc.name}</strong>
          <small>{doc.format}</small>
          <p>{doc.description}</p>
          {/* `download` hace que el navegador guarde el archivo en vez de abrirlo. */}
          <a className="download-button" href={doc.file} download>
            Descargar
          </a>
        </li>
      ))}
    </ul>
  )
}
