import { Box, styled } from '@mui/material';
export const NavBarContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: '40px',
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: '#F0FAFC',
    height: 80,
    padding: '0 80px',
    zIndex: 70,
    // border: '1px solid #707070',
    '@media (max-width: 700px)': {
        padding: '0px 10px',
        columnGap: '10px'
    },
    '@media(max-width: 1100px)': {
        padding: '0 10px'
    }
});
export const NavbarMobileContainer = styled(Box)<{ hasSearch: boolean }>(({ hasSearch }) => ({
    position: 'fixed',
    backgroundColor: '#FCFCFC',
    left: 0,
    right: 0,
    top: 70,
    height: 45,
    zIndex: 69,
    display: hasSearch ? 'flex' : 'none',
    justifyContent: 'end',
    '@media(min-width: 570px)': {
        display: 'none'
    }
}));
export const SearchBar = styled(Box)<{ mobile: boolean; isLogin: boolean }>(
    ({ mobile, isLogin }) => ({
        display: mobile ? 'none' : 'unset',
        '@media(max-width: 900px)': {
            display: isLogin ? 'none' : 'unset'
        },
        '@media(max-width: 570px)': {
            display: isLogin ? 'none' : mobile ? 'unset' : 'none',
            width: '100vw'
        }
    })
);
export const NavbarModalContainer = styled('div')({
    position: 'fixed',
    top: '80px',
    right: 50,
    backgroundColor: '#FFFFFF',
    boxShadow: '1px 3px 8px #4D6F7633',
    borderRadius: '0 0 11px 11px',
    border: '0.3px solid #D0D0D0',
    minWidth: 50,
    minHeight: 50,
    '@media(max-width: 650px)': {
        right: 10
    },
    borderTop: 'unset'
});

export const NavbarModalContainerAdmin = styled('div')({
    position: 'fixed',
    top: '0%',
    right: 100,
    backgroundColor: '#FFFFFF',
    boxShadow: '2px 2px 5px #ADADAD33',
    border: '0.5px solid #E0E0E0',
    minWidth: 100,
    minHeight: 50,
    '@media(max-width: 650px)': {
        right: 10
    }
});

export const ModalUL = styled('ul')({
    listStyle: 'none',
    margin: 0,
    padding: 0
});
export const ModalLI = styled('li')({
    display: 'flex',
    alignItems: 'center',
    padding: '10px 30px',
    cursor: 'pointer'
});
export const NavbarLinkContainer = styled(Box)(
    ({ showInMobileView }: { showInMobileView: boolean }) => ({
        height: '100%',
        paddingTop: 15,
        '@media(max-width: 900px)': {
            display: showInMobileView ? 'unset' : 'none'
        }
    })
);
export const SearchContainer = styled(Box)({
    minWidth: 150,
    '@media(max-width: 900px)': {
        // display: 'none'
    }
});
export const MobileViewItem = styled(Box)({
    display: 'flex',
    alignItems: 'baseline',
    '@media(min-width: 900px)': {
        display: 'none'
    }
});
export const TypeMenuContainer = styled(Box)({
    borderRadius: 10,
    padding: 0,
    margin: 0,
    position: 'absolute',
    background: 'white',
    boxShadow: '0px 0px 15px -5px rgba(0,0,0,0.5)',
    minWidth: 209
});
export const TypeMenuItemContainer = styled(Box)({
    padding: 15
});
