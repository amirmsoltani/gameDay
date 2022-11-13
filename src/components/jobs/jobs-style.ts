import styled from '@emotion/styled';
import { Button, Grid, Typography } from '@mui/material';

export const Content = styled(Grid)`
    height: 100%;
    width: 100%;
`;

export const Header = styled(Grid)`
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 46px;

    .header__info-box {
        font-size: 16px;
        font-weight: 600;
        padding-right: 15px;
        height: 60px;
        display: flex;
        align-items: center;
        margin-right: 31px;
    }
    .header__link-button {
        margin-left: 15px;
        height: 45px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        text-decoration: none;
        font-size: 14px;
    }

    ${({ theme: { palette } }) => `
      .header__link-button{
        background-color:${palette.primary.main};
        padding: 0 25px;
        color:${palette.common.white};

        .link-button__plus{
            fill:${palette.common.white};
            margin-right:10px;
        }
    }
    .header__info-box{
        border-right: 2px solid ${palette.primary.light}80;
        .header__back-btn{
            background-color:${palette.primary.main};

            svg{
                fill: ${palette.common.white};
            }
        }
    }
    `}
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
        padding: 20px 14px;
    }
    ${({ theme: { palette } }) => `
        .left-side__cards{
            background-color:${palette.primary.light}40;
        }
    `}
`;

export const RightSide = styled(Grid)`
    padding-left:30px;
    height: 100%;
    max-height: 100%;
`;
