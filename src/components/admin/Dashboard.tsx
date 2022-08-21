import React from 'react';
import { styled, Box } from '@mui/material';
import ChartBar from 'src/components/shared/share/chart-bar';
import ChartLineDate from '@/components/shared/share/chart-line-date';
import ChartLineHealer from '@/components/shared/share/chart-line-healer';
import Statistics from '@/components/shared/share/Statistics';


export const CardContainerGrid = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 24,
    marginTop: '50px',
    ['@media (max-width:1400px)']: {
        gridTemplateColumns: '1fr 1fr'
    },
    ['@media (max-width:1000px)']: {
        gridTemplateColumns: '1fr'
    },
    ['@media (max-width:900px)']: {
        gridTemplateColumns: '1fr 1fr'
    },
    ['@media (max-width:600px)']: {
        gridTemplateColumns: '1fr'
    }
}));

const CustomDiv = styled('div')({
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '5px 15px',
})

const CustomDivStatic = styled('div')({
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '2px 25px',
})

const Dashboard = () => {
    return (
        <CardContainerGrid>
            <CustomDiv><ChartBar /></CustomDiv>
            <CustomDiv><ChartLineDate /></CustomDiv>
            <CustomDiv><ChartLineHealer /></CustomDiv>
            <CustomDivStatic><Statistics /></CustomDivStatic>
        </CardContainerGrid>
    )
}







export default Dashboard