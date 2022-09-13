import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';

export const Content = styled(Grid)`
    height: 100%;
    width: 100%;
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
    padding-top: 30px;
`;

export const JobLearn = styled.div`
    ${({ theme: { palette } }) => `
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    overflow: hidden scroll;

    ::-webkit-scrollbar {
        display: none;
    }

    .catalog-skill__list-body{
        height:100%;
        overflow: hidden scroll;

        ::-webkit-scrollbar {
            display: none;
        }
    } 
    .job__box-header {
        display: flex;
        flexDirection:row;
        align-items: center;
        overflow: hidden scroll;

        ::-webkit-scrollbar {
            display: none;
        }
    }

    .job__box-title {
        background-color:${palette.grey.main};
        display: flex;
        flexDirection:row;
        flex-wrap: nowrap;
        border-radius: 6px;
        font-size: 15px;
        padding:15px 0px;
    }
    
    .box-btn__btn {
        padding: 0;
        margin-left: 10px;
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        background-color: ${palette.primary.main};
        fill:${palette.common.white};
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
