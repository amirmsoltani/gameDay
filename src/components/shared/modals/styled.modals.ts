import styled from '@emotion/styled';

export const ModalBlur = styled.div(
    ({
        topBar,
        topValue,
        hasSearch,
        sideBarSearch
    }: {
        topBar: number;
        topValue: number;
        hasSearch: boolean;
        sideBarSearch: boolean;
    }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: sideBarSearch ? 'transparent' : 'rgba(0, 0, 0, 0.25)',
        border: sideBarSearch ? 'none' : '1px solid #707070',
        backdropFilter: sideBarSearch ? 'unset' : 'blur(9px)',
        WebkitBackdropFilter: sideBarSearch ? 'unset' : 'blur(9px)',
        zIndex: 10,
        top: sideBarSearch ? 0 : topBar ? 0 : topValue,
        '@media(max-width: 570px)': {
            top: sideBarSearch ? 0 : hasSearch ? 115 : topBar ? 0 : topValue
        }
    })
);

export const MModalBodyContainer = styled.div({
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#F8F8F8',
    boxShadow: '2px 2px 5px #ADADAD33',
    border: '0.5px solid #E0E0E0',
    borderRadius: '20px',
    minWidth: 50,
    minHeight: 50,
    padding: 20
});

export const ModalTitleBar = styled.div({
    display: 'flex',
    marginBottom: 10,
    '& > svg': {
        alignSelf: 'center',
        cursor: 'pointer',
        '&:hover path': {
            stroke: '#9f0b0b'
        }
    }
});

export const ModalTitle = styled.div({
    flex: 1,
    fontWeight: 'bold'
});

export const ModalBlurWrapper = styled.div({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100
});
