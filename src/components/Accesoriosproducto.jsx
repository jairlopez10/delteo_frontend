
const Accesoriosproducto = ({accesorios}) => {

  return (
    <>
        <h4 className=" text-black my-6">¿Que incluye?</h4>
        <div className="px-6">
            <ul>
                {accesorios.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
        
    </>
  )
}

export default Accesoriosproducto