import { Outlet } from "react-router-dom";
import Footer from "./components/default/Footer";
import Navbar from "./components/default/Navbar"

const DefaultLayout = () => {
  return (
    <section>
        <Navbar />
        <Footer />
        {/* <Outlet /> */}
    </section>
  )
}

export default DefaultLayout;