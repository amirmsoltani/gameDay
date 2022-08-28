import React, { FC, ReactNode, useEffect } from 'react';
import { Box } from '@mui/material';
import * as S from './app-layout-style';
import DashboardIcon from '../../assets/icons/dashboard-icon';
import Link from 'next/link';
import CatalogIcon from '../../assets/icons/catalog-icon';
import JobIcon from '../../assets/icons/job-icon';
import CheckResumeIcon from '../../assets/icons/check-resume-icon';
import InterviewIcon from '../../assets/icons/interview-icon';
import CareerCoachIcon from '../../assets/icons/career-coach-icon';
import UserIcon from '../../assets/icons/user-icon';
import ManagementIcon from '../../assets/icons/management-icon';
import LogoutIcon from '../../assets/icons/logout-icon';
import { useGetCurrentUserQuery, UserRole } from '../../graphql/generated';
import { useRouter } from 'next/router';
import { AppLoadingPage } from '@/components/base/loader/LoadingPage';
import Modals from '@/components/modals';

const bodyItems = {
    dashboard: {
        href: '/dashboard',
        icon: DashboardIcon,
        title: 'Dashboard'
    },
    catalogs: {
        href: '/catalog',
        icon: CatalogIcon,
        title: 'Catalog'
    },
    jobs: {
        href: '#',
        icon: JobIcon,
        title: 'Jobs'
    },
    'check-resume': {
        href: '/',
        icon: CheckResumeIcon,
        title: 'Check resume'
    },
    'interview-practice': {
        href: '/',
        icon: InterviewIcon,
        title: 'Interview practice'
    },
    'career-coach': {
        href: '/',
        icon: CareerCoachIcon,
        title: 'Career coach'
    },
    users: {
        href: '/',
        icon: UserIcon,
        title: 'Users'
    }
};

const footerItems = {
    'admin-management': {
        href: '/',
        icon: ManagementIcon,
        title: 'Admin Management'
    }
};

const filter = (section: 'body' | 'footer') => (item: UserRole) =>
    item.role.title.toLowerCase().replace(/\s/g, '-') in
    (section === 'body' ? bodyItems : footerItems);

const map = (section: 'body' | 'footer', path: string) => (role: UserRole) => {
    const text = role.role.title.toLowerCase().replace(/\s/g, '-');
    const item = section === 'body' ? bodyItems[text] : footerItems[text];

    return (
        <Link href={item.href} key={item.title}>
            <S.SidebarItem
                className={path.includes(item.href) && path !== '/' ? 'active' : undefined}>
                {item.icon()}
                {item.title}
            </S.SidebarItem>
        </Link>
    );
};

type PropsType = { children: ReactNode };

const AppLayout: FC<PropsType> = ({ children }) => {
    const { data, status } = useGetCurrentUserQuery();
    const { asPath } = useRouter();

    if (status === 'loading') {
        return <AppLoadingPage />;
    }

    return (
        <Box display="grid" gridTemplateColumns="repeat(24, 1fr)" gap={0}>
            <S.Sidebar gridColumn={'span 4'}>
                <div className="sidebar-header">
                    <S.LogoBox>
                        <S.Logo resources={{ src: '/images/gd-logo.png' }} />
                        <S.TextLogo resources={{ src: '/images/logo-text.png' }} />
                    </S.LogoBox>
                </div>
                <div className="sidebar-body">
                    {data?.user_login.result?.userRoles
                        .filter(filter('body'))
                        .map(map('body', asPath))}
                </div>
                <div className="sidebar-footer">
                    {data?.user_login.result?.userRoles
                        .filter(filter('footer'))
                        .map(map('footer', asPath))}
                    <S.SidebarItem>
                        <LogoutIcon /> Logout
                    </S.SidebarItem>
                </div>
            </S.Sidebar>
            <S.Content gridColumn="span 20">
                <Modals />
                {children}
            </S.Content>
        </Box>
    );
};

export default AppLayout;
