import styled from '@emotion/styled';

export const NewSkillWrapper = styled.div`
    padding: 33px 46px;

    .add-section {
        margin-bottom: 33px;
    }

    ${({ theme: { palette } }) => `
    .skill__add-question{
        background-color:#5C5C5C;
        border:none;
        display:flex;
        align-items:center;
        border:none;
        border-radius:6px;
        height:55px;
        width:100%;
        justify-content:center;
        color:${palette.common.white};
        fill:${palette.common.white};
        cursor:pointer;
        svg{
            margin-right:15px;
        }
    }
    .title__input{
        box-shadow:0px 2px 4px #1717172E;
        border:none;
        outline:none;
        border-radius:6px;
        height:55px;
        padding: 0 15px;
        font-size:13px;
    }

    .category__input {
        background-color:${palette.common.white};

        input{
            font-size:13px;
        }

        .MuiOutlinedInput-notchedOutline{
        border:none;
        outline:none;
        box-shadow: 0px 2px 4px #1717172E;
        }
    }

    `}
`;
