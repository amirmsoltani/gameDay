import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const NewCourseWrapper = styled.div`
    padding: 41px 56px;

    .video__player {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        /* transform: translate(-50%, -50%); */
        background-color: #00000044;
        z-index: 9999;
        display: grid;
        place-content: center;
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
