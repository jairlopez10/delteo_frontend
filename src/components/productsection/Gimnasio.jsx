import React from 'react'

const Gimnasio = () => {
  return (
    <>
        <div className="div-aida">
            <img src="/gimnasiogif1.webp" alt="gif ak" />
            <h4 className=" mt-4">¿Tus hij@s sueñan con tener una mascota?</h4>
            <p className=" mt-4 text-center">¡Una experiencia real por como <span className=' font-bold'>camina, saca la lengua y repite  </span>lo que dices!</p>
        </div>
        <div className="div-aida">
            <img src="/perrogif2.gif" alt="gif ak" />
            <h4 className=" mt-4">¡Acaricialo para que saque su lengua!</h4>
            <p className=" mt-4 text-center">¡Camina y ladra cuando lo <span className=' font-bold'>concientes</span> en su cabeza o su cuerpo!</p>
        </div>
        <div className="div-aida">
            <img src="/perrogif3.gif" alt="gif ak" />
            <h4 className=" mt-4">¡Cuentale todas las aventuras que tengas!</h4>
            <p className=" mt-4 text-center">¡Hablale y <span className='font-bold'>cuentale una historia</span> y la escuchara completa! - Bateria Recargable 🔋 </p>
        </div>

        <div className="div-aida">
          <h4 className=" mt-4">¿Qué es lo que incluye?</h4>
          <div className="lista-incluye">
            <ul >
              <li>Perro Sensor Interactivo</li>
              <li>Lazo</li>
              <li>Bateria Recargable 🔋</li>
              <li>Cable USB</li>
              <li>Collar o pañuelo</li>
            </ul>
          </div>
        </div>
    </>
  )
}

export default Gimnasio