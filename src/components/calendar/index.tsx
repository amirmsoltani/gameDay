import { makeStyles } from '@mui/styles';
import { useRouter } from 'next/router';
import { Calendar as MultiCalendar, DateObject } from 'react-multi-date-picker';

const useStyles = makeStyles({
    custom_calendar: modal => ({
        border: 'none !important',
        boxShadow: 'none !important',
        background: 'transparent !important',
        '& .rmdp-week': {
            width: modal ? 340 : 550,
            height: modal ? 55 : 75,
            '@media(max-width: 610px)': {
                width: '87vw',
                height: 65
            }
        },
        "& .rmdp-right":{
            position:'absolute',
            right:'10%'
        },
        "& .rmdp-left":{
            position:'absolute',
            left:'10%',
        },
        "& .rmdp-header":{
            marginBottom:'20px'
        },
        "& .rmdp-header-values span":{
            background: "#91c9ff",
            padding: "9px",
            borderRadius: "25px"
        },
        '& .rmdp-week-day': {
            fontFamily: 'Roboto',
            fontSize: modal ? 18 : 25,
            background: '#5293D3',
            borderRadius: '50%',
            width: modal ? 45 : 60,
            height: modal ? 45 : 60,
            marginRight: modal ? -15 : -25,
            color: 'white',
            '@media(max-width: 610px)': {
                fontSize: 20,
                width: 50,
                height: 50,
                marginRight: -15
            }
        },
        '& .rmdp-today.rmdp-day span.sd': {
            fontFamily: 'Roboto',
            width: modal ? 45 : 55,
            height: modal ? 45 : 55,
            fontSize: modal ? 18 : 25,
            fontWeight: 'bold',
            borderRadius: '50%',
            '@media(max-width: 610px)': {
                fontSize: 16,
                width: 45,
                height: 45
            }
        },
        '& .rmdp-day.rmdp-selected span.sd': {
            fontFamily: 'Roboto',
            border: '2px solid #3E205A',
            backgroundColor:'#CDE5FC',
            color: '#000',
            width: modal ? 45 : 55,
            height: modal ? 45 : 55,
            fontSize: modal ? 18 : 25,
            fontWeight: 'bold',
            borderRadius: '50%',
            '@media(max-width: 610px)': {
                fontSize: 16,
                width: 45,
                height: 45
            }
        },
        '& .rmdp-day span.sd': {
            fontFamily: 'Roboto',
            width: modal ? 45 : 55,
            height: modal ? 45 : 55,
            fontSize: modal ? 18 : 25,
            fontWeight: 'bold',
            borderRadius: '50%',
            background: '#CDE5FC',
            color: '#4374A4',
            '@media(max-width: 610px)': {
                fontSize: 16,
                width: 45,
                height: 45
            }
        }
    })
});

const Calendar = ({modal = false,setValue=null,value=null}) => {
    const classes = useStyles(modal);
 
    const handleChange = (value) =>{
        setValue(value)
    }

    return <MultiCalendar
    value={value}
    onChange={handleChange} 
    hideYear 
    buttons={true} 
    className={classes.custom_calendar}
    props={new DateObject(value).format() === new DateObject(new Date).format()}
     />
};

export default Calendar;
