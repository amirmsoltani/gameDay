import MobileViewTypesMenu from './components/type-menu-in-mobile-view';
import ProfileSection from './components/profile-section';
import NavbarLink from './components/navbar-link';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { SearchContainer } from './styled.navbar';
import { MImage } from '../base/image/MImage';
import { InputAdornment, TextField, Typography } from '@mui/material';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import Notification from './components/notification';
import Search from './components/search';
const sharedStyles: CSSProperties = {
    cursor: 'pointer',
    fontFamily: 'Helvetica'
};
export const navbarItems = {
    default: [
        <MImage
            key="0"
            resources={{ src: '/images/Subtraction6.png' }}
            style={{ borderRadius: '50%', width: '60px', height: '60px', ...sharedStyles }}
        />,
        <MobileViewTypesMenu key="1" />,
        <NavbarLink key="2" href="/exercises">
            <Typography>Exercises</Typography>
        </NavbarLink>,
        <NavbarLink key="3" href="/routines">
            <Typography>Your routines</Typography>
        </NavbarLink>,
        <NavbarLink key="4" href="/favorites">
            <Typography>Your favorites</Typography>
        </NavbarLink>,
        <NavbarLink key="5" href="/shop">
            <Typography>Shop</Typography>
        </NavbarLink>,
        <NavbarLink key="6" href="/setting">
            <Typography>Setting</Typography>
        </NavbarLink>,
        <div key="7" style={{ flex: 1 }} />,
        <Search key="8" />,
        <NavbarLink key="9" href="/signin" showInMobileView>
            <Button
                variant="outlined"
                style={{ borderRadius: '20px', width: '150px', ...sharedStyles }}>
                Login
            </Button>
        </NavbarLink>
    ],
    user: [
        <MImage
            key="0"
            resources={{ src: '/images/Subtraction6.png' }}
            style={{ borderRadius: '50%', width: '60px', height: '60px', ...sharedStyles }}
        />,
        <MobileViewTypesMenu key="1" />,
        <NavbarLink key="2" href="/exercises">
            <Typography>Exercises</Typography>
        </NavbarLink>,
        <NavbarLink key="3" href="/routines">
            <Typography>Your routines</Typography>
        </NavbarLink>,
        <NavbarLink key="4" href="/favorites">
            <Typography>Your favorites</Typography>
        </NavbarLink>,
        <NavbarLink key="5" href="/shop">
            <Typography>Shop</Typography>
        </NavbarLink>,
        <NavbarLink key="6" href="/setting">
            <Typography>Setting</Typography>
        </NavbarLink>,
        <div key="7" style={{ flex: 1 }} />,
        <Search key="8" />,
        <Notification key="9" />,
        <ProfileSection key="10">
            <MImage
                key="11"
                resources={{ src: '/images/profile.png', fallback: '/images/empty_profile.png' }}
                style={{
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    border: '2.5px solid #35094F',
                    ...sharedStyles
                }}
            />
        </ProfileSection>
    ]
};
