import { NavBarContainer, NavbarMobileContainer, SearchBar } from './styled.navbar';
import { useRouter } from 'next/router';
import { connect, useDispatch } from 'react-redux';
import { newModal, activeSideBar, activeTab } from 'src/redux/actions/actions';
import { useEffect } from 'react';
import Sidebar from '@/components/sidebar/sidebar';
import { useGetUser } from 'src/auth/UserProvider';
import { MImage } from '../base/image/MImage';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import MobileViewTypesMenu from './components/type-menu-in-mobile-view';
import NavbarLink from './components/navbar-link';
import { Box, Button, styled, Typography as MiType, useTheme } from '@mui/material';
import Search from './components/search';
import Notification from './components/notification';
import ProfileSection from './components/profile-section';
import { useUserLoginOrNot } from 'src/auth/useRedirectOnToken';
import { getFullImageUrl } from '@/utils/helper/ui';
import { Spacer } from '../base/spacer';
import QuickStore from './components/quick-store';

const Typography = styled(MiType)<{ active?: string }>(({ theme, active = 'false' }) => ({
    color: theme.palette.common.black,
    position: 'relative',
    fontWeight: 'bold',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    ':after': {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '4px',
        borderRadius: '4px 4px 0 0',
        backgroundColor: theme.palette.secondary.main,
        content: "''",
        display: active === 'true' ? 'block' : 'none'
    }
}));

function Navbar({ isSideBarActive, activeSideBar }) {
    const router = useRouter();
    const rootPath = router.pathname;
    const dispatch = useDispatch();
    useUserLoginOrNot();
    const user = useGetUser();

    useEffect(() => {
        if (!rootPath.includes('/healers/profile') && !rootPath.includes('/client'))
            dispatch(activeTab('is-not-in-dashboard'));
    }, [rootPath]);

    useEffect(() => {
        if (!isSideBarActive) return;

        function disableSideBar() {
            if (isSideBarActive) activeSideBar(false);
        }

        window.addEventListener('resize', disableSideBar);

        return () => window.removeEventListener('resize', disableSideBar);
    }, [isSideBarActive]);

    // let items;
    // if (user?.userTypes === 'ADMIN' || user?.userTypes === 'CLIENT' || user?.userTypes === 'HEALER')
    //     items = navbarItems['user'];
    // else items = navbarItems['default'];
    // const items = navbarItems[rootPath] || navbarItems.default;
    let hasSearch = false;
    if (
        router.pathname === '/healing' ||
        router.pathname === '/healers' ||
        router.asPath.includes('/healers/healer/') ||
        router.asPath.includes('/healing/session/')
    ) {
        hasSearch = true;
    }
    return (
        <>
            <NavBarContainer>
                {isSideBarActive ? <Sidebar /> : <NavbarItems user={user} />}
            </NavBarContainer>
            <SearchBar mobile={true} isLogin={typeof user === 'string' ? false : true}>
                <NavbarMobileContainer hasSearch={hasSearch}>
                    <Search />
                </NavbarMobileContainer>
            </SearchBar>
        </>
    );
}

const mapStateToProps = ({ isSideBarActive, chatCount, activeTabName }) => ({
    isSideBarActive,
    chatCount,
    activeTabName
});

const mapDispatchToProps = { activeSideBar, newModal };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

const sharedStyles: CSSProperties = {
    cursor: 'pointer',
    fontFamily: 'Helvetica'
};
const NavbarItems = ({ user }) => {
    const router = useRouter();
    const theme = useTheme();
    return (
        <>
            <MImage
                key="0"
                resources={{ src: '/images/logo_menu.png' }}
                style={{ borderRadius: '50%', ...sharedStyles }}
                onClick={() => router.push('/')}
            />
            <Box>
                <MobileViewTypesMenu key="1" />
            </Box>
            <Box></Box>
            <NavbarLink key="2" href="/exercises">
                <Typography active={router.pathname.includes('exercises') ? 'true' : ''}>
                    Exercises
                </Typography>
            </NavbarLink>
            <NavbarLink key="3" href="/routines">
                <Typography active={router.pathname.includes('routines') ? 'true' : ''}>
                    Your routines
                </Typography>
            </NavbarLink>
            <NavbarLink key="4" href="/favorites">
                <Typography active={router.pathname.includes('favorites') ? 'true' : ''}>
                    Your favorites
                </Typography>
            </NavbarLink>
            <NavbarLink key="5" href="/shop">
                <Typography active={router.pathname.includes('shop') ? 'true' : ''}>
                    Shop
                </Typography>
            </NavbarLink>
            <NavbarLink key="6" href="/setting/profile">
                <Typography active={router.pathname.includes('setting') ? 'true' : ''}>
                    Setting
                </Typography>
            </NavbarLink>
            <div key="7" style={{ flex: 1 }} />
            <SearchBar
                mobile={false}
                isLogin={user === 'LOADING' || user === 'NO_USER' ? false : true}>
                <Search key="8" />
            </SearchBar>
            {user === 'LOADING' || user === 'NO_USER' ? (
                <NavbarLink key="9" href="/signin" showInMobileView>
                    <Box
                        sx={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            paddingBottom: '15px'
                        }}>
                        <Button
                            color="secondary"
                            variant="contained"
                            sx={{
                                borderRadius: '12px',
                                width: '200px',
                                ...sharedStyles,
                                ':hover': {
                                    backgroundColor: theme.palette.secondary.main
                                }
                            }}>
                            Sign in
                        </Button>
                    </Box>
                </NavbarLink>
            ) : (
                <>
                    <Box sx={{ display: 'flex' }}>
                        <QuickStore key="9" />
                        <Notification key="10" />
                    </Box>
                    <ProfileSection key="11">
                        <Typography>{user?.fullName}</Typography>
                        <Spacer hori={12} />
                        <MImage
                            key="13"
                            resources={{
                                src: getFullImageUrl(user?.photoUrl),
                                fallback: '/images/default-image.png'
                            }}
                            style={{
                                borderRadius: '9px',
                                width: '55px',
                                height: '55px',
                                // border: '2.5px solid #35094F',
                                // marginRight: '-1px',
                                ...sharedStyles
                            }}
                        />
                    </ProfileSection>
                </>
            )}
        </>
    );
};
