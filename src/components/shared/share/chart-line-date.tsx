import React, { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { CustomFlex, CustomParagraph } from './index';
import { FormControl, MenuItem, Select, Typography } from '@mui/material';
// import { useBooking_GetAllBookingsQuery } from 'src/graphql/generated';
import { ArrowDownIcon } from 'src/assets/common/ArrowDownIcon';
import { useRouter } from 'next/router';
import { useGetUser } from 'src/auth/UserProvider';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WINDOW_SIZE = 12;
const today = new Date();
const monthIndex = today.getMonth();
const year = today.getFullYear();
const monthLength = new Date(year, monthIndex + 1, 0).getDate();
const daysInMonth = Array.from(Array(monthLength).keys()).map((index) => index + 1);

function formatDate(d) {
    return d.startOf('month').format('YYYY-MM-DDTHH:mm:ss');
}

const ChartLineDate = ({ title = 'Apointment', titleActivity = 'false', isSmall = 'false' }) => {
    const router = useRouter();
    const user = useGetUser();
    const routerHealer = router.pathname.includes('/healer');
    const whereHealer = routerHealer
        ? { where: { session: { host: { userId: { eq: user?.id } } } } }
        : null;
    const [date, setDate] = useState<string>(formatDate(dayjs()));
    const [firstDay, setFirstDay] = useState(dayjs(date));
    // const { data: dataVisitor } = useBooking_GetAllBookingsQuery(whereHealer);
    // const items = dataVisitor?.booking_getAllBookings?.result?.items;
    const [duration, setDuration] = useState('ONE_MONTH');
    const labels = duration === 'ONE_WEEK' ? [1, 2, 3, 4, 5, 6, 7] : daysInMonth;

    // const allvisitor = useMemo(() => {
    //     return items?.reduce((acc, cur) => {
    //         if (isNaN(new Date(cur.createdDate).getTime())) {
    //             return acc;
    //         }
    //         const key = cur.createdDate.split('T')[0];

    //         return {
    //             ...acc,
    //             [key]: acc[key] ? acc[key] + (cur.visitorId && 1) : (cur.visitorId && 1)
    //         };
    //     }, {});
    // }, [date,dataVisitor]);

    function monthsvisit() {
        const labels = Array.from(Array(monthLength).keys()).map((index) => index + 1);
        const visitorEachDay = [];
        labels.forEach((day, index) => {
            // const currentDate = firstDay.add(index, 'day').format('YYYY-MM-DD');
            // if (allvisitor && currentDate in allvisitor) {
            //     visitorEachDay.push(allvisitor[currentDate]);
            // } else {
            //     visitorEachDay.push(0);
            // }
            return [0, 0];
        });
        return visitorEachDay;
    }

    const data = {
        labels,
        datasets: [
            {
                label: '',
                data: monthsvisit().map((item) => item),
                borderColor: '#35094F',
                backgroundColor: '#fff',
                pointStyle: 'circle',
                pointRadius: 4,
                pointBorderColor: 'red'
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: null,
            title: null
        },
        scales: {
            y: {
                ticks: {
                    color: '#000000',
                    font: {
                        size: '14px'
                    },
                    beginAtZero: true,
                    callback: function (value) {
                        if (value % 1 === 0) {
                            return value;
                        }
                    }
                }
            },
            x: {
                ticks: {
                    color: '#000000',
                    font: {
                        size: '14px'
                    }
                }
            }
        },
        aspectRatio: titleActivity === 'true' ? 4 : null
    };

    function handleChange(event) {
        setDuration(event.target.value);
    }

    return (
        <div>
            {titleActivity === 'true' && (
                <h2
                    style={{
                        fontSize: '24px',
                        marginTop: 0,
                        color: '#213950',
                        fontWeight: 'normal'
                    }}>
                    Your activity
                </h2>
            )}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p style={{ color: '#213950', fontSize: '16px' }}>{title}</p>
                <FormControl
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            paddingRight: '10px',
                            marginTop: '8px'
                        }
                    }}>
                    <Select
                        sx={{ '& .MuiOutlinedInput-input': { padding: '1px 10px' } }}
                        value={duration}
                        onChange={handleChange}
                        IconComponent={() => <ArrowDownIcon />}>
                        <MenuItem value="ONE_MONTH">1M</MenuItem>
                        <MenuItem value="ONE_WEEK">1W</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <CustomFlex>
                {/* <div style={{ width: '100%' }}><Line options={options} data={data} /></div> */}
                <CustomParagraph>DATE</CustomParagraph>
            </CustomFlex>
        </div>
    );
};

export default ChartLineDate;
