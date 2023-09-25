
const Multimedia = ({multimedia, setmultiactual}) => {
    

  return (
    <>
        {multimedia.tipo === 'imagen' ? (
            <>
                <img src={multimedia.url} alt="imagen" className="imagen-prod-pag cursor-pointer" onClick={() => setmultiactual(multimedia)} />
            </>
        ) : (
            <>
                <img src="/video3.webp" alt="imagenvideo" className="imagen-prod-pag cursor-pointer" onClick={() => setmultiactual(multimedia)}/>
            </>
        )}
    </>
  )
}

export default Multimedia