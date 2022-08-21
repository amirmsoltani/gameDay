import _ from 'lodash';
import DashboardIcon from 'src/assets/icons/navbar/dashboard';
import LogoutIcon from 'src/assets/icons/navbar/logout';
import { closeModal, newModal, activeSideBar, activeTab } from 'src/redux/actions/actions';
import { Box, CircularProgress, Divider, Typography } from '@mui/material';
import { ModalLI, ModalUL, NavbarModalContainer } from '../styled.navbar';
import { useAuthPage } from '@/components/auth/services/useAuth';
import { connect, useDispatch } from 'react-redux';
import { Spacer } from '@/components/base/spacer';
import { QueryCache } from 'react-query';
import { useRouter } from 'next/router';
import { useGetUser } from 'src/auth/UserProvider';
import { clearCookie } from '@/utils/storage/cookie';
import { ACCESS_TOKEN_KEY } from 'src/constants/storage';
import { useUserLoginOrNot } from 'src/auth/useRedirectOnToken';

export const ModalBody = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    useUserLoginOrNot();
    const user = useGetUser();
    let userRole = user.userType;

    const RedirectToDashboard = () => {
        if (userRole === 'NORMAL_USER') {
            router.push('/');
            dispatch(activeTab('sessions'));
        } else if (userRole === 'ADMIN') router.push('/admin/dashboard');
        dispatch(closeModal('dashboard-logout'));
    };

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
        clearCookie(ACCESS_TOKEN_KEY);
        queryCache.clear();
    };

    return (
        <ModalUL>
            {/* <ModalLI onClick={RedirectToDashboard}>
                <DashboardIcon />
                <Spacer space={15} />
                <Typography fontSize={18}>{_.capitalize(userRole)} Dashboard</Typography>
            </ModalLI>
            <Divider style={{ width: '100%', borderColor: '#707070' }} /> */}
            <ModalLI onClick={handleLogout}>
                <LogoutIcon />
                <Spacer hori={30} />
                <Typography fontSize={18}>
                    {isSignOutLoading ? <CircularProgress size="1rem" /> : 'Logout'}
                </Typography>
            </ModalLI>
        </ModalUL>
    );
};

function ProfileSection({ children, activeSideBar, chatCount }) {
    const dispatch = useDispatch();

    const onClickHandler = () => {
        if (window.innerWidth > 900) {
            dispatch(
                newModal({
                    id: 'dashboard-logout',
                    closeButton: false,
                    Container: NavbarModalContainer,
                    Body: ModalBody,
                    sideBarSearch: true
                })
            );
        } else activeSideBar(true);
    };

    return (
        <Box
            sx={{
                cursor: 'pointer',
                fontFamily: 'Helvetica',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
            onClick={onClickHandler}>
            {chatCount > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        width: '20px',
                        height: '20px',
                        backgroundColor: '#3E205A',
                        right: '50px',
                        bottom: 5,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff'
                    }}>
                    {chatCount}
                </div>
            )}
            {children}
        </Box>
    );
}

const mapStateToProps = ({ isSideBarActive, chatCount }) => ({ isSideBarActive, chatCount });

const mapDispatchToProps = { activeSideBar, newModal };

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSection);
