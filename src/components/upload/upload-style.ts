import styled from '@emotion/styled';
import { Form } from 'formik';

export const UploadWrapper = styled.div`
    width: 100%;
    padding: 30px;
    border-radius: 20px;
    height: 183px;

    cursor: pointer;
    .upload__main {
        border: 1px #dae1ed dashed;
        background-color: #fafcfd;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 30px;
        max-width: 440px;
        position: relative;
    }
    .upload__preview {
        height: 100px;
        object-fit: contain;
    }
    .upload__preview-icon {
        position: absolute;
        right: 5px;
        top: 5px;
    }
    .upload__text {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 30px;
        color: #8f9bb3;

        .text__title {
            text-align: center;
            font-size: 15px;
        }

        .text__description {
            font-size: 11px;
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

    &.small {
        padding: 12.5px;
        height: 133px;

        .upload__main{
            padding: 0 10px;
        }
    }

    ${({ theme: { palette } }) => `
        background-color:${palette.common.white};
        box-shadow: 12px 8px 20px #1B3A9229;
        
        .upload__preview-icon{
            fill:${palette.primary.main};
        }
    `}
`;
