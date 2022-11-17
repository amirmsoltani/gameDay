import styled from '@emotion/styled';
import { Grid } from '@mui/material';
import { Box } from '@mui/material';

export const ForgetPasswordBox = styled(Box)`
    position: relative;
    width: 100%;
`;

export const ForgetPasswordIcon = styled(Box)`
    position: absolute;
    right: 10px;
    top: 10px;
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

    .header__publish-button {
        margin-left: 15px;
        height: 45px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        text-decoration: none;
        font-size: 14px;
        position: relative;
        width: 125px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        cursor: pointer;
        svg {
            height: 25px;
        }
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
    .header__publish-button{
        background-color:${palette.primary.main};
        padding: 0 35px;
        color:${palette.common.white};
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
    padding: 18px 15px 0 15px;
    height: 100%;

    .admin__access {
        display: flex;
        flex-direction: column;
        box-shadow: 0px 2px 4px #1717172e;
        padding: 30px;
        margin-top: 10px;
    }

    ${({ theme: { palette } }) => `

    .access__input{
     .MuiFormControlLabel-label {
        margin-left:20px;
        display:flex;
        justify-content:center;
        fill:${palette.primary.main};
         color:${palette.primary.main};
         svg{
            margin-right:30px;
         }
       }
    }
    
    `}
`;
