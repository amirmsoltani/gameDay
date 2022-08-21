import { MuiButton } from "@/components/base/Button";
import { Box, Grid, styled } from "@mui/material";

export const SubmitButton = styled(MuiButton)(({ theme }) => ({
    background: theme.palette.secondary.main,
    color: 'white',
    fontWeight: 'bold',
    width: 300,
    ':hover': {
        background: theme.palette.secondary.main
    }
}));


export const BoxWrapperForm = styled(Grid)(({ theme }) => ({
    margin: 'auto',
    textAlign: 'center',
    width: '100%',
    maxWidth: 850,
    marginTop: '1rem',
    [theme.breakpoints.up('sm')]: {
        marginTop: '3rem'
    }
}));

export const UploadBox = styled(Box)(({ theme }) => ({
    width: 140,
    height: 140,
    margin: 'auto',
    position: 'relative',
    cursor: 'pointer'
}));

export const ProfilePhoto = styled('img')({
    width: 140,
    height: 140,
    objectFit: 'cover',
    borderRadius: '50%'
});

export const ButtonAddImage = styled('button')(({ theme }) => ({
    width: 35,
    height: 35,
    borderRadius: '50%',
    backgroundColor: '#D9D9D9',
    border: `solid 1px ${theme.palette.common.black}`,
    position: 'absolute',
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    ':after': {
        content: '""',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '20px',
        height: '1px',
        backgroundColor: theme.palette.common.black
    },
    ':before': {
        content: '""',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        height: '20px',
        width: '1px',
        backgroundColor: theme.palette.common.black
    }
}));

export const SubmitFormButton = styled(SubmitButton)({
    borderRadius: 18,
    margin: '5rem auto'
});
