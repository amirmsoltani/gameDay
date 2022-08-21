import dayjs from 'dayjs';

const days = {
    "SUNDAY": 0,
    "MONDAY": 1,
    "TUESDAY":2,
    "WEDNESDAY": 3,
    "THURSDAY":4,
    "FRIDAY":5,
    "SATURDAY":6
}


const monthsLength = {
    0:'January',
    1:'February',
    2:'March',
    3:'April',
    4:'May',
    5:'June',
    6:'July',
    7:'August',
    8:'September',
    9:'October',
    10:'November',
    11:'December'
}

export function useValidation(values,counter,value,selectedDay,duration) {

    
    const FindHoursSave = (shape)=>{
        return  Number(duration)===1 ? value.workDays[`counter${counter}`]?.map((item)=>({values : item[shape] , day:item.day})).map((items)=>`${monthsLength[items?.day?.split("-")[1]-1]} ${items?.day?.split("-")[2]}, ${items?.day?.split("-")[0]} ${items?.values}`)  :Object.keys(value.workDays).map((item)=>value.workDays[item]).flat()?.map((item)=>({values : item[shape] , day:item.day})).map((items)=>`October ${days[items?.day]}, ${new Date().getFullYear()} ${items?.values}`)
    }

    const StartTime = FindHoursSave('startTime');
    const EndTime = FindHoursSave('endTime');

    const  addzero = (item) => {
        const firstitem = String(item)[0];
        const seconditem = String(item)[1];
        return (Number(firstitem) === 0 && seconditem === undefined ? '00' : Number(firstitem) === 0 && Number(seconditem) === 0 ? '00' : Number(firstitem) === 0 ? item : (parseInt(item) >= 0 && parseInt(item) <= 9) ? `0${item}` : item)
    }

    const resultTime = (format,shape) =>{
        return addzero(values[`${shape}${counter}`])
    }

    const TimeWithMinuteAndDate = (format,shape,minute) =>{
        return  Number(duration) === 1 ? `${monthsLength[selectedDay?.split("-")[1]-1]} ${selectedDay?.split("-")[2]}, ${selectedDay?.split("-")[0]} ${addzero(values[`${shape}${counter}`])}:${minute} ${format}` :`October ${days[selectedDay]}, ${new Date().getFullYear()} ${addzero(values[`${shape}${counter}`])}:${minute} ${format}`
    }
   
    const checkTimeRange = () =>{
        return ((values[`start_time_format${counter}`] === values[`end_time_format${counter}`])) ? ((resultTime(values[`start_time_format${counter}`],'start_hour')) >= (resultTime(values[`end_time_format${counter}`],'end_hour'))) &&  (addzero(values[`start_min${counter}`]) >= addzero(values[`end_min${counter}`])) : (values[`start_time_format${counter}`] === "AM" && values[`end_time_format${counter}`]) ==="PM" &&  resultTime(values[`end_time_format${counter}`],'end_hour') >= 12 ? true: false
    }

    const checkTimeConflict = (resultStart,resultEnd) =>{
        return (((StartTime?.some((item)=>new Date(item).getTime() <= new Date(resultStart).getTime()) && EndTime?.some((item)=>new Date(item).getTime() >=  new Date(resultStart).getTime())) || (EndTime?.some((item)=>new Date(item).getTime() >=  new Date(resultEnd).getTime())))) 
    }



    return {
        addzero,
        resultTime,
        checkTimeRange,
        checkTimeConflict,
        TimeWithMinuteAndDate
    }
}
