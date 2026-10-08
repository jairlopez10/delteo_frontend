import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Catalogo from './paginas/Catalogo'
import Home from './paginas/Home'
import Nosotros from './paginas/Nosotros'
import { Paginaprovider } from './context/Paginaprovider'
import Producto from './paginas/Producto'
import Catalogomayorista from './paginas/Catalogomayorista'
import Checkout from './paginas/Checkout'
import PedidoConfirmado from './paginas/PedidoConfirmado'
import PagoResultado from './paginas/PagoResultado'

function App() {
  
  return (
    <BrowserRouter>
      <Paginaprovider>
        <Routes>
          <Route path='/' element={<Layout />}>
            {/* La home es la página de marca; el listado completo vive en /juguetes */}
            <Route index element={<Home />} />
            <Route path='/juguetes' element={<Catalogo />}/>
            <Route path='/nosotros' element={<Nosotros />}/>
            {/* Va antes de la ruta dinámica de producto, que también encajaría con dos segmentos */}
            <Route path='/pago/resultado' element={<PagoResultado />}/>
            <Route path='/:titulo/:tipocliente' element={<Producto />}/>
            <Route path='/mayorista' element={<Catalogomayorista />}/>
            <Route path='/checkout' element={<Checkout />}/>
            <Route path='/pedidoconfirmado' element={<PedidoConfirmado/>}/>
          </Route>
        </Routes>
      </Paginaprovider>
    </BrowserRouter>
  )
}

export default App
