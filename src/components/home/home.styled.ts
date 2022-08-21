import { Box, Grid, styled } from "@mui/material";
import { ButtonElement } from "./on_boarding/on_boardin.styled";

export const WrapperContainer = styled(Grid)({
    maxWidth: '1300px',
    padding: "32px 0",
    margin: 'auto',
    width: '100%'
})

export const ButtonAccept = styled(ButtonElement)({
    display: 'block',
    width: '100%'
});

export const DescriptionText = styled('p')({
    fontSize: '16px',
    margin: 0,
    paddingTop: '10px',
    marginBottom: '10px'
});