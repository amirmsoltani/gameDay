import styled from "@emotion/styled";


export const QuestionWrapper = styled.div`
    ${({ theme: { palette } }) => `
    display:flex;
    flex-direction:column;
    margin-bottom:20px;

    .question__header{

        display:flex;
        justify-content:space-between;
        align-items:center;
        background-color:${palette.primary.main};
        border-radius:17px;
        height:65px;
        margin-bottom:30px;
        padding:7.5px;

        .header__counter{
            background-color:${palette.primary.light};
            width:50px;
            height:50px;
            border-radius:50%;
            display:flex;
            justify-content:center;
            align-items:center;
            font-weight:bold;
            font-size:20px;
            color:${palette.text.main};
        }

        .header-right-side{
            display:flex;
        }

        .header__btn{
            position: relative;
            display:flex;
            align-items:center;
            justify-content:center;
            background-color:${palette.primary.light};
            border:none;
            margin: 0 7.5px;
            height:40px;
            width:40px;
            border-radius:6px;
            color:${palette.text[700]};
            cursor: pointer;

            :disabled{
                background-color:${palette.grey.dark};
                fill:${palette.common.white};
                color:${palette.common.white};
            }

            &.save{
                width:175px;
            }
            
            svg{
                height:20px;
            }

        }

    }

    .question__label{
        margin:15px 0;
    }

    .question__select{
        width:350px;
        background-color:transparent;
        box-shadow:0px 2px 4px #1717172E;
        color:${palette.grey.dark};
        font-size:13px;

        &.error{
            outline: 2px red solid;
        }

        fieldset{
            border:none !important;
        }
    }
    
    .question__text{
        border-radius:5px;
        box-shadow:0px 2px 4px #1717172E;
        min-height:75px;
        display:flex;
        align-items:center;
        padding: 0 30px;
        color:${palette.grey.dark};
        font-size:13px;

        &.error{
            outline: 2px red solid;
        }

        .question__input{
            border:none;
            display:flex;
            align-items:center;
            width:100%;
            background-color:transparent;
            display:inline-block;
            vertical-align:middle;
            color:${palette.grey.dark};

            :focus{
                outline: none;
           }
        }
    }

    .question__form{
        display:flex;
        flex-direction:column;
    }
`}
`;

