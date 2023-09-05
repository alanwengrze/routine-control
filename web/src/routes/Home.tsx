import { Navbar } from "../components/Navbar"

import '../styles/Home.css'

export function Home(){
  return(
    <div 
      className="w-screen h-screen bg-green-900"
    >
      <header className="flex justify-between px-10 items-center">
        <h1>LOGO</h1>
        <Navbar />
      </header>
    </div>
  )
}