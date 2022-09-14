import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { MButton } from '@/components/base/MButton';
import { style } from '@mui/system';

export const LeftSide = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${({ theme }) => theme.palette.primary.dark};
    background-image: url('/images/auth/login.png');
    background-position: center;
    min-height: 100vh;
`;

export const RightSide = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
`;

export const FormCard = styled(Box)`
    max-width: 380px;
    width: 380px;
    fedropshadow: above-level;
    .link-color {
        text-decoration: none;
    }
`;

export const ForgetButton = styled(Typography)`
    width: fit-content;
    margin: 0;
    font-size: 14px;
    color: ${({ theme }) => theme.palette.primary.main};
    cursor: pointer;

    .link-color {
        color: ${({ theme }) => theme.palette.primary.main};
    }
`;

export const SubmitButton = styled(MButton)`
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.common.white};
    border-radius: 5px;
    width: 100%;
    height: 55px;
`;

export const ForgetTitle = styled(Typography)`
    font-size: 22px;
`;

export const ForgetText = styled(Typography)`
    font-size: 15px;
    margin: 10px 0px;
    color: ${({ theme }) => theme.palette.grey.dark};
`;

export const ForgetPasswordBox = styled(Box)`
    position: relative;
    width: 100%;
`;

export const ForgetPasswordIcon = styled(Box)`
    position: absolute;
    right: 10px;
    top: 10px;
`;
