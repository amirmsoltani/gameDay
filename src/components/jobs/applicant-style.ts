import styled from '@emotion/styled';
import { Button, Grid, Typography } from '@mui/material';

export const Content = styled(Grid)`
    height: 100%;
    width: 100%;
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

    .table__wrapper{
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 100%;
        overflow: hidden scroll;
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
            padding:15px 10px;
            *{
                display:flex;
                align-items:center;
                justify-content:center;
                cursor:pointer;

                
            }
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
       
        ::-webkit-scrollbar {
            display: none;
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
                display:flex;
                justify-content:center;
                align-items:center;

                :last-child{
                    justify-content:flex-end;
                }
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

export const EmailLink = styled(Typography)({
    color: '#7251B2',
    fontSize: '14px',
    textDecoration: 'underline'
});

export const CvButton = styled.a({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 171,
    height: 48,
    fontSize: '14px',
    textAlign: 'center',
    backgroundColor: '#DCD0F3',
    color: '#000000',
    cursor: 'pointer',
    borderRadius: '4px',
    '&:hover': {
        backgroundColor: '#7251b2',
        color: '#fff'
    }
});
