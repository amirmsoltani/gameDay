import DashboardIcon from 'src/assets/sidebar/dashboard';
import SessionsIcon from 'src/assets/sidebar/sessions';
import SettingIcon from 'src/assets/sidebar/setting';
import LogoutIcon from 'src/assets/sidebar/logout';
import SearchIcon from 'src/assets/sidebar/search';
import CloseIcon from 'src/assets/sidebar/close';
import ChatIcon from 'src/assets/sidebar/chat';
import {
    activeSideBar,
    activeTab,
    closeModal,
    newModal,
    setPageData
} from 'src/redux/actions/actions';
import { CircularProgress, InputAdornment, styled, Typography } from '@mui/material';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useAuthPage } from '../auth/services/useAuth';
import { useGetUser } from 'src/auth/UserProvider';
import { MImage } from '../base/image/MImage';
import { ItemProps } from './types.sidebar';
import { QueryCache } from 'react-query';
import { Spacer } from '../base/spacer';
import { useRouter } from 'next/router';
import { Box } from '@mui/system';
import {
    SideBarItemContainer,
    ItemName,
    SideBarItem,
    SideBarList,
    Container,
    ProfileInfoContainer,
    CustomInputSearch
} from './styled.sidebar';
import { useUserLoginOrNot } from 'src/auth/useRedirectOnToken';
import { useEffect, useState } from 'react';
import { getFullImageUrl } from '@/utils/helper/ui';
import { SearchBarBody } from '../navbar/components/search';

const items = [
    {
        name: 'Dashboard',
        tab: 'dashboard',
        Icon: DashboardIcon,
        id: 'dashboard'
    },
    {
        name: 'Sessions',
        tab: 'sessions',
        Icon: SessionsIcon,
        id: 'sessions'
    },
    {
        name: 'Chat',
        tab: 'chat',
        Icon: ChatIcon,
        id: 'chat'
    },
    {
        name: 'Setting',
        tab: 'setting',
        Icon: SettingIcon,
        id: 'setting'
    }
];

const SearchBar = styled(Box)(({ theme }) => ({
    width: 270,
    maxHeight: '50%',
    overflow: 'auto',
    background: 'white',
    borderRadius: '0 0 12px 12px',
    padding: 10,
    position: 'absolute',
    top: 82,
    left: 39,
}));

const SearchBarContainer = ({ children }) => {
    return <SearchBar>{children}</SearchBar>;
};

const Item = ({ name, tab, activeTabName, Icon, activeSideBar }: ItemProps) => {
    const router = useRouter();
    const user = useGetUser();
    const pageData = useSelector(({ pageData }: any) => pageData);
    const isActive = tab === activeTabName;
    const dispatch = useDispatch();
    let userRole = 'client';
    const href = user?.userTypes === 'CLIENT' ? '/client' : '/healers/profile';

    function onClickHandler() {
        if (!router.pathname.includes(href)) router.push(href);
        dispatch(activeTab(tab));
        dispatch(setPageData({ ...pageData, activeTabParent: { id: tab } }));
        dispatch(closeModal('search'));
        activeSideBar(false);
    }

    return (
        <SideBarItem isActive={isActive} onClick={onClickHandler}>
            <SideBarItemContainer>
                <Icon />
                <ItemName>{name}</ItemName>
            </SideBarItemContainer>
        </SideBarItem>
    );
};

function Sidebar({ isSideBarActive, activeSideBar, activeTabName, ...props }) {
    const dispatch = useDispatch();
    const router = useRouter();

    useUserLoginOrNot();
    const user = useGetUser();
    console.log(user.userTypes, 'useeeer');

    const { signOut, isSignOutLoading } = useAuthPage();
    const queryCache = new QueryCache({
        onError: (error) => {
            console.log(error);
        },
        onSuccess: (data) => {
            console.log(data);
        }
    });

    const handleLogout = () => {
        signOut();
        queryCache.clear();
    };

    const searchOnChangeHandler = (e) => {
        const searchData = e.target.value;

        dispatch(closeModal('search'));
        dispatch(
            newModal({
                id: 'search',
                Container: SearchBarContainer,
                Body: SearchBarBody,
                searchData: searchData,
                hasSearch: false,
                sideBarSearch: true
            })
        );
        if (e.target.value === '') dispatch(closeModal('search'));
    };

    const [hasSearch, setHasSearch] = useState(false);

    useEffect(() => {
        if (
            router.pathname === '/healing' ||
            router.pathname === '/healers' ||
            router.asPath.includes('/healers/healer/') ||
            router.asPath.includes('/healing/session/')
        )
            setHasSearch(true);
        else setHasSearch(false);
    }, [router.pathname]);

    return (
        <Container>
            <ProfileInfoContainer>
                <Box>
                    <MImage
                        resources={{
                            src: getFullImageUrl(String(user?.imageAddress)),
                            fallback: '/images/empty_profile.png'
                        }}
                        style={{
                            borderRadius: '50%',
                            width: '76px',
                            height: '76px',
                            border: 'none'
                        }}
                    />
                    <Spacer space={8} />
                    <Typography fontSize="20px" color="white">
                        {user?.name || 'Empty'}
                    </Typography>
                    <Typography fontSize="15px" color="white">
                        {user?.id}
                    </Typography>
                </Box>
                <Box marginRight="10px" onClick={() => activeSideBar(false)}>
                    <CloseIcon />
                </Box>
            </ProfileInfoContainer>
            <Spacer space={25} />
            {hasSearch && (
                <>
                    {' '}
                    <Box>
                        <CustomInputSearch
                            onChange={searchOnChangeHandler}
                            placeholder="Search Project"
                            id="standard"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                style: {
                                    height: '50px',
                                    width: '100%',
                                    maxWidth: '343px'
                                }
                            }}
                        />
                    </Box>
                    <Spacer space={35} />{' '}
                </>
            )}
            <SideBarList>
                {user.userTypes === 'HEALER' &&
                    items.map((item, index) => (
                        <Item
                            key={index}
                            {...item}
                            activeTabName={activeTabName}
                            activeSideBar={activeSideBar}
                        />
                    ))}
                {user.userTypes === 'CLIENT' &&
                    items
                        .slice(1, 4)
                        .map((item, index) => (
                            <Item
                                key={index}
                                {...item}
                                activeTabName={activeTabName}
                                activeSideBar={activeSideBar}
                            />
                        ))}
            </SideBarList>
            <Spacer space={70} />
            <SideBarItemContainer onClick={handleLogout}>
                <LogoutIcon />
                <ItemName>
                    {isSignOutLoading ? <CircularProgress size="1rem" color="inherit" /> : 'Logout'}
                </ItemName>
            </SideBarItemContainer>
        </Container>
    );
}

const mapStateToProps = ({ isSideBarActive, activeTabName }) => ({
    isSideBarActive,
    activeTabName
});

const mapDispatchToProps = { activeSideBar };

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
