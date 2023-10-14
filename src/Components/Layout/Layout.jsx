import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import AuthContextProvider from '../../Contexts/AuthContext'
import { Offline } from "react-detect-offline";
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

function Layout() {


  let queryClient = new QueryClient()

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Navbar />
          <div className="container">
            <Outlet />
          </div>
          <Footer />
          <Offline>
            <div className="offline">
              <p className='mb-0'>You're offline right now. Check your connection.</p>
            </div>
          </Offline>
          <Toaster />
        </AuthContextProvider>
        <ReactQueryDevtools position='bottom-right'/>
      </QueryClientProvider>



    </>
  )
}

export default Layout