import { useEffect, useRef, useState } from "react"

// Clip corto en bucle (reemplazo de los GIF). Solo se descarga y reproduce cuando está cerca de la pantalla.
const Videodestacado = ({ src, poster }) => {

  const videoRef = useRef(null)
  const [cerca, setCerca] = useState(false)
  const [sinMovimiento] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (!('IntersectionObserver' in window)) {
      setCerca(true)
      return
    }
    const observer = new IntersectionObserver(([entrada]) => {
      if (entrada.isIntersecting) {
        setCerca(true)
        if (!sinMovimiento) video.play().catch(() => {})
      } else {
        video.pause()
      }
    }, { rootMargin: '300px 0px' })
    observer.observe(video)
    return () => observer.disconnect()
  }, [sinMovimiento])

  return (
    <video
      ref={videoRef}
      src={cerca ? src : undefined}
      poster={cerca ? poster : undefined}
      autoPlay={cerca && !sinMovimiento}
      controls={sinMovimiento}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden={!sinMovimiento}
    />
  )
}

export default Videodestacado
