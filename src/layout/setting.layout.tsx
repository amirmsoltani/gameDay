import { Box, Grid, styled, Typography } from '@mui/material';
import CdnIcon from 'src/assets/icons/cdn';
import OrdersIcon from 'src/assets/icons/orders';
import PlansIcon from 'src/assets/icons/plans';
import ProfileIcon from 'src/assets/icons/profile';
import SupportIcon from 'src/assets/icons/support';
import { useRouter } from 'next/router';

import { S } from './admin/lib';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { INavbarItems, SideBarHover } from '@/components/base/sidebar/sidebar-hover';
import { WrapperContainer } from '@/components/home/home.styled';

const navItems: INavbarItems[] = [
    {
        Icon: ProfileIcon,
        id: 0,
        link: '/setting/profile',
        type: 'link',
        onClick: () => {},
        title: 'Edit profile'
    },
    {
        Icon: PlansIcon,
        id: 1,
        link: '/setting/plans',
        type: 'link',
        onClick: () => {},
        title: 'Plan'
    },
     {
        Icon: SupportIcon,
        id: 2,
        link: '/setting/support',
        type: 'link',
        onClick: () => {},
        title: 'Support'
    },
    {
        Icon: CdnIcon,
        id: 3,
        link: '/setting/support',
        type: 'link',
        onClick: () => {},
        title: 'Term of service'
    },
    {
        Icon: OrdersIcon,
        id: 4,
        link: '/setting/orders',
        type: 'link',
        onClick: () => {},
        title: 'Orders'
    }
]

const SideBar = styled(Grid)(({ theme }) => ({
    backgroundColor: theme.palette.primary?.main,
    borderRadius: '24px',
    padding: '44px 11px 30px 11px',
    position: 'fixed',
    left: '5%',
    top: '150px'
}));
const TitleContainer = styled(Grid)(({ theme }) => ({
    width: '1100px'
}));
type props = {
    children: React.ReactNode;
    title: string;
};
export default function SettingLayout({ children, title }: props) {
    const router = useRouter();
    const [activeStep, setActiveTab] = useState('profile');
    useEffect(() => {
        console.log(router?.pathname, 'router?.pathname');

        switch (router?.pathname) {
            case '/setting/profile/':
                setActiveTab('profile');
                break;
            case '/setting/plans':
                setActiveTab('plans');
                break;
            case '/setting/support':
                setActiveTab('support');
                break;
            case '/setting/orders':
                setActiveTab('orders');
                break;
            default:
                break;
        }
    }, [router.pathname]);
    return (
        <WrapperContainer display="flex" marginTop="50px">
            <SideBarHover maxWidth="200px" items={navItems} />
            
        <Grid container direction="column" alignItems="center">
            {/* <SideBar container direction="column" alignItems="center" maxWidth="fit-content">
                <Link href="/setting/profile">
                    <a>
                        <ProfileIcon active={activeStep === 'profile'} />
                    </a>
                </Link>
                <Link href="/setting/plans">
                    <a>
                        <PlansIcon active={activeStep === 'plans'} />
                    </a>
                </Link>
                <Link href="/setting/support">
                    <a>
                        <SupportIcon active={activeStep === 'support'} />
                    </a>
                </Link>
                <CdnIcon />
                <Link href="/setting/orders">
                    <a>
                        <OrdersIcon active={activeStep === 'orders'} />
                    </a>
                </Link>
            </SideBar> */}
            <TitleContainer container>
                <Typography whiteSpace="nowrap" variant="h5" paddingLeft="100px">
                    {title}
                </Typography>
            </TitleContainer>
            {children}
        </Grid>
        </WrapperContainer>
    );
}
