// Íconos Tabler (outline) usados en la página de producto
const trazos = {
  pin: <><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M17.66 16.66l-4.25 4.24a2 2 0 0 1 -2.82 0l-4.25 -4.24a8 8 0 1 1 11.32 0z" /></>,
  efectivo: <><rect x="7" y="9" width="14" height="10" rx="2" /><circle cx="14" cy="14" r="2" /><path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2" /></>,
  escudo: <><path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" /><path d="M9 12l2 2l4 -4" /></>,
  camion: <><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /><path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" /></>,
  cambio: <><path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" /><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" /></>,
  check: <path d="M5 12l5 5l10 -10" />,
  abajo: <path d="M6 9l6 6l6 -6" />,
  izquierda: <path d="M15 6l-6 6l6 6" />,
  derecha: <path d="M9 6l6 6l-6 6" />,
  cerrar: <path d="M18 6l-12 12M6 6l12 12" />,
  regalo: <><rect x="3" y="8" width="18" height="4" rx="1" /><path d="M12 8v13M19 12v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-7M7.5 8a2.5 2.5 0 0 1 0 -5c2.5 0 4.5 5 4.5 5s2 -5 4.5 -5a2.5 2.5 0 0 1 0 5" /></>,
  play: <path d="M8 5v14l11 -7z" fill="currentColor" stroke="none" />,
  estrella: <path fill="currentColor" stroke="none" d="M12 17.75l-6.17 3.25l1.18 -6.88l-5 -4.87l6.9 -1l3.09 -6.25l3.09 6.25l6.9 1l-5 4.87l1.18 6.88z" />,
  whatsapp: <><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></>,
  compartir: <><circle cx="6" cy="12" r="3" /><circle cx="18" cy="6" r="3" /><circle cx="18" cy="18" r="3" /><path d="M8.7 10.7l6.6 -3.4M8.7 13.3l6.6 3.4" /></>
}

const Icono = ({ nombre, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`pdp-icono ${className}`}
    aria-hidden="true"
  >
    {trazos[nombre]}
  </svg>
)

export default Icono
