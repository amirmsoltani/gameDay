import styled from '@emotion/styled';

export const CardWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;
    padding: 14px 14px;
    height: 210px;
    border-radius: 20px;
    margin-top: 15px;
    font-size: 14px;
    transition: all 500ms;
    cursor: pointer;
    position: relative;

    .Jobs-card__row1 {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .jobs-card__companyLogo {
            .jobs-card__logo {
                width: 30px;
                height: 30px;
            }
            .jobs-card__text {
                padding-left: 10px;
            }
        }

        .jobs-card__toggle {
            flex-direction: column;
            justify-content: space-between;
        }
    }

    .jobs-card__row2 {
        display: flex;
        font-size: 14px;
        flex-direction: column;
        justify-content: space-between;
        .jobs-card__title {
            font-weight: 600;
        }
    }

    .jobs-card__row3 {
        padding: 10px 0px;
        .jobs-card__item {
            font-size: 14px;
            padding-left: 10px;
        }
    }

    ${({ theme: { palette } }) => `
     .jobs-card__row4{
        color: ${palette.paginate.main};
    }
        background-color:${palette.common.white};

        &.active {
            background-color:${palette.primary.main};
            margin-top:30px;
            transform: translateX(2.5vw);
            color:${palette.common.white};
        }
        &.active .labelText{
            color:${palette.common.white};
        }

       
    `}
`;
