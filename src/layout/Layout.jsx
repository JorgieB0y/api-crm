import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'

export const Layout = () => {

    const location = useLocation();
    const currentURL = location.pathname;

    return (
        <div className = "md:flex md:min-h-screen">

            <div className = "md:w-1/4 bg-blue-900 px-5 py-10">
                <h2 className = "text-4xl font-black text-center text-white">Jorgis CRM</h2>

                <nav className = "mt-10">
                    <Link className = {`${currentURL === '/clients' ? 'text-blue-300' : 'text-white' } text-2xl block mt-2 hover:text-blue-300"`} to ="/clients" >Clients</Link>
                    <Link className = {`${currentURL === "/clients/clients/new" ? "text-blue-300" : "tex-twhite"} text-white text-2xl block mt-2 hover:text-blue-300`} to ="clients/new">New Client</Link>
                </nav>
            </div>

            <div className = "md:w-3/4 md:h-screen p-10 overflow-scroll">
                <Outlet />
            </div>

        </div>
    )
}
