import { Overpass } from 'next/font/google'
import NavBar from '@components/NavBar';
import Footer from '@components/Footer';
import Provider from '@components/Provider';
import './globals.css'

const overpass = Overpass({ subsets: ['latin'],weights:[500,600,700,800,900] })

export const metadata = {
  title: 'Hostel Premier League',
  description: 'Immerse yourself in the cricketing extravaganza of Hostel Premier League! Discover the pulse-pounding matches, register your dream team, and stay updated with the latest cricketing buzz. Join the league now!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={overpass.className}>
        <Provider>
          <NavBar/>
          {children}
          <Footer/>
        </Provider>
      </body>
    </html>
  )
}
