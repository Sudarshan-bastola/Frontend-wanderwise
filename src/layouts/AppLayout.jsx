import { Outlet } from "react-router-dom"
import AppNavbar from "../components/common/AppNavbar"
import Footer from "../components/landingComponents/Footer"


const AppLayout = () => {
  return (
      <div>
          <AppNavbar />
          <Outlet />
          <Footer />
    </div>
  )
}

export default AppLayout