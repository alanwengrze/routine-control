import { Link } from 'react-router-dom'

export function Navbar(){
  return(
    <nav className='mt-4'>
      <ul className='flex gap-4 items-center'>
      <li className='border-transparent border rounded-full hover:border-green-500 px-3 py-2'>
          <Link to="/cadastrar">Cadastrar-se</Link>
        </li>
        <li className='rounded-full border border-green-500 px-3 py-2 bg-green-500'>
          <Link to="/login">Entrar</Link>
        </li>
      </ul>
    </nav>
  )
}