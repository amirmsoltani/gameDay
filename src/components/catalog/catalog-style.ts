import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const Content = styled(Grid)`
    height: 100%;
    width: 100%;
    svg {
        position: static;
        transform: translate(0, 0);
    }
`;

export const LeftSide = styled(Grid)`
    overflow: hidden scroll;
    height: 100%;
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
`;

export const CatalogLearn = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    overflow: hidden scroll;

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
        }
    }
    .catalog-learn__description-title {
        font-size: 15px;
    }

    ${({ theme: { palette } }) => `
        .box-btn__btn{
            background-color: ${palette.primary.main};
            fill:${palette.common.white};
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
            height: 65px;
            padding:7px;
            border-radius:17px;
            background-color:${palette.primary.main};
            color:${palette.common.white};
            font-weight: bold;
            font-size:16px;
            margin-top:15px;
            margin-bottom:10px;

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
        }

        .catalog-skill__list-body{
            height:100%;
            overflow: hidden scroll;

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

                :first-of-type , :last-child{
                    border:none;
                }
            }

            .card-body__title{
                justify-content:flex-start;
                
                .title__icon{
                    height:85px;
                    margin-right:20px;
                }

                .title__text-box{
                    height:100%;
                    display:flex;
                    flex-direction:column;
                    justify-content:space-evenly;
                    font-size:16px;
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
    }
    `}
`;
