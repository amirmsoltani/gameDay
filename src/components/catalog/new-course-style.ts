import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const NewCourseWrapper = styled.div`
    padding: 41px 56px;
    height: 100%;
    max-height: 100%;
    overflow: hidden scroll;

    ::-webkit-scrollbar {
        display: none;
    }

    
    .add__lesson__section {
        display: flex;
        width: 100%;
        justify-content: flex-end;
    }
    .add-lesson__btn {
        width: 206px;
        border: none;
        height: 45px;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 7px;
        font-size: 14px;
        cursor: pointer;
        svg {
            margin-right: 5px;
        }
    }

    .upload__grid {
        padding-right: 40px;
        padding-top: 20px;
    }
    .input__grid {
        padding-right: 40px;
    }

    .new-wrapper__title-input {
        width: 100% !important;
    }

    ${({ theme: { palette } }) => `
   

        .add-lesson__btn{
            background-color:${palette.text.main}dd;
            color:${palette.common.white};
            fill:${palette.common.white};
        }
    `}
`;

export const HeaderWrapper = styled.div`
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 46px;

    .back-btn {
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        width: 43px;
        height: 43px;
        cursor: pointer;
        margin-right: 30px;
    }

    .header__search-input {
        width: 38vw;
        margin-right: 30px;
    }

    .header__info-box {
        font-size: 15px;
        padding-right: 15px;
        height: 60px;
        display: flex;
        align-items: center;
        margin-right: 31px;
        font-weight: bold;
    }

    .header__link-button {
        margin-left: 15px;
        height: 45px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        font-size: 14px;
        width: 275px;
        font-size: 18px;
    }

    ${({ theme: { palette } }) => `

    .back-btn{
    background-color:${palette.primary.main};
    fill:${palette.common.white};
    }
    
    .header__info-box{
        border-right: 2px solid ${palette.primary.light}80;
    }

    .header__link-button{
        background-color:${palette.primary.main};
        padding: 0 25px;
        color:${palette.common.white};

        .link-button__plus{
            fill:${palette.common.white};
            margin-right:10px;
        }
    }

    
    `}
`;
