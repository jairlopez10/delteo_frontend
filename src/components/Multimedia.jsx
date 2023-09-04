
const Multimedia = ({multimedia, setmultiactual}) => {
    

  return (
    <>
        {multimedia.tipo === 'imagen' ? (
            <>
                <img src={multimedia.url} alt="imagen" className="imagen-prod-pag cursor-pointer" onClick={() => setmultiactual(multimedia)} />
            </>
        ) : (
            <>
                <video className="imagen-prod-pag cursor-pointer" onClick={() => setmultiactual(multimedia)}>
                    <source src={multimedia.url} />
                </video>
            </>
        )}
    </>
  )
}

export default Multimedia