import styled from '@emotion/styled';

export const PersonCardWrapper = styled.div`
    margin: 20px 10px 0 25px;
    border-radius: 20px;
    height: 192px;
    padding: 25px;
    display: flex;
    flex-wrap: wrap;

    &.attachment {
        height: 215px;
    }

    .person-card__avatar {
        height: 70px;
        width: 70px;
        border-radius: 50%;
        margin-right: 15px;
    }

    .person-card__information {
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        .information__header {
            width: 100%;
            display: flex;
            justify-content: space-between;

            .header__name-box {
                display: flex;
                flex-direction: column;
                .name-box__full-name {
                    font-size: 20px;
                    font-weight: bold;
                }
                .name-box__title {
                    font-size: 20px;
                }
            }
            .information__date {
                font-weight: bold;
                font-size: 14px;
                margin-top: 8px;
            }
        }
        .information__description {
            font-size: 16px;
            width: 100%;
        }

        .information__attachment {
            color: #1fb5eb;
            stroke: #1fb5eb;
            display: flex;
            justify-items: center;

            svg{
                height: 22px;
                margin-right:10px;
            }
        }
    }

    ${({ theme: { palette } }) => `
            background-color:${palette.common.white};

            .person-card__information{
                .information__description {
                    color:${palette.grey.dark};
                    
                }
            }
            
        `}
`;
