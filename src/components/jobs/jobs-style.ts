// import { formatJustTime } from '@/utils/dateTime/format';
// import styled from '@emotion/styled';
// import { Box, Card, Grid, Typography } from '@mui/material';
// import zIndex from '@mui/material/styles/zIndex';

// export const CardJobs = styled(Card)<{ boxActive: boolean }>(({ theme, boxActive }) => {
//     console.log(boxActive, 'boxActivelog');
//     return {
//         width: '100%',
//         height: '170px',
//         boxShadow: ' 1px 1px 10px #0000000d',
//         borderRadius: '20px',
//         color: '#000',
//         padding: '10px',
//         transition: 'transform 750ms',
//         willChange: 'transform',
//         zIndex: 10,
//         backgroundColor: boxActive ? '#7251b2 ' : '#fff 0% 0% no-repeat padding-box',
//         transform: boxActive ? 'translateX(20px)' : 'translateX(0px)',
//         color: boxActive ? '#fff' : '#000',
//         '&:hover,&:p': {
//             backgroundColor: '#7251b2',
//             transform: 'translateX(20px)',
//             color: '#fff'
//         }
//     };
// });
// export const ScrollBarJobs = styled(Box)({
//     height: '100vh',
//     overflowY: 'scroll',
//     overflowX: 'visible',
//     backgroundColor: ' #dcd0f3 0% 0% no-repeat padding-box',
//     '&::-webkit-scrollbar': { display: 'none' }
//     // -ms-overflow-style: none;  /* Internet Explorer 10+ */
//     // scrollbar-width: none;  /* Firefox */
// });

// export const BoxJobText = styled(Typography)({
//     fontSize: '14px',
//     color: '#000',
//     '&:hover': {
//         color: '#fff'
//     }
// });
// export const BoxJobDay = styled(Typography)({
//     fontSize: '14px',
//     color: '#B9BFCA',
//     marginTop: '10px'
// });

import styled from '@emotion/styled';
import { Grid, Typography } from '@mui/material';

export const Content = styled(Grid)`
    height: 100%;
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

export const RightSide = styled(Grid)``;

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
