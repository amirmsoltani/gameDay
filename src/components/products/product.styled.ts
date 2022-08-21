import { Box, Button, styled, TextField } from '@mui/material';

export const WrapperCounterProduct = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3
});

export const ButtonActionCounter = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    ':hover': {
        backgroundColor: theme.palette.primary.light
    },
    color: theme.palette.common.black,
    height: 20,
    minWidth: 20,
    borderRadius: 4,
    padding: 0
}));

export const InputCounter = styled(TextField)(({ theme }) => ({
    width: 60,
    '& .MuiOutlinedInput-root': {
        backgroundColor: theme.palette.primary.light,
        borderRadius: 9,
        borderColor: '#06677C41',
        color: theme.palette.common.black,
        height: 35,
        '& fieldset': {
            borderColor: '#06677C41 !important'
        },
        '&.Mui-focused fieldset': {
            borderColor: '#06677C41'
        }
    },
    '& .MuiOutlinedInput-input': {
        textAlign: 'center'
    }
}));
