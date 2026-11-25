import Header from "../components/Header"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"
import useCuponUrl from "../hooks/useCuponUrl"

const Layout = () => {

  // Cupón del enlace compartido (?cupon=...): vale en cualquier página de entrada
  useCuponUrl()

  return (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
  )
}

export default Layout