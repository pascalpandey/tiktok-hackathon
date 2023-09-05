import './globals.css'
import { Noto_Sans } from 'next/font/google'
import Navbar from '../components/NavBar'
import SearchBar from '../components/SearchBar'
import { Inter } from 'next/font/google'
const noto_sans = Noto_Sans({ 
  weight:['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'] 
})


export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col overflow-x-hidden">
        {/* 
            Need to fix: 
            - Kalo di scroll ampe bawah, navbar sama seachbarnya collide (bnr bnr hrs infinite scroll?) 
            - Searchbarnya ketumpuk sama tulisan tulisan dari PageFeed
        */}
        <SearchBar/>
        <div className='flex flex-row'>
          <Navbar/>
          {children}
        </div>
        
        </body>
    </html>
  )
}
