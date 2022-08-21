import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { CustomFlex, CustomParagraph } from './index';
// import { useUser_GetBarChartHealrClientQuery } from 'src/graphql/generated';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: null,
        title: null
    },
    scales: {
        y: {
            grid: {
                display: false
            },
            ticks: {
                color: '#213950',
                font: {
                    size: '14px',
                    weight: 'bold'
                }
            }
        },
        x: {
            grid: {
                display: false
            },
            ticks: {
                color: '#213950',
                font: {
                    size: '14px'
                }
            }
        }
    }
};

const ChartBar = () => {
    // const { data: dataBar } = useUser_GetBarChartHealrClientQuery({ skip: 0, take: 10 });
    // const items = dataBar?.user_getBarChartHealrClient?.result?.items;
    // const data = {
    //     labels : items?.map((item)=>item?.name),
    //     datasets: [
    //         {
    //             label: '',
    //             data: items?.map((item)=>item?.totalUsers),
    //             backgroundColor: '#724F93',
    //             barThickness: 30,
    //             borderRadius: 0,
    //         },
    //     ],
    // };
    return (
        <>
            <p style={{ color: '#213950', fontSize: '16px' }}>CLIENT</p>
            <CustomFlex>
                {/* <div style={{ width: '100%' }}><Bar options={options} data={data} /></div> */}
                <CustomParagraph>Healer</CustomParagraph>
            </CustomFlex>
        </>
    );
};

export default ChartBar;
