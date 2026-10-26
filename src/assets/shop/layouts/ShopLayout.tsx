import { Outlet } from "react-router"
import { CustomHeaders } from "../components/CustomHeaders"
import { CustomFooter } from "../components/CustomFooter"



export const ShopLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <CustomHeaders />
      <Outlet />
      <CustomFooter />
    </div>
  )
}
