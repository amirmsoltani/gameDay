import { theme } from '@/provider/ThemeProvider';
import styled from '@emotion/styled';
import { Box } from '@mui/system';

export const Content = styled(Box)`
    padding: 34px 80px 44px 43px;
    height: 100%;
`;

export const CardWrapper = styled(Box)`
    border-radius: 20px;
    min-height: 200px;
    box-shadow: 0px 5px 25px #52575d1a;
    ${({ theme }) =>
        `
        background-color:${theme.palette.common.white};
        &.primary{
            color: ${theme.palette.common.white};
            background-color:${theme.palette.primary.main};
        }
    `}
`;

export const CardHeader = styled.div`
    margin: 36px 20px 17px 30px;
    padding-bottom: 12px;
    border-bottom: 2px solid ${({ theme }) => theme.palette.grey.border};
    display: flex;
    justify-content: space-between;
    align-items: center;

    .card__header__title {
        font-weight: bold;
        font-size: 21px;
    }

    &.primary {
        .card__header__title {
            color: ${theme.palette.common.white};
        }
    }
`;

export const ReportBody = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 28px;

    .mini-card__title {
        color: ${({ theme }) => theme.palette.text.placeholder};
        font-size: 12px;
    }

    .mini-card__amount {
        font-size: 21px;
        font-weight: bold;
        margin-top: 10px;
        margin-bottom: 5px;
    }

    .mini-card__percent {
        font-size: 12px;
        font-weight: bold;
        color: ${({ theme }) => theme.palette.error.main};
    }
`;

export const AddSkill = styled.a`
    font-size: 14px;
    border-radius: 6px;
    display: flex;
    height: 40px;
    align-items: center;
    justify-content: center;
    padding:0 14px;
    cursor: pointer;
    text-decoration: none;
    ${({ theme }) => `
        color:${theme.palette.primary.main};
        background-color:${theme.palette.common.white};
        .plus{
            fill:${theme.palette.primary.main};
            display:inline;
            width:21px;
            margin-right:14px;
        }
    `}
`;

export const SkillBody = styled(Box)`
    max-width: 100%;
    padding: 5px 16px 0 16px;

    ${({ theme }) => `
    .skill-body__image {
        width: 100%;
        border-radius: 20px;
        box-shadow: 1px 1px 10px #0000000d;
        background-color: ${theme.palette.common.white};
        object-fit: scale-down;
        object-position: center;
    }

    .skill-body__title{
        font-size: 12px;
        color:${theme.palette.common.white};
    }
    .skill-body__category{
        font-size: 12px;
        color:${theme.palette.text.placeholder};
    }

    `}
`;

export const UserBody = styled(Box)`
    padding: 5px 43px 0 43px;
    justify-content: space-around;

    .user-body__imagebox {
        position: relative;
        width: 4vw;
    }

    .user-body__crown {
        right: -1vh;
        top: -2vh;
        position: absolute;
        width: 4vh;
    }

    .user-body__image {
        width: 4vw;
        border-radius: 50%;
        object-fit: scale-down;
        object-position: center;
    }

    .user-body__name {
        max-width: 4vw;
        font-size: 1.2vh;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .user-body__point {
        max-width: 4vw;
        font-size: 1.1vh;
        text-align: center;
        white-space: nowrap;
        color: #8ce2ee;
        font-size: 1.2vh;
    }
`;

export const ChartBody = styled.div`
    padding: 0 30px;
    height: 60%;

    .chart-body__chart-map {
        margin-left: 15px;
        font-size: 15px;

        ::before {
            display: inline-block;
            width: 25px;
            height: 10px;
            content: '';
            background-color: ${({ theme: { palette } }) => palette.primary.main};
            margin-right: 10px;
            border-radius: 5px;
        }
    }
`;
