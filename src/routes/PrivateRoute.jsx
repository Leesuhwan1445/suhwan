import React from 'react'
import { Navigate ,Outlet} from 'react-router-dom'

const PrivateRoute = () => {
    const me = JSON.parse(localStorage.getItem("user") || "null")
    return me ? <Outlet/> : <Navigate to = "/Login" replace />
}
export default PrivateRoute