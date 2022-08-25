import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import { MButton } from '@/components/base/MButton';


export const LeftSide = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.primary.dark};
  background-image: url("/images/auth/login.png");
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
  feDropShadow: above-level
`;

export const ForgetButton = styled(Typography)`
  width: fit-content;
  margin: 0;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.primary.main};
  cursor: pointer;
`;

export const SubmitButton = styled(MButton)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  border-radius: 5px;
  width: 100%;
  height: 55px;
`;
