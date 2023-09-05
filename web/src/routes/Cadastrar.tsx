import { Button } from "../components/form/Button";
import { Input } from "../components/form/Input";
import { Label } from "../components/form/Label";

import { useNavigate } from 'react-router-dom'

export function Cadastrar(){
  const navigate = useNavigate()
  function handleSignin(){
    navigate('/login')
  }

  return(
    <section className=''>
    <h1 className='text-2xl font-thin text-center mt-14'>Routine Control</h1>
    <section className='pt-12 max-w-lg m-auto flex flex-col items-center gap-4 max-md:max-w-md max-sm:max-w-xs'>
      <p className='font-bold'>Cadastre-se</p>
       <Button 
        text='Inscreva-se com o Google'
        className='btn bg-red-500 w-full py-2 rounded-full'
      />
      <div className='flex flex-row gap-2 w-full'>
        <hr role="presentation" className='hr hr-size'/>
          <span>ou</span>
        <hr className='hr hr-size'/>
      </div>
      <form action="">
        <Label
          text='Qual é o seu e-mail?'
          htmlFor=''
        />
        <Input
          type='text'
          placeholder='Insira seu e-mail'
        />
           <Label
          text='Confirme seu e-mail'
          htmlFor=''
        />
        <Input
          type='text'
          placeholder='Insira o e-mail novamente'
        />
        <Label
          text='Crie uma senha'
          htmlFor=''
        />
        <Input
          type='password'
          placeholder='Crie uma senha.'
        />
        <Label
          text='Como devemos chamar você?'
          htmlFor=''
        />
        <Input
          type='text'
          placeholder='Insira um nome de perfil.'
        />
        <Label 
          text="Qual sua data de nascimento?"
          htmlFor=""
        />
        <section>
          <Input 
            type="date"
            placeholder=""
          />
        </section>

        {/* <Label 
          text="Qual seu gênero?"
          htmlFor=""
        />

        <section className="flex items-center text-sm justify-between flex-wrap w-2">
          <section className="flex items-center gap-1">
            <Input
              type="radio"
              name="genero"
              value="Masculino"
            />
            Masculino
          </section>

          <section className="flex items-center gap-1">
            <Input
              type="radio"
              name="genero"
              value="feminino"
            />
            Feminino
          </section>

          <section className="flex items-center gap-1">
            <Input
              type="radio"
              name="genero"
              value="Não binário"
              children="Não binário"
            />
            
          </section>

          <section className="flex items-center gap-1">
            <Input
              type="radio"
              name="genero"
              value="Outros"
            />
            Outros
          </section>
        </section> */}

        <div className='flex gap-1'>
          <input type="checkbox" name="lembrar" id="lembrar" title='Lembrar de mim' className='w-4 checked:'/>
          <p>Lembrar de mim</p>
        </div>
        <Button 
          text='Cadastrar'
          className='btn bg-green-500 w-1/2 py-2 mt-4 rounded-full right-5 block m-auto'
        />
      </form>
      <hr role="presentation" className='hr hr-size w-full'/>
      <h2 className='text-xl font-bold'>Já tem uma conta?</h2>
      <Button 
        className='btn bg-green-500 border border-green-500 text-black w-full py-2 mb-4 rounded-full'
        text="Faça login"
        handleOnClick={handleSignin}
      />
        
  
    </section>
  </section>
  )
}