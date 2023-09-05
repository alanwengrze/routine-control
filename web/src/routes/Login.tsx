import { useNavigate } from 'react-router-dom'

import { useState } from 'react'


import '../styles/Login.css'
import '../styles/hr.css'
import '../styles/Button.css'

import { Button } from '../components/form/Button'
import { Label } from '../components/form/Label'
import { Input } from '../components/form/Input'

export function Login(){

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  function handleSignup(){
    navigate('/cadastrar')
  }
  const handleSubmit = (e:any)=>{
    e.preventDefault()
    console.log(email,password)
    navigate('/homeLog')
  }
  return(
    <section className='w-screen h-screen'>
      <h1 className='text-2xl text-white font-thin text-center pt-14'>Routine Control</h1>
      <section className='pt-12 max-w-lg m-auto flex flex-col items-center gap-4 max-md:max-w-md max-sm:max-w-xs'>
        <p className='font-bold text-white'>Fazer Login</p>
         <Button 
          text='Continuar com Google'
          className='btn bg-red-500 w-full py-2 rounded-full'
        />
        <div className='flex flex-row gap-2 w-full'>
          <hr role="presentation" className='hr hr-size'/>
            <span className='text-white'>ou</span>
          <hr className='hr hr-size'/>
        </div>
        <form action="">
          <Label
            text='Endereço de e-mail ou nome de usuário'
            htmlFor=''
          />
          <Input
            type='text'
            placeholder='Endereço de e-mail ou nome de usuário'
            value={email}
            onChange={(e:any)=>setEmail(e.target.value)}
          />
          <Label
            text='Senha'
            htmlFor=''
          />
          <Input
            type='password'
            placeholder='Senha'
            value={password}
            onChange={(e:any)=>setPassword(e.target.value)}
          />

          <a href="#" className='hidden'>Esqueceu sua senha?</a>


          <div className='flex gap-1'>
            <input type="checkbox" name="lembrar" id="lembrar" title='Lembrar de mim' className='w-4 checked:'/>
            <p>Lembrar de mim</p>
          </div>
          <Button 
            text='Fazer Login'
            className='btn bg-green-500 w-1/2 py-2 mt-4 rounded-full right-5 block m-auto'
            handleOnClick={handleSubmit}
          />
        </form>
        <hr role="presentation" className='hr hr-size w-full'/>
        <h2 className='text-xl font-bold'>Não tem uma conta?</h2>
        <Button 
          text='Inscreva-se no Routine Control'
          className='btn bg-green-500 border border-green-500 text-black w-full py-2 rounded-full'
          handleOnClick={handleSignup}
        />
      </section>
    </section>
  )
}