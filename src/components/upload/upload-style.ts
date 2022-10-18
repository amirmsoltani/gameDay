import styled from '@emotion/styled';
import { Form } from 'formik';

export const UploadWrapper = styled.div`
    width: 100%;
    padding: 30px;
    cursor: pointer;
    .upload__main {
        border: 1px #dae1ed dashed;
        background-color: #fafcfd;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        padding: 0 30px;
        max-width: 440px;
    }
    .upload__text {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 30px;
        color: #8f9bb3;

        .text__title {
            text-align: center;
            font-size: 16px;
        }

        .text__description {
            font-size: 12px;
            text-align: center;
            margin-top: 7px;
            .description__browse {
                color: blue;
            }
        }
    }

    .upload__drop {
        font-size: 40px;
        fill: blue;
        color: blue;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;

        svg {
            height: 50px;
            width: 50px;
            margin-right: 50px;
        }
    }

    ${({ theme: { palette } }) => `
        background-color:${palette.common.white};
        border-radius:20px;
        height:183px;
        box-shadow: 12px 8px 20px #1B3A9229;
    `}
`;
