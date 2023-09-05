
import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import { HabitsList } from './HabitsList';

//biblioteca para adicionar condições nas classes, onde o primeiro argumento é o default da classe e o segundo é um objeto contendo as outras condicionais.
import clsx from 'clsx';
import dayjs from 'dayjs';
import { useState } from 'react';


interface HabitDayProps{
    defaultCompleted?: number
    amount?:number
    date:Date
}


export function HabitDay({defaultCompleted = 0, amount = 0, date}:HabitDayProps){

    const [completed, setCompleted] = useState(defaultCompleted)

    //calcula o percentual de tarefas concluidas
    const completedPercentage = amount > 0 ? Math.round((completed / amount) * 100) : 0

    //traz as informações de cada dia em mês/dia
    const dayAndMonth = dayjs(date).format('DD/MM')
    
    //traz o dia da semana ex: segunda-feira
    const dayOfWeek = dayjs(date).format('dddd')


    function handleCompletedChanged(completed:number){
        setCompleted(completed)
    }

    return(
        <Popover.Root>
            <Popover.Trigger className={clsx('w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-full',{
                 'bg-green-800 border-green-700':completedPercentage >= 20 && completedPercentage < 40,
                 'bg-green-700 border-green-600':completedPercentage >= 40 && completedPercentage < 60,
                'bg-green-600 border-green-500':completedPercentage >= 60 && completedPercentage < 80,
                'bg-green-500 border-green-400':completedPercentage >= 80 && completedPercentage < 100,
                'bg-green-400 border-green-300':completedPercentage >= 100 ,

            })} />
            

            <Popover.Portal>
                <Popover.Content className="min-w-[320px] p-6 rounded-2xl flex flex-col bg-zinc-900">
                    <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
                    <span className='font-extrabold mt-1 leading-tight text-3xl'>{dayAndMonth}</span>

                    <ProgressBar progress={completedPercentage}/>
                    
                    <HabitsList 
                        date={date}
                        onCompletedChanged={handleCompletedChanged}
                    />

                    <Popover.Arrow height={8} width={16} className="fill-zinc-900"/>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    )
}