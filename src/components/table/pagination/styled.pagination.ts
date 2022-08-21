import styled from '@emotion/styled';

export const PaginationContainer = styled.div({
    display: 'flex',
    padding: '10px 0',
    justifyContent: 'center'
});

export const PaginationPageItem = styled.div(({ active }: { active?: boolean }) => ({
    backgroundColor: active ? '#D5623D' : '',
    color: active ? '#F9FEFF' : '#8B8B8B',
    borderRadius: '4px',
    width: 30,
    height: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    margin: '0 1px',
    cursor: active ? '' : 'pointer',
    pointerEvents: active ? 'none' : 'auto',
    '&:hover': {
        backgroundColor: active ? '' : 'rgb(255 214 214)',
        transition: '.4s'
    }
}));

export const PaginationArrowContainer = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 5px',
    cursor: 'pointer'
});

export const PaginationDotsContainer = styled.div({
    color: '#8B8B8B',
    padding: '0 3px'
});
