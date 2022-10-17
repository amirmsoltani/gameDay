import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';

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
        font-weight: 600;
        display: flex;
        align-items: center;
        margin-right: 31px;

        .header__back-btn {
            margin-left: 15px;
            padding: 10px 10px;
            height: 45px;
            border-radius: 50px;
            display: flex;
            align-items: center;
            text-decoration: none;
            font-size: 14px;
        }
        .title-back {
            padding-left: 10px;
        }
    }

    .input-box {
        display: flex;
        align-items: center;
        height: 45px;
        margin-left: 33px;
        padding: 0 24px;
        border-radius: 6px;
        width: 35vw;

        .input-box__input {
            background-color: transparent;
            border: none;
            width: 50px;
            outline: none;
            width: calc(100% - 130px);
        }

        .input-box__search-text {
            margin: 0 20px;
        }
    }

    .header__remove-button,
    .header__publish-button {
        margin-left: 15px;
        height: 45px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        text-decoration: none;
        font-size: 14px;
    }

    ${({ theme: { palette } }) => `
    .header__info-box{
        border-right: 2px solid ${palette.primary.light}80;
        .header__back-btn{
            background-color:${palette.primary.main};

            svg{
                fill: ${palette.common.white};
            }
        }
    }

    .input-box{
        background-color:${palette.grey.light};
    }
    .header__remove-button{
        background-color:${palette.primary.light};
        color:${palette.primary.main};

    }
    .header__publish-button{
        background-color:${palette.primary.main};
        padding: 0 35px;
        color:${palette.common.white};
    }
    `}
`;

export const ListHeader = styled(Grid)`
    border-radius: 6px;
    height: 45px;
    margin-bottom: 16px;
    align-items: center;

    .list-header__item {
        display: flex;

        justify-content: center;
        font-size: 15px;
        &.no-center {
            justify-content: flex-start !important;
        }
    }

    ${({ theme: { palette } }) => `
   
`}
`;

export const ListBody = styled(Grid)`
    overflow-y: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
`;

export const ListItem = styled(Grid)`
    border-radius: 20px;
    min-height: 105px;
    box-shadow: '1px 1px 10px #0000000D';
    margin-bottom: 10px;
    padding: 10px 10px;

    .list-item__item {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        &.no-border {
            border: none !important;
        }
        &.no-center {
            justify-content: flex-start;
            padding-left: 20px;
        }
        .list-item__of-day {
            padding: 0;
            border-radius: 6px;
            min-width: 200px;
            width: 13.5vw;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;

            svg {
                margin-right: 10px;
            }
        }
    }
    .list-item__title {
        justify-content: flex-start !important;

        .list-item__image {
            width: 100px;
            margin-right: 20px;
        }
        .list-item__text-box {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            height: 100%;
            font-size: 15px;
        }
    }

    ${({ theme: { palette, breakpoints } }) => `
        background-color:${palette.common.white};
        .list-item__item {
            border-right: 2.5px solid ${palette.primary.light}80;       
            .list-item__of-day{
                background-color: ${palette.primary.main};
                color: ${palette.common.white};

                svg{
                    width: 25px;
                    fill:${palette.common.white};
                }
            }
        }

        .list-item__last-border {
            border-radius: 20px;
            background-color: ${palette.primary.main};
        }

        &.primary{
            background-color:${palette.primary.main};
            .list-item__item {
                color:${palette.common.white};  
                .list-item__of-day{
                    background-color: ${palette.primary.light};
                    color:${palette.primary.main};
                    svg{
                        width: 10px;
                        fill:${palette.primary.main};
                    }
                }     
            }
            .list-item__last-border {
                background-color: ${palette.common.white};
            }
            .list-item__title .list-item__text-box *{
                color:${palette.common.white};
            }
        }

        ${breakpoints.down('lg')}{
            .list-item__item {
                display: flex;
                align-items: center;
                justify-content: flex-start !important;
                font-size: 15px;
            }
        }
    `}
`;

export const Content = styled(Grid)`
    height: 100%;
    width: 100%;
    svg {
        position: static;
        transform: translate(0, 0);
    }
`;

export const ListWrapper = styled(Grid)`
    /* display: flex; */
    /* flex-direction: row; */

    padding: 18px 15px 0 15px;
    height: 100%;
`;

export const FormCard = styled(Box)`
    display: flex;
    flex-direction: row;

    fedropshadow: above-level;
    .link-color {
        text-decoration: none;
    }
`;
