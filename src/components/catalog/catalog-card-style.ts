import styled from '@emotion/styled';

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
        }
        
    `}
`;
