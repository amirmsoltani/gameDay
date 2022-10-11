import styled from "@emotion/styled";
import { Grid } from "@mui/material";


export const QuestionPreviewWrapper = styled(Grid)`
    width: 100%;
    height: 100%;
    overflow: hidden scroll;
    padding: 43px 80px 43px 46px;
    ::-webkit-scrollbar {
        display: none;
    }
`;

export const QuestionHeaderWrapper = styled.div`
    ${({ theme: { palette } }) => `
    padding: 24px 90px 24px 43px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    flex-wrap:wrap;

    .question__left-items{
        display:flex;
        align-items:center;
    }

    .question__back-btn{
        margin-right:43px;
        display:flex;
        align-items:center;
        justify-content:center;
        border-radius:50%;
        background-color: ${palette.primary.main};
        width:43px;
        height:43px;
        svg{
            transform: rotate(90deg);
            stroke:${palette.common.white};
        }
    
    }

    .question__breadcrumb{
        font-weight:bold;
        font-size:16px;
    }

    .question__link-button {
        cursor: pointer;
        border:none;
        margin-left: 15px;
        height: 45px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        text-decoration: none;
        font-size: 14px;
        background-color:${palette.primary.main};
        padding: 0 25px;
        color:${palette.common.white};

        .link-button__plus{
            fill:${palette.common.white};
            margin-right:10px;
        }
        :disabled{
            background:${palette.grey.dark};
            cursor: not-allowed;
        }
    }
    `}
`;