import { FastifyInstance } from "fastify"
import { z } from 'zod'
//zod é uma biblioteca para validação de dados.
import dayjs from 'dayjs'
//dayjs é uma biblioteca para trabalhar com datas no javascript

import { prisma } from "./lib/prisma"


export async function appRoutes(app:FastifyInstance){

    //rota para criar tarefas
    app.post('/habits', async (request) => {

    const createHabitBody = z.object({
        title: z.string(),
        weekDays: z.array(
            z.number().min(0).max(6)
            )
    })
    const { title, weekDays} = createHabitBody.parse(request.body)

    const today = dayjs().startOf('day').toDate()
    // startOf('day') zera a contagem de horas do dia, independente da hora do dia que vc cria um hábito, ele vai zerar a hora.

    await prisma.habit.create({
        data:{
            title,
            created_at: today,
            weekDays:{
                create:weekDays.map(weekDay=>{
                    return{
                        week_day:weekDay,
                    }
                })
            }
        }
    })


    })


    //rota de detalhes do dia (o user clica no quadrado do dia e deve retornar todos os hábitos daquele dia)
    app.get('/day',async(request) => {
        const getDayParams = z.object({
            date:z.coerce.date() // coerce converte o parametro que vou receber dentro de date em data
        })

        const { date } = getDayParams.parse(request.query)

        const parsedDate = dayjs(date).startOf('day')
        const weekDay = parsedDate.get('day')

        console.log(weekDay, date)

        //todos os hábitos possíveis
        const possibleHabits = await prisma.habit.findMany({
            where:{
                //isso determina que apenas tasks criadas antes do dia que foi criada.
                created_at:{
                    lte:date,
                },

                //determina o/os dia/as da semana em que a task está disponível
                weekDays:{
                    some:{
                        week_day:weekDay,
                    }
                }
            }
        })

        const day = await prisma.day.findUnique({
            where:{
                date:parsedDate.toDate(),
            },
            include:{
                dayHabits:true,
            },
        })

        //todos os hábitos completados
        //o operador ? checa se o dia não tá nulo
        const completedHabits = day?.dayHabits.map(dayHabit =>{
            return dayHabit.habit_id
        })??[]

        return {
            possibleHabits,
            completedHabits
        }
    })

    //toggle (marcar ou desmarcar check do habito)
    app.patch('/habits/:id/toggle', async (request)=>{
        //habits(rota)/:id( param => parametro de identificação) ex: /habits/1

        const toggleHabitParams = z.object({
            id: z.string().uuid(),
        })

        const { id } = toggleHabitParams.parse(request.params)

        //startOf descarta minutos, horas e segundos, como se o dia começasse do total 0.
        const today = dayjs().startOf('day').toDate()

        //usando o today, apenas tarefas do dia atual poderão ser marcadas como feitas ou desmarcadas.
        let day = await prisma.day.findUnique({
            where:{
                date:today,
            }
        })

        if(!day){
            day = await prisma.day.create({
                data:{
                    date:today,
                }
            })
        }

        const dayHabit = await prisma.dayHabit.findUnique({
            where:{
                day_id_habit_id:{
                    day_id:day.id,
                    habit_id:id,
                }
            }
        })

        if(dayHabit){
            //remover a marcação de completo
            await prisma.dayHabit.delete({
                where:{
                    id:dayHabit.id,
                }
            })
        }else{
            //completar o habito neste dia
            await prisma.dayHabit.create({
                data:{
                    day_id:day.id,
                    habit_id:id,
                }
            })
        }

        
    
    })

    app.get('/summary', async ()=>{
        // retorna uma lista(array) de objetos com [ {date:08/01(data), amount: 5(numero de tasks possiveis), completed: 3(numero de tasks completadas) }, {date:09/01, amount: 6, completed: 5 } ] 


        const summary = await prisma.$queryRaw`
            SELECT
                D.id,
                D.date,
                (
                    SELECT 
                       cast(count(*) as float)
                    FROM day_habits DH
                    WHERE DH.day_id = D.id
                ) as completed,
                (
                    SELECT
                        cast(count(*) as float)
                    FROM habit_week_days HWD
                    JOIN habits H
                        ON H.id = HWD.habit_id
                    WHERE
                        HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch')as int)
                        AND H.created_at <= D.date
                )as amount
            FROM 
                days D
        `

        return summary
    })
}

