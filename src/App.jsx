import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Catalogo from './paginas/Catalogo'
import Nosotros from './paginas/Nosotros'
import { Paginaprovider } from './context/Paginaprovider'
import Producto from './paginas/Producto'
import Catalogomayorista from './paginas/Catalogomayorista'
import Checkout from './paginas/Checkout'
import PedidoConfirmado from './paginas/PedidoConfirmado'

function App() {
  
  return (
    <BrowserRouter>
      <Paginaprovider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Catalogo />} />
            <Route path='/nosotros' element={<Nosotros />}/>
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
