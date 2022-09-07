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
