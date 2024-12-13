import React from 'react'

const Gimnasio = () => {
  return (
    <>
        <div className="div-aida">
            <img src="/gimnasio2.gif" alt="gif ak" />
            <h4 className=" mt-4">¿Lo mejor para tu bebe en los primeros meses?</h4>
            <p className=" mt-4 text-center">¡Estimula el desarrollo <span className=' font-bold'>sensorial, fisico y cognitivo </span>de los mas pequeños!</p>
        </div>
        <div className="div-aida">
            <img src="/gimnasio1.webp" alt="gif ak" />
            <h4 className=" mt-4">¡Despierta su sentido auditivo!</h4>
            <p className=" mt-4 text-center">¡Incluye <span className=' font-bold'>+ 10 melodias diferentes</span> para una gran experiencia!</p>
        </div>
        <div className="div-aida">
            <img src="/gimnasiogif1.webp" alt="gif ak" />
            <h4 className=" mt-4">¡Practicidad y entretenimiento!</h4>
            <p className=" mt-4 text-center">¡Facil de <span className='font-bold'>transportar y plegable </span>para llevarlo donde quieras</p>
        </div>

        <div className="div-aida">
          <h4 className=" mt-4">¿Qué es lo que incluye?</h4>
          <div className="lista-incluye">
            <ul >
              <li>Tapete gimnasio interactivo</li>
              <li>Piano musical</li>
              <li>Colgantes interactivos</li>
              <li>Soportes</li>
            </ul>
          </div>
        </div>
    </>
  )
}

export default Gimnasio