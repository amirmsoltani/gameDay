import NavbarLink from './navbar-link';
import { MobileViewItem, TypeMenuContainer, TypeMenuItemContainer } from '../styled.navbar';
import { ArrowDownIcon } from 'src/assets/common/ArrowDownIcon';
import { Divider, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Spacer } from '@/components/base/spacer';
import { Box } from '@mui/system';
import { useRouter } from 'next/router';

const MobileViewTypesMenu = () => {
    const [isTypeMenuOpen, setIsTypeMenuOpen] = useState(false);
    const router = useRouter();
    const ref = useRef<any>();
    const [activeItem, setActiveItem] = useState('');

    useEffect(()=>{
        if(router.asPath.includes('/healing')) setActiveItem('Service type');
        else if(router.pathname === '/client' || router.pathname === '/healers/profile') setActiveItem('Dashboard');
        else if(router.asPath.includes('/healers')) setActiveItem('Practitioners');
        else if(router.asPath.includes('/about')) setActiveItem('About');
        else if(router.pathname === '/') setActiveItem('Home');
        else setActiveItem('')
    },[])

    useEffect(() => {
        window.addEventListener('click', handleClickOutside, true);
        function handleClickOutside(event) {
            if (!ref.current?.contains?.(event.target) && isTypeMenuOpen) {
                setIsTypeMenuOpen(false);
            }
        }
        return () => window.removeEventListener('click', handleClickOutside, true);
    }, [isTypeMenuOpen]);

    return (
        <Box ref={ref}>
            <MobileViewItem onClick={() => setIsTypeMenuOpen(!isTypeMenuOpen)}>
                <Typography sx={{whiteSpace: 'nowrap'}}>{activeItem}</Typography>
                <Spacer space={3} />
                <ArrowDownIcon />
            </MobileViewItem>
            <Spacer space={5} />
            <TypeMenuContainer style={{ display: isTypeMenuOpen ? 'unset' : 'none' }}>
                <TypeMenuItemContainer>
                    <NavbarLink showInMobileView={true} href="/">
                        Home
                    </NavbarLink>
                </TypeMenuItemContainer>
                <Divider style={{ width: '100%', borderColor: '#E4E1F0' }} />
                <TypeMenuItemContainer>
                    <NavbarLink showInMobileView={true} href="/healing">
                        Service type
                    </NavbarLink>
                </TypeMenuItemContainer>
                <Divider style={{ width: '100%', borderColor: '#E4E1F0' }} />
                <TypeMenuItemContainer>
                    <NavbarLink showInMobileView={true} href="/healers">
                    Practitioners
                    </NavbarLink>
                </TypeMenuItemContainer>
                <Divider style={{ width: '100%', borderColor: '#E4E1F0' }} />
                <TypeMenuItemContainer>
                    <NavbarLink showInMobileView={true} href="/about">
                        About
                    </NavbarLink>
                </TypeMenuItemContainer>
            </TypeMenuContainer>
        </Box>
    );
};

export default MobileViewTypesMenu;
