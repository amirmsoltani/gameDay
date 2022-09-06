import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Content = styled(Grid)`
    height: 100%;

    svg {
        position: static;
        transform: translate(0, 0);
    }
`;

export const LeftSide = styled(Grid)`
    overflow: hidden scroll;
    height: 100%;
    ::-webkit-scrollbar {
        display: none;
    }

    .left-side__cards {
        display: flex;
        flex-direction: column;
        padding: 30px 14px;
    }

    ${({ theme: { palette } }) => `
        .left-side__cards{
            background-color:${palette.primary.light}40;
        }
    `}
`;

export const RightSide = styled(Grid)``;
