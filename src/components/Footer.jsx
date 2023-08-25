import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
      <footer className=" bg-black flex justify-center">
        
        <Link to="/" className="logo" onClick={() => setmenu(false)}>
            <img src="/logo.png" alt="" />
        </Link>
      </footer>
    </>
  )
}

export default Footer