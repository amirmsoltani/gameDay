import { Box, Button, styled } from "@mui/material";

export const Title = styled('h2')({
    fontSize: '50px',
    margin: 0
});

export const ButtonSkip = styled('p')({
    fontSize: '28px',
    cursor: 'pointer',
    margin: 0
});

export const DescriptionText = styled('p')(({ theme }) => ({
    fontSize: '24px',
    margin: '15px auto',
    maxWidth: '1200px',
    [theme.breakpoints.down('sm')]: {
        fontSize: '18px',
        width: '100%'
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '24px',
        width: '80%'
    }
}));


export const ButtonElement = styled(Button)(({ theme }) => ({
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.main,
    borderRadius: '16px',

    ':hover': {
        backgroundColor: theme.palette.secondary.main
    },
    [theme.breakpoints.down('md')]: {
        fontSize: '16px',
        padding: '10px 40px'
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '18px',
        padding: '10px 80px'
    }
}));

export const WrapperOnBoarding = styled(Box)({
    position: "fixed",
    minHeight: "100vh",
    width: "100%",
    backgroundColor: "#fff",
    zIndex:10
})