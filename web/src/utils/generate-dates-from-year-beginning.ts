import dayjs from 'dayjs';

//retorna um array com todos os dias anteriores do ano

export function generateDatesFromYearBeginnig(){
    const firstDayOfTheYear = dayjs().startOf('year')
    const today = new Date()
  
    const dates = []
    let compareDate = firstDayOfTheYear

    while(compareDate.isBefore(today)){
        dates.push(compareDate.toDate())
        compareDate = compareDate.add(1, 'day')
    }

    return dates
}