import { formatJustTime } from '@/utils/dateTime/format';
import styled from '@emotion/styled';
import { Box, Card, Grid, Typography } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';

export const CardJobs = styled(Card)<{ boxActive: boolean }>(({ theme, boxActive }) => {
    console.log(boxActive, 'boxActivelog');
    return {
        width: '100%',
        height: '170px',
        boxShadow: ' 1px 1px 10px #0000000d',
        borderRadius: '20px',
        color: '#000',
        padding: '10px',
        transition: 'transform 750ms',
        willChange: 'transform',
        zIndex: 10,
        backgroundColor: boxActive ? '#7251b2 ' : '#fff 0% 0% no-repeat padding-box',
        transform: boxActive ? 'translateX(20px)' : 'translateX(0px)',
        color: boxActive ? '#fff' : '#000',
        '&:hover': {
            backgroundColor: '#7251b2',
            transform: 'translateX(20px)',
            color: '#fff'
        }
    };
});
export const ScrollBarJobs = styled(Box)({
    height: '100vh',
    overflowY: 'scroll',
    overflowX: 'visible',
    backgroundColor: ' #dcd0f3 0% 0% no-repeat padding-box',
    '&::-webkit-scrollbar': { display: 'none' }
    // -ms-overflow-style: none;  /* Internet Explorer 10+ */
    // scrollbar-width: none;  /* Firefox */
});

export const BoxJobText = styled(Typography)({
    fontSize: '14px',
    color: '#000',
    '&:hover': {
        color: '#fff'
    }
});
export const BoxJobDay = styled(Typography)({
    fontSize: '14px',
    color: '#B9BFCA',
    marginTop: '10px'
});
