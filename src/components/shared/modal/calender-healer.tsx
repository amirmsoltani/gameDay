import { Box, Typography, styled } from '@mui/material'
import React, { useState, useEffect } from 'react';
import { useUser_GetAllHealersQuery, useUser_GetAllWorkingHoursQuery } from 'src/graphql/generated';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { CircularProgress } from '@mui/material';
import { capitalizeFirstString } from '@/utils/helper/capitalize';
import duration from 'dayjs/plugin/duration';

const daysWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const CustomDiv = styled('div')({
    backgroundColor: '#CDE5FC',
    margin: '10px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px 10px',
    borderRadius: '25px',
    cursor: 'pointer'
})

const CustomItem = styled('div')({
    margin: '9px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // flexFlow:'row no-wrap'
})

const CustomTypo = styled(Typography)<{ deactive?: string }>(({ deactive }) => ({
    padding: '5px 10px',
    borderRadius: '25px',
    border: deactive === "true" ? '1px solid #3E205A' : '1px solid #ccc',
    marginRight: '10px',
    backgroundColor: deactive === "true" ? "#E0D0EF" : '#E7F1FC',
    minWidth: '200px',
    maxWidth: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#213950',
    cursor: 'pointer'
}))

const CustomHoliday = styled('div')({
    padding: '5px 10px',
    borderRadius: '25px',
    border: '1px solid #3E205A',
    marginRight: '10px',
    backgroundColor: "#E0D0EF",
    minWidth: '200px',
    maxWidth: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#3E205A',
    cursor: 'pointer',
    marginBottom: '10px',
    marginTop: '20px'
})




const CalenderHealer = () => {
    dayjs.extend(duration)
    const router = useRouter();
    const { query } = router;
    const { data, isLoading } = useUser_GetAllHealersQuery({ take: 50, skip: 0, where: { healer: { id: { eq: Number(query?.id) } } } });
    const holidaysDays = data?.user_getAllHealers?.result?.items?.map((item) => item?.healer?.holidays);
    const { data: dataWorkings, isLoading: loadingWorking } = useUser_GetAllWorkingHoursQuery({ healerId: Number(query?.id) });
    const dayswork = dataWorkings?.user_getAllWorkingHours?.result?.items


    const dates = {
        Sunday: [],
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: [],
    }

    function convertTime(time) {
        return `${dayjs.duration(time).format('HH:mm')} ${dayjs.duration(time).hours() >= 12 ? 'P.M' : 'A.M'}`
    }

    dayswork?.forEach?.((item) => {
        dates[capitalizeFirstString(item.dayOfWeek)].push(`${convertTime(item?.startTime)} - ${convertTime(item?.endTime)}`)
    });


    const [holidays, setHolidays] = useState([]);
    useEffect(() => {
        if (!isLoading) setHolidays(holidaysDays?.flat().map((item) => dayjs(item?.date).format("dddd DD MMM")))

        return () => {
            dates.length = 0;
        }
    }, [isLoading])


    return (
        <Box display="flex" flexDirection="column">
            <Box>
                <Typography sx={{ color: '#213950', fontSize: '25px', marginBottom: '20px', fontWeight: 'bold' }}>Healer Calender</Typography>
                <Box display="flex">
                    <Box display="flex" flexDirection="column">
                        {daysWeek?.map((item, index) => {
                            return (
                                <CustomDiv key={index}>
                                    <Typography sx={{ color: '#213950', fontWeight: 'bold' }}>{item}</Typography>
                                </CustomDiv>
                            )
                        })}
                    </Box>
                    <Box display="flex" flexDirection="column" ml={1}>
                        {
                            loadingWorking ? <CircularProgress /> :
                            daysWeek?.map((day, index) => {
                                return (
                                    dates[day]?.length > 0 ?

                                        dates[day]?.map((item, index) => {
                                            return (
                                                <CustomItem key={index}>
                                                    <CustomTypo>{item}</CustomTypo>
                                                </CustomItem>
                                            )

                                        })
                                        :
                                        <CustomItem ><CustomTypo deactive="true">Off</CustomTypo></CustomItem>

                                )
                            })
                        }
                    </Box>
                </Box>
            </Box>
            <Box sx={{ minHeight: '200px', marginTop: '20px' }}>
                <Typography sx={{ color: '#213950', fontSize: '25px', fontWeight: 'bold' }}>Healer Holidays</Typography>
                {
                    isLoading ? <CircularProgress /> :
                        <Box display="flex" sx={{ flexFlow: 'row wrap' }}>
                            {holidays?.map((item, index) => {
                                return (
                                    <CustomHoliday key={index}>{item}</CustomHoliday>
                                )
                            })}
                        </Box>
                }

            </Box>
        </Box>
    )
}

export default CalenderHealer