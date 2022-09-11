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
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    overflow: hidden scroll;

    ::-webkit-scrollbar {
        display: none;
    }

    .job__box-header {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .job__title {
        font-size: 15px;
        padding: 10px 40px 10px 5px;
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
    }

    .job__box-title {
        display: flex;
        justify-content: space-evenly;
        border-radius: 6px;
    }
    ${({ theme: { palette } }) => `

        .job__box-title {
            background-color:${palette.grey.main};
        }

        .box-btn__btn{
            background-color: ${palette.primary.main};
            fill:${palette.common.white};
        }
    
    `}
`;

export const UserCV = styled.div`
    /* padding-top: 30px;
    .test {
        display: flex;
        flex-direction: row;
    } */
`;
