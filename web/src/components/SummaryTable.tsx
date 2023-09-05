import { useEffect, useState } from "react"
import { api } from "../lib/axios"
import { generateDatesFromYearBeginnig } from "../utils/generate-dates-from-year-beginning"
import { HabitDay } from "./HabitDay"
import dayjs from "dayjs"


const weekdays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const summaryDates = generateDatesFromYearBeginnig()

const minimumSummaryDatesSize = 18 * 7 //18 weeks

const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

type Summary ={
    id:string
    date:string
    amount:number
    completed:number
}[]

export function SummaryTable(){
    const [summary, setSummary] = useState<Summary>([])

    useEffect(()=>{
        api.get('summary').then(response=>{
            setSummary(response.data)
        })
    },[])

    return(
        
        <div className="w-full flex">
            {/* Dias da semana (D, S, T, Q, Q, S, S) */}
            <div className="grid grid-rows-7 grid-flow-row gap-3">
                {
                    weekdays.map((weekDay, index) => {
                        return(
                            <div 
                                key={`${weekDay}-${index}`} 
                                className="text-zinc-300 text-xl font-bold h-10 w-10 flex items-center justify-center"
                            >
                                {weekDay}
                            </div>
                        )
                    })
                }
            </div>

            {/* Grid dos dias do ano */}
            <div className="grid grid-rows-7 grid-flow-col gap-3">
                {summary.length > 0 && summaryDates.map(date=>{
                    //validando se alguma data existente é igual a alguma data do resumo(summary)
                    const dayInSummary = summary.find(day =>{
                        return dayjs(date).isSame(day.date, 'day')
                    })
                    return (
                        <HabitDay 
                            key={date.toString()}
                            date={date}
                            amount={dayInSummary?.amount} 
                            defaultCompleted={dayInSummary?.completed} 
                        />
                    )
                })}

                {/* Gera os dias indisponíveis (próximos dias do ano) */}
                {amountOfDaysToFill > 0 && Array.from({length : amountOfDaysToFill}).map((_,i)=>{
                    return(
                        <div 
                            key={i} 
                            className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-full opacity-40 cursor-not-allowed"
                        />
                    )
                })}
            </div>
        </div>
    )
}

