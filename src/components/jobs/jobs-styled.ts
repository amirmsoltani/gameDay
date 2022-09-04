import styled from '@emotion/styled';
import { Box, Grid, Typography } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';

// export const Content = styled(Box)`
//     padding: 34px 80px 44px 43px;
//     height: 100%;
// `;

export const CardJobs = styled(Box)({
    width: '100%',
    height: '170px',
    background: '#fff 0% 0% no-repeat padding-box',
    boxShadow: '1px 1px 10px #0000000D',
    opacity: '1',
    borderRadius: '20px',
    color: '#000',
    padding: '10px',
    fontSize: '20px',
    fontWeight: '600',
    transition: ' transform 550ms',
    '&:hover': {
        backgroundColor: '#7251b2 ',
        transform: 'translateX(20px)',
        color: '#fff'
    }
});

export const ScrollBarJobs = styled(Box)({
    height: '100vh',
    overflowY: 'scroll',
    backgroundColor: ' #dcd0f3 0% 0% no-repeat padding-box'
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
