import { MuiButton } from "@/components/base/Button";
import { styled, Typography } from "@mui/material";

export const ForgetButton = styled(MuiButton)({
    width: 'fit-content',
    ':hover': {
        background: 'transparent'
    }
});

export const EmailAddressRequestText = styled(Typography)({
    fontSize: 14,
    maxWidth: 342,
    textAlign: 'justify'
});

export const SendBtn = styled(MuiButton)(({ theme }) => ({
    background: theme.palette.secondary.main,
    color: 'white',
    ':hover': {
        background: theme.palette.secondary.main
    }
}));

export const CancleBtn = styled(MuiButton)(({ theme }) => ({
    color: theme.palette.common.black,
    border: `1px solid ${theme.palette.common.black}`
}));