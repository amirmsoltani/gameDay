import styled from '@emotion/styled';
import { Button, Grid, Typography } from '@mui/material';

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
    padding-top: 50px;
`;

export const JobLearn = styled.div`
    ${({ theme: { palette } }) => `
    display: flex;
    flex-direction: column;
    flex: 1;
    padding:0px 20px;
    height: 100%;
    overflow: hidden scroll;

    ::-webkit-scrollbar {
        display: none;
    }

   
    .job__box-header {
        display: flex;
        flexDirection:row;
        align-items: center;
       
        .job__box-title {
            background-color:${palette.grey.main};
            display: flex;
            flexDirection:row;
            textAlign:center;
            justify-content:center;
            flex-wrap: nowrap;
            border-radius: 6px;
            font-size: 15px;
            padding:15px 0px;
        }

        .box-btn__btn {
            padding: 0;
            margin-left: 5px;
            border-radius: 6px;
            width: 55px;
            height: 50px;
            background-color: ${palette.primary.main};
            fill:${palette.common.white};
        }
    }


    .jobs__card-body{
        display: flex;
        flexDirection:row;
        align-items: center;
        margin-top:10px;
        background-color:${palette.common.white};
        border-radius:20px;
        padding: 15px 0;
        box-shadow: 1px 1px 10px ${palette.common.black}0D;
        cursor:pointer;
        ::-webkit-scrollbar {
            display: none;
        }

        :hover,&.active{
            background-color:${palette.primary.main};
            color:${palette.common.white}
        }
    
        .card-body__item{
            display:flex;
            flexDirection:row;
            textAlign:center;
            align-items: center;
            justify-content:flex-start;
            flex-wrap: nowrap;
            font-size: 14px;
            overflow: hidden scroll;

            .detail__item {

            }
            ::-webkit-scrollbar {
                display: none;
            }
            
            :first-of-type , :last-child{
                border:none;
            }
            .detail__item {
                padding:0px 10px;
            }
            .user-icon{
                display:flex;
            flexDirection:row;
            textAlign:center;
            align-items: center;
            justify-content:flex-start;
            flex-wrap: nowrap;
            }
            .title__icon{
                height:35px;
                border-radius:50%;
                margin:0px 10px;
            }
        }  
    }
    `}
`;

export const EmailLink = styled(Typography)(({ theme, active }) => ({
    color: active === 'true' ? '#fff000' : '#fff'
}));

export const CvButton = styled(Button)(({ theme }) => ({
    width: 120,
    height: 38,
    color: theme.palette.common.black,
    backgroundColor: theme.palette.primary.light
}));
