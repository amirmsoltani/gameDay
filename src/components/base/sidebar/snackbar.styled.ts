import { Box, Button, styled, Typography } from '@mui/material';

export const WrappderMenu = styled(Box)<{ rtl?: string }>(({ theme, rtl = 'false' }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.black,
    padding: '25px 0',
    borderRadius: rtl === 'true' ? '20px 0 0 20px' : '0 20px 20px  0 ',
    textAlign: rtl === 'true' ? 'right' : 'left',
    minWidth: 190
    // width: 190,
}));

export const CategoryMenu = styled(Typography)<{ active?: string }>(
    ({ theme, active = 'false' }) => ({
        fontWeight: active === 'true' ? 'bold' : 'normal',
        fontSize: 18,
        width: '100%',
        position: 'relative',
        cursor: 'pointer',
        padding: '10px 12px',
        ':after': {
            content: "''"
        },
        ':before': {
            content: active === 'true' ? "''" : 'none',
            position: 'absolute',
            width: '6px',
            left: 0,
            top: 0,
            height: '100%',
            backgroundColor: theme.palette.secondary.main
        }
    })
);

export const SvgIconMenu = styled('div')<{ active?: string }>(({ active = 'false' }) => ({
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: `translateY(-50%) ${active === 'true' ? 'rotate(90deg)' : ''}`,
    transition: 'all 0.3s'
}));

export const SubCategoryMenu = styled(Typography)<{ active?: string }>(
    ({ theme, active = 'false' }) => ({
        color: active === 'true' ? theme.palette.common.black : theme.palette.common.white,
        backgroundColor: active === 'true' ? theme.palette.common.white : 'transparent',
        fontSize: 14,
        width: '100%',
        padding: '5px 20px',
        paddingLeft: '40px',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: theme.palette.common.white,
            opacity: 0.9,
            color: theme.palette.common.black
        }
    })
);

export const WrapperSidebarHover = styled(Box)({
    maxWidth: 80,
    width: 80,
    overflow: 'visible',
    zIndex: 10
});

export const SidebarHoverBG = styled(Box)<{ isHover: string; maxWidth?: string }>(
    ({ theme, isHover, maxWidth }) => ({
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 50,
        transition: 'all 0.5s',
        width: '100%',
        padding: '18px 0',
        borderRadius: 24,
        minWidth: isHover === 'true' ? maxWidth || '160' + 'px' : 80
    })
);

export const NavbarHoverItemWrapper = styled(Button)<{ isHover: string }>(({ isHover, theme }) => ({
    color: isHover === 'true' ? theme.palette.common.black : theme.palette.primary.dark,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    cursor: 'pointer',
    padding: '0 10px',
    width: '100%'
}));

export const NavbarItemIcon = styled(Box)<{ isHover: string }>(({ theme, isHover }) => ({
    backgroundColor: '#FFFFFFd3',
    border: isHover === 'true' ? `solid 1px ${theme.palette.common.black}` : 'unset',
    borderRadius: 10,
    width: 58,
    height: 58,
    minWidth: 58,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

export const TitleSidbarHover = styled(Typography)({
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
    whiteSpace: 'nowrap'
});
