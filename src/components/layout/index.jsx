import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../footer'
import Header from '../header'
import "./index.scss";

function Layout() {
  return (
    <div>
        <Header/>
        <div className="content">
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default Layout