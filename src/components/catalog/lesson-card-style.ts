import styled from '@emotion/styled';
import { Form } from 'formik';

export const LessonWrapper = styled(Form)`
    margin-top: 30px;
    .lesson__header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 7.5px;
        border-radius: 17px;
        height: 65px;
        margin-bottom: 30px;

        .header__index {
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }
    }

    .lesson__btn {
        position: relative;
        width: 34px;
        height: 34px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        border: none;
        padding: 0;
        margin-right: 10px;
        cursor: pointer;

        svg {
            width: 15px;
            height: 15px;
        }
    }

    .lesson__video {
        width: 100%;
        height: 114px;
        border-radius: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 15px 0 32px;
        margin-bottom: 30px;
        position: relative;

        &.disabled {
            pointer-events: none;
        }

        .video__left {
            display: flex;
            align-items: center;
        }
        .video__loading,
        .video__play {
            width: 58.5px;
            margin-right: 17.5px;
            cursor: progress;
        }
        .video__play {
            cursor: pointer;
        }

        .video__right {
            display: flex;

            .video__duration {
                margin-right: 15px;
                display: flex;
                align-items: center;
            }
        }
    }

    .lesson__label__input {
        display: block;
    }

    .lesson__description {
        padding: 0 30px;

        .description__input {
            width: 100%;
            margin-top: 10px;
            height: 148px;
            resize: none;
            border: none;
            border-radius: 5px;
            outline: none;
            padding: 20px;
            font-size: 13px;
        }
    }

    .lesson__title {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title__input {
            width: 100%;
            margin-top: 10px;
            font-size: 13px;
            border: none;
            outline: none;
            height: 55px;
            padding: 0 32px;
        }

        .lesson__add-video {
            max-width: 206px;
            border: none;
            height: 45px;
            border-radius: 6px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 7px;

            cursor: pointer;
            svg {
                margin-right: 15px;
            }
        }
    }

    ${({ theme: { palette } }) => `
        .lesson__header{
            background-color:${palette.primary.main};

            .header__index{
                background-color:${palette.primary.light};
            }

        }

        .lesson__btn{
            background-color:${palette.primary.light};
            fill:${palette.primary.main};

            &.primary{
                background-color:${palette.primary.main};
                fill:${palette.common.white};
            }
        }

        .lesson__video{
            box-shadow: 0px 0px 32px #1227781F;
            fill:${palette.primary.main}99;
        }

        .description__input{
            background-color:${palette.grey.lighter};
            box-shadow: 0px 2px 4px #1717172E;
            color:${palette.grey.dark};
        }

        .title__input{
            background-color:${palette.grey.lighter};
            box-shadow: 0px 2px 4px #1717172E;
            color:${palette.grey.dark};
        }

        .lesson__add-video{
            background-color:${palette.text.main}dd;
            color:${palette.common.white};
            fill:${palette.common.white};
        }
    `}
`;
