import logo2 from '../assets/logo2.svg'
import * as Dialog from '@radix-ui/react-dialog'
import { useNavigate } from 'react-router-dom'


import { Plus, X } from 'phosphor-react'
import { NewHabitForm } from './NewHabitForm'

export function Header(){

  const navigate = useNavigate()
  function handleLogo(){
    navigate('/logado')
  }

  //Estado => Variaveis monitoradas pelo React

    return(
        <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
        <img 
          src={logo2} 
          alt="routine"
          onClick={handleLogo}
          className='cursor-pointer'
        />

        <Dialog.Root>
          <Dialog.Trigger 
            type="button"
            className="border border-green-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-green-300"
            >
              <Plus size={20} className="text-green-500"/>
              Nova tarefa
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className='w-screen h-screen bg-black/80 fixed inset-0'/>

            <Dialog.Content className='absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
              <Dialog.Close className='absolute right-6 top-6 text-zinc-400 hover:text-zinc-200'>
                <X size={24} aria-label='Fechar'/>
              </Dialog.Close>
              
              <Dialog.Title className="text-3xl leading-tight text-white font-extrabold">
                Adicionar tarefa
              </Dialog.Title>

              <NewHabitForm />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    )
}