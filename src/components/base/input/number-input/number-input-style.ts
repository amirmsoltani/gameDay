import styled from '@emotion/styled';

export const InputWrapper = styled.div`
    height: 55px;
    width: 350px;
    padding-left: 32px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .number-input__input {
        background-color: transparent;
        border: none;
        outline: none;
        height: 100%;
        display: flex;
        flex: 1;
    }

    .number-input__button-wrapper {
        height: 100%;
        flex-direction: column;
        display: flex;
    }
    ${({ theme: { palette } }) => `
        background-color:${palette.grey.lighter};
        box-shadow: 0px 2px 4px ${palette.secondary.main}2E;

        .number-input__button{
            background-color: ${palette.grey.main};
            height:50%;
            border:none;
            width:17px;
            cursor: pointer;
            display:flex;
            justify-content:center;
            align-items:center;
            padding:0;

            :active{
                background-color:${palette.grey.light};
            }

            svg{
                width:12px;
            }

            :first-of-type{
                border-bottom:1px solid ${palette.grey.dark};
                border-top-right-radius: 5px;
                svg{
                        transform: rotate(180deg);
                }
            }

            :last-child{
                border-bottom-right-radius: 5px;
            }
        }
    `}
`;
