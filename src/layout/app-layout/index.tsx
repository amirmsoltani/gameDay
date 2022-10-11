import React, { FC, ReactNode, useCallback, useRef, useState } from 'react';
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
import { LayoutContext } from './layout-context';

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
        href: '/jobs',
        icon: JobIcon,
        title: 'Jobs'
    },
    'check-resume': {
        href: '/check-resume',
        icon: CheckResumeIcon,
        title: 'Check resume'
    },
    'interview-practice': {
        href: '/interview-practice',
        icon: InterviewIcon,
        title: 'Interview practice'
    },
    'career-coach': {
        href: '/career-coach',
        icon: CareerCoachIcon,
        title: 'Career coach'
    },
    users: {
        href: '/users',
        icon: UserIcon,
        title: 'Users'
    }
};

const footerItems = {
    'admin-management': {
        href: '/admin-management',
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

type PropsType = { children: ReactNode; headerContent?: ReactNode };

const AppLayout: FC<PropsType> = ({ children, headerContent }) => {
    const [headerChildren, setHeaderChildren] = useState<ReactNode | null>(null);

    const { data, status } = useGetCurrentUserQuery(undefined, {
        cacheTime: -1,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        keepPreviousData: true
    });
    const { asPath } = useRouter();

    if (status === 'loading') {
        return <AppLoadingPage />;
    }

    return (
        <LayoutContext.Provider value={{ setChildren: setHeaderChildren }}>
            <S.Container
                display="grid"
                gridTemplateColumns="repeat(24, 1fr)"
                gridTemplateRows="repeat(12, 1fr)"
                gap={0}>
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
                <S.Content gridColumn="span 20" gridTemplateRows="repeat(12, 1fr)" display={'grid'}>
                    <Modals />
                    <S.Header gridRow={'span 1'}>{headerContent || headerChildren}</S.Header>
                    <S.Body gridRow={'span 11'}>{children}</S.Body>
                </S.Content>
            </S.Container>
        </LayoutContext.Provider>
    );
};

export default AppLayout;
