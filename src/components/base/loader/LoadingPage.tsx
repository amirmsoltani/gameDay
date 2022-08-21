import styled from '@emotion/styled';
import { PrimarySpinner } from './spinner';
import { Box, CircularProgress, Typography } from '@mui/material';

const Container = styled.div(({ theme }) => ({
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

export const AppLoadingPage = () => {
    return (
        <Container>
            <PrimarySpinner />
        </Container>
    );
};
export const AppOverlayLoadingPage = () => {
    return (
        <Container>
            <PrimarySpinner />
        </Container>
    );
};

export const FullScreenLoading = () => (
    <Box
        sx={(theme) => ({
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            display: 'flex',
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgb(0,0,0,.6)',
            backdropFilter: 'blur(5px)',
            [theme.breakpoints.down('md')]: {
                flexDirection: 'column'
            }
        })}>
        <CircularProgress
            size="large"
            sx={(theme) => ({
                color: 'white',
                width: '4rem',
                [theme.breakpoints.down('md')]: {
                    marginBottom: 4
                }
            })}
        />
        <Typography
            style={{ color: 'white', marginLeft: 15, fontFamily: 'Yeseva One' }}
            variant="h5">
            This might take a while, Thank you for your patience!
        </Typography>
    </Box>
);
