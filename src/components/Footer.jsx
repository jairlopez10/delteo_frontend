import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <>
      <footer className=" bg-black flex justify-center">
        <Link to="/" className="footercontent">Jammy</Link>
      </footer>
    </>
  )
}

export default Footer