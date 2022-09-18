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
        font-size: 15px;
        padding-right: 15px;
        height: 60px;
        display: flex;
        align-items: center;
        margin-right: 31px;
    }

    ${({ theme: { palette } }) => `
    
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

    ${({ theme: { palette } }) => `
    background-color:${palette.common.white};
`}
`;

export const BorderUser = styled(Divider)`
    color: #787389;

    ${({ theme: { palette } }) => `
   
`};
`;
