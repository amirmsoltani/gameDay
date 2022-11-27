import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Content = styled(Grid)`
    height: 100%;
    width: 100%;
    svg {
        position: static;
        transform: translate(0, 0);
    }

    .catalog__add {
        position: absolute;
        z-index: 9999;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        backdrop-filter: blur(5px);
        place-content: center;
    }

    .add__modal {
        height: 682px;
        border-radius: 20px;
        padding: 24px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-bottom: 93px;
    }
    .modal__close-icon {
        align-self: flex-end;
        cursor: pointer;
    }
    .modal__upload-wrapper {
        margin-top: 48px;
        margin-bottom: 60px;
        width: 40%;

        &.error {
            border: 2px solid red;
            border-radius: 17px;
        }
    }
    .title__input {
        width: 70%;
        height: 55px;
        border-radius: 5px;
        margin-top: 10px;
        border: none;
        outline: none;
        text-align: center;
        ::placeholder {
            text-align: center;
        }

        &.error {
            border: 2px solid red;
        }
    }

    ${({ theme: { palette } }) => `
        .add__modal{
            background-color:${palette.common.white};
            box-shadow:12px 8px 20px #1B3A9229;
        }

        .title__input{
            background-color:${palette.grey.lighter};
            box-shadow: 0px 2px 4px #1717172e;
        }

        .add__btn{
            background-color:${palette.primary.main};
            color:${palette.common.white};
            margin-top:100px;
            border-radius:5px;
            height:45px;
            width:275px;
            border:none;
            cursor:pointer;
            position:relative;
            display:flex;
            justify-content:center;
            align-items:center;
            svg{
                width:20px;
                height:30px;
            }
        }
    `}
`;

export const LeftSide = styled(Grid)`
    overflow: hidden scroll;
    height: 100%;
    scrollbar-width: none;
    ::-webkit-scrollbar {
        display: none;
    }

    .left-side__cards {
        display: flex;
        flex-direction: column;
        padding: 30px 14px;
    }

    ${({ theme: { palette } }) => `
        .left-side__cards{
            background-color:${palette.primary.light}40;
        }
    `}
`;

export const RightSide = styled(Grid)`
    padding-left: calc(80px - 3vw);
    padding-right: 60px;
    padding-top: 30px;
    height: 100%;
    max-height: 100%;
    display: flex;
`;

export const CatalogLearn = styled.div`
    padding: 0 30px;
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    overflow: hidden scroll;

    scrollbar-width: none;
    ::-webkit-scrollbar {
        display: none;
    }

    .catalog-learn__box-btn {
        display: flex;
        justify-content: flex-end;

        .box-btn__btn {
            padding: 0;
            margin-left: 10px;
            border-radius: 6px;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 50px;
            cursor: pointer;
        }
    }
    .catalog-learn__description-title {
        font-size: 15px;
    }

    ${({ theme: { palette } }) => `
        .box-btn__btn{
            background-color: ${palette.primary.main};
            fill:${palette.common.white};
            &.delete{
                border:none;
                background-color:${palette.error.main};
            }
            :disabled{
                background-color:${palette.grey.dark};
            }
        }
        .catalog-learn__description-text {
            color: ${palette.grey.dark};
            background-color:${palette.grey.lighter};
            box-shadow: 0px 2px 4px ${palette.secondary.main}2e;
            font-size:13px;
            padding: 24px 32px;
            border-radius: 5px;
        }

        .catalog-learn__card-header{
            display: flex;
            align-items:center;
            justify-content:space-between;
            height: 65px;
            padding:7px;
            border-radius:17px;
            background-color:${palette.primary.main};
            color:${palette.common.white};
            font-weight: bold;
            font-size:16px;
            margin-top:15px;
            margin-bottom:10px;

            .header__item{
                display:flex;
                align-items:center;
            }

            .card-header__index{
                width:50px;
                height:50px;
                display:flex;
                align-items:center;
                justify-content:center;
                margin-right:15px;
                background-color:${palette.primary.light};
                border-radius:50%;
                color:${palette.common.black};
            }
        }

        .catalog-learn__card-lesson{
            border:none;
            height:115px;
            padding:38px;
            background-color:${palette.common.white};
            box-shadow:0px 0px 32px ${palette.secondary.main}1F;
            display:flex;
            justify-content:space-between;
            align-items:center;
            margin-top:15px;
            border-radius:20px;
            fill:${palette.primary.main}99;
            cursor: pointer;
            color:${palette.text.main};
            text-decoration:none;

            .card-lesson__box-left{
                display:flex;
                align-items:center;
                font-size:16px;

                .box-left__file-name{
                    margin-left:20px;
                }
            }
        }
    `}
`;

export const CatalogSkills = styled.div`
    ${({ theme: { palette } }) => `
        width: 100%;
        display:flex;
        flex-direction:column;

        .catalog-skill__header{
            height:105px;
            background-color:${palette.common.white};
            border-radius:20px;
            margin-bottom:20px;
            box-shadow: 1px 1px 10px ${palette.common.black}0D;
            display:flex;
            justify-content:space-between;
            align-items:center;
            font-size:15px;
            padding: 0 30px;
        }


        .catalog-skill__list-header{
            background-color:${palette.grey.main};
            height:45px;
            display:flex;
            align-items:center;
            border-radius:6px;
            font-size:15px;

            .list-header__center{
                display:flex;
                justify-content:center;
            }

            *{
                cursor:pointer;
            }
        }

        .catalog-skill__list-body{
            height:100%;
            overflow: hidden scroll;
            scrollbar-width: none;
            ::-webkit-scrollbar {
                display: none;
            }
        }

        .catalog-skill__card-body{
            margin-top:10px;
            height:105px;
            background-color:${palette.common.white};
            border-radius:20px;
            padding: 15px 0;
            box-shadow: 1px 1px 10px ${palette.common.black}0D;
            cursor:pointer;

            :hover,&.active{
                background-color:${palette.primary.main};
                color:${palette.common.white}
            }
        
            .card-body__item{
                height:100%;
                display:flex;
                align-items:center;
                justify-content:center;
                border-right: 3px solid ${palette.primary.light};
                font-size:.8vw;


                :first-of-type , :last-child{
                    border:none;
                }
            }

            .card-body__title{
                justify-content:flex-start;
                
                .title__icon{
                    height:4.4vw;
                    margin-right:20px;
                }

                .title__text-box{
                    height:100%;
                    display:flex;
                    flex-direction:column;
                    justify-content:space-evenly;
                    font-size:.8vw;
                }
            }
        }

        
    `}
`;

export const Header = styled(Grid)`
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    padding: 0 46px;

    .header__search-input {
        width: 30vw;
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
        text-decoration: none;
        font-size: 14px;
        border: none;
        cursor: pointer;
    }

    ${({ theme: { palette } }) => `
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

        &.disabled {
            pointer-events: none;
            background-color: ${palette.grey.dark};
        }
    }
    `}
`;

export const CatalogComment = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    overflow: hidden scroll;

    .comment__title {
    }
    scrollbar-width: none;
    ::-webkit-scrollbar {
        display: none;
    }

    .comment-card {
        padding-bottom: 30px;
        margin-bottom: 15px;
    }
    .comment__user {
        display: flex;
        align-items: center;
        font-weight: bold;
    }
    .comment__avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-right: 20px;
    }
    ${({ theme: { palette } }) => `

    
        .comment__title{
            border-bottom: 1px solid ${palette.grey.dark}80;
            font-size:21px;
            font-weight:bold;
            padding-bottom: 15px;
            padding-left:15px;
            margin-bottom:40px;
        }
        .comment-card{
        border-bottom: 1px solid ${palette.grey.dark}50;
        .catalog-learn__card-lesson{
            width:90%;
            border:none;
            height:115px;
            padding:38px;
            background-color:${palette.common.white};
            box-shadow:0px 0px 32px ${palette.secondary.main}1F;
            display:flex;
            justify-content:space-between;
            align-items:center;
            margin-top:15px;
            border-radius:20px;
            fill:${palette.primary.main}99;
            cursor: pointer;
            color:${palette.text.main};
            text-decoration:none;
            

            .card-lesson__box-left{
                display:flex;
                align-items:center;
                font-size:16px;

                .box-left__text-box{
                    display:flex;
                    flex-direction:column;
                    padding-left:10px;
                }

                .text-box__skill{
                    font-size:0.8vmax;
                    font-weight:bold;
                    color:${palette.primary.main};
                }
                .text-box__name{
                    font-size:0.8vmax;
                    text-align:left;
                }
            }
        }
        .commnet__text{
            margin-top:20px;
            color:${palette.grey.dark};
        }
        .comment__replay-text{
            margin-left:30px;
            color:${palette.grey.dark};
            margin-top:20px;
        }
        .comment__status{
            margin-top:20px;
            display:flex;
            align-items:center;
        }

        .comment__replay-btn{
            color:${palette.primary.main};
            margin-right:30px;
            cursor:pointer;
            &.hide{
                display:none;
            }
        }

        .comment__trash{
            margin-left:30px;
            cursor:pointer;
            fill:${palette.primary.main};

            svg{
                height:20px;
                position: relative;

            }
        }

        .comment__check{
            font-size:30px;
            font-wieght:bold;
            margin-left:30px;
            cursor:pointer;
            color:${palette.error.main};

            &.active{
                color:${palette.common.success};
                pointer-events:none;
            }
        }

        .comment-card__star-icon{
            width:20px;
            fill:${palette.primary.light};

            &.active{
            fill:${palette.primary.main};
            }
        }
        .replay__actions{
            position:relative;
            svg{
                height:40px;
            }
        }
        .comment__replay-box{
            padding-right:40px;
            display:flex;
            flex-direction:column;
            align-items:flex-end;
            margin-top:20px;

            .replay__cancel-btn{
                color:${palette.grey.dark};
                margin-right:20px;
                cursor:pointer;
            }
            .replay__add-btn{
                color:${palette.primary.main};
                cursor:pointer;
            }
        }

        .comment__replay-input{
            width:100%;
            height:40px;
            outline:none;
            resize:none;
            margin-bottom:20px;
        }
    }
    `}
`;
