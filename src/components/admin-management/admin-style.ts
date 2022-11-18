import styled from '@emotion/styled';
import { Divider, Grid } from '@mui/material';

export const Content = styled(Grid)`
    height: 100%;
    width: 100%;
    svg {
        position: static;
        transform: translate(0, 0);
    }
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

export const ListWrapper = styled(Grid)`
    padding: 18px 15px 0 15px;
    height: 100%;
`;

export const ListHeader = styled(Grid)`
    border-radius: 6px;
    height: 45px;
    margin-bottom: 16px;
    align-items: center;

    .list-header__item {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        cursor: pointer;
        &.no-center {
            justify-content: flex-start !important;
        }
    }

    ${({ theme: { palette } }) => `
    background-color:${palette.grey.main};
`}
`;

export const ListBody = styled(Grid)`
    overflow-y: scroll;
    scrollbar-width: none;
    ::-webkit-scrollbar {
        display: none;
    }
`;

export const ListBodyUser = styled(Grid)`
    border-radius: 6px;
    height: 45px;
    margin-bottom: 16px;
    align-items: center;

    .list-header__item {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;

        &.no-center {
            justify-content: flex-start !important;
        }
    }
    .user__avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 15px;
    }

    * {
        display: flex;
        align-items: center;
    }

    ${({ theme: { palette } }) => `
    background-color:${palette.common.white};

    .list-header__item{
        svg{
            margin: 0 5px;
            height:24px;
            fill:${palette.primary.main}
        }
    }
`}
`;

export const BorderUser = styled(Divider)`
    color: #787389;

    ${({ theme: { palette } }) => `
   
`};
`;
