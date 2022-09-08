import styled from '@emotion/styled';

export const SearchInputWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 45px;
    margin-left: 33px;
    padding: 0 24px;
    border-radius: 6px;
    width: 35vw;

    .input-box__input {
        background-color: transparent;
        border: none;
        width: 50px;
        outline: none;
        width: calc(100% - 130px);
    }

    .input-box__search-text {
        margin: 0 20px;
    }
    
    ${({ theme: { palette } }) => `
        background-color:${palette.grey.light};
    `}
`;
