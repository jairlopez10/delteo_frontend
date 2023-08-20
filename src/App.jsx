import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Catalogo from './paginas/Catalogo'
import Nosotros from './paginas/Nosotros'
import { Paginaprovider } from './context/Paginaprovider'
import Producto from './paginas/Producto'

function App() {
  
  return (
    <BrowserRouter>
      <Paginaprovider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Catalogo />} />
            <Route path='/nosotros' element={<Nosotros />}/>
            <Route path='/:titulo' element={<Producto />}/>
          </Route>
        </Routes>
      </Paginaprovider>
    </BrowserRouter>
  )
}

export default App
