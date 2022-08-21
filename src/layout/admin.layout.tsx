import { useEffect } from 'react';
import Sidebar from '@/components/sidebar/sidebar';
import Navbar from '@/components/navbar/navbar';
import Modals from '@/components/modals';
import styled from '@emotion/styled';
import { setPageData } from 'src/redux/actions/actions';
import { initialPageData } from 'src/redux/reducer/reducer';
import { useRouter } from 'next/router';
import { getRootPath } from 'src/routes';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
    children: React.ReactNode;
    sidebarItems?: string[];
}

const Main = styled.div({
    position: 'fixed',
    left: 280,
    top: 55,
    right: 0,
    bottom: 0,
    overflow: 'auto',
    padding: '20px 20px',
    '@media(max-width:680px)': {
        left: 0,
        transition: '.4s'
    }
});

export default function MainLayout({ sidebarItems = [], children }: Props) {
    useResetPageData();

    return (
        <>
            <Navbar />
            <Sidebar items={sidebarItems} />
            <Main>{children}</Main>
            <Modals />
        </>
    );
}

function useResetPageData() {
    const dispatch = useDispatch();
    const path = useSelector(({ pageData }: any) => pageData?.path);
    const router = useRouter();
    const dir = getRootPath(router.pathname);

    useEffect(() => {
        if (dir === path) return;

        dispatch(setPageData({ ...initialPageData, path: dir }));
    }, [path, dir]);
}
