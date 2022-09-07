import styled from '@emotion/styled';
import { Typography } from '@mui/material';

export const CardWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 30px 14px 14px 14px;
    border-radius: 20px;
    margin-top: 15px;
    font-size: 15px;
    transition: all 500ms;
    cursor: pointer;
    position: relative;

    .catalog-card__colum1 {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .catalog-card__colum2 {
        padding-right: 30px;
        .catalog-card__image {
            width: 105px;
            height: 105px;
        }
    }

    .catalog-card__footer {
        display: none;
        justify-content: space-between;
    }

    ${({ theme: { palette } }) => `

        background-color:${palette.common.white};

        .catalog-card__lesson-text {
            margin-top:30px;
            color:${palette.grey.dark};
            font-size:12px;
        }

        .catalog-card__star-icon{
            width:20px;
            fill:${palette.primary.light};
        }

        &.active{
            background-color:${palette.primary.main};
            margin-top:30px;
            transform: translateX(2.5vw);
            color:${palette.common.white};
        
            .catalog-card__lesson-text {
                color:${palette.primary.light};
            }

            .catalog-card__footer{
                display:flex;
                width: 100%;
                border-top: 2px solid ${palette.primary.light}40;
                margin-top: 25px;
                
            }

            .catalog-card__footer__separator{
                width:2px;
                height:100%;
                background-color:${palette.primary.light}40;
            }

            .catalog-card__footer__btn{
                display:flex;
                justify-content:center;
                align-items:center;
                width:50%;
                height:50px;
                color:${palette.common.white};
                fill:${palette.common.white};
                border-radius:6px;
                margin: 5px;
                &.active,:hover{
                    background-color:${palette.primary.light}40;
                }
                svg{
                    margin-right:15px;
                    width:22px;
                }
            }
        }

        .catalog-card__badge{
            position: absolute;
            width: 15px;
            height: 15px;
            left:-7.5px;
            top:    calc(50% - 7.5px);
            border-radius:50%;
            background-color:${palette.error.main};
        }
        
    `}
`;
export const BoxJobDay = styled(Typography)({
    fontSize: '14px',
    color: '#B9BFCA',
    marginTop: '10px'
});
