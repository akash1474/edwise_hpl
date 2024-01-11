import { Overpass } from 'next/font/google'
import NavBar from '@components/NavBar';
import Footer from '@components/Footer';
import Provider from '@components/Provider';
import {EdgeStoreProvider} from "@components/edgestore"
import {Toaster} from 'react-hot-toast';
import dynamic from 'next/dynamic'
import ChatBot from "@components/ChatBot";

import './globals.css'

const overpass = Overpass({ subsets: ['latin'],weights:[500,600,700,800,900] })

export const metadata = {
  title: 'Hostel Premier League',
  description: 'Immerse yourself in the cricketing extravaganza of Hostel Premier League! Discover the pulse-pounding matches, register your dream team, and stay updated with the latest cricketing buzz. Join the league now!',
}

const toastOpt={
  success: {
    duration:5000,
    style: {
      background:"#bbf7d0",
      padding:"15px 40px",
      color:"#222",
      boxShadow:"none",
      fontWeight:"600"
    },
  },
  error: {
    style: {
      background:"#fecdd3",
      padding:"10px 30px",
      color:"#222",
      boxShadow:"none",
      fontWeight:"600"
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={overpass.className}>
        <Provider>
          <EdgeStoreProvider >
            <Toaster position="top-center" toastOptions={toastOpt}/>
            <NavBar/>
            {children}
            <Footer/>
          </EdgeStoreProvider>
        </Provider>
        <ChatBot/>
      </body>
    </html>
  )
}
