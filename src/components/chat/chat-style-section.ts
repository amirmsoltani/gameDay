import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Content = styled(Grid)`
    height: 100%;
    width: 100%;
`;

export const ChatWrapper = styled.div`
    display: flex;
    height: calc(100% - 100px);
    max-height: calc(100% - 100px);
    overflow: hidden scroll;
    scrollbar-width: none;
    ::-webkit-scrollbar {
        display: none;
    }
    .chat-avatar {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin-right: 10px;
    }
    .chat-info {
        padding-right: 30px;
        width: 100%;
        .info__user {
            display: flex;
            flex-direction: column;
            font-size: 20px;

            .user__name {
                font-weight: bold;
            }

            .user__email {
                font-size: 16px;
            }
            .user__update {
                font-size: 14px;
                font-weight: bold;
                margin: 30px 0;
            }
        }

        .info__title {
            font-size: 24px;
            font-weight: bold;
        }

        .info__attachment {
            color: #1fb5eb;
            stroke: #1fb5eb;
            display: flex;
            justify-items: center;

            svg {
                height: 22px;
                margin-right: 10px;
            }
        }
    }
    .info__message-box {
        margin-top: 5vh;
        display: flex;
        flex-direction: column;
    }

    ${({ theme: { palette } }) => `
            .info__video{
                max-width:417px;
                font-size:16px;
                background-color:${palette.common.white};
                box-shadow:0px 0px 32px #1227781F;
                margin: 15px 0;
                height:114px;
                border-radius:20px;
                display:flex;
                align-items:center;
                fill:${palette.primary.main}B0;
                text-decoration: none;
                color:${palette.common.black};
                padding-right:15px;

                &.file{
                    background-color:${palette.primary.light};
                }

                svg{
                    margin: 0 20px;
                }
                .info__icon{
                    background-color:${palette.common.white};
                    width:60px;
                    height:60px;
                    border-radius:20px;
                    box-shadow:0px 0px 32px #1227781F;
                    margin: 0 10px;
                }
            }
            .message-box__message {
                display:flex;
                align-items:center;
                margin: 15px 0;
                background-color:${palette.common.white};
                box-shadow:0px 0px 32px #1227781F;
                padding:30px;
                width:fit-content;
                border-radius:20px;
                white-space: pre-line;
        
                &.another{
                    background-color:${palette.primary.light}a0;
                    align-self: flex-end;
                    margin-right:25px;
                    svg{
                        width:20px !important;
                        margin-left:15px;
                    }
                }
            }
            .user__email{
                color:${palette.grey.dark}90;
            }
            .info__text{
                font-size: 16x;
                max-width:70%;
                text-align:justify;
                color:${palette.grey.dark};
                margin-bottom:30px;
            }
        `}
`;

export const InputWrapper = styled.div`
    width: 100%;
    height: 100px;
`;

export const ChatInput = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 58px;
    max-height: 90px;
    padding: 5px 15px;
    .chat-input__input {
        border: none;
        background-color: transparent;
        width: 100%;
        :focus {
            outline: none;
        }
        border-radius: 0;
        padding: 0;
        height: 100%;
        max-height: 90px;
        overflow-y: scroll;
    }
    .chat-input__send-button {
        cursor: pointer;

        :active {
            opacity: 0.5;
        }
    }

    ${({ theme: { palette } }) => `
            border-radius:20px;
            border: 1px solid ${palette.grey.dark}90;

            .chat-input__input::placeholder{
                color:${palette.grey.dark};
            }
        `}
`;
