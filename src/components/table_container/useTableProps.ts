import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setPageData,resetChatCount } from 'src/redux/actions/actions';

export function useInitialProps(data?: { totalCount?: number,totalRows?:number,tabs?:{},tabsParent?:{} }) {
    const pageData = useSelector(({ pageData }: any) => pageData);
    const {activeTabParent} = useSelector(({ pageData }: any) => pageData);
    const dispatch = useDispatch();
    const router = useRouter()

    const { totalRows = data.totalRows ? data.totalRows : 5, activePage } = pageData;
    const { totalCount = 0 } = data;

    React.useEffect(()=>{
        updatePageData({
            activePage: 1,
            // activeTabParent:data.tabsParent ? data.tabsParent : [],
            // activeTab:data.tabs ? data.tabs : []
        })
    },[router])

    React.useEffect(()=>{
        updatePageData({
            sortData: { Sort: 'Sort' }
        })
    },[pageData?.sessionId])

    React.useEffect(()=>{
        activeTabParent?.id === "chat" &&  dispatch(resetChatCount());
    },[activeTabParent])
 
    return {
        ...pageData,
        onTabChange: (tab) => updatePageData({ activeTab: tab, activePage: 1 }),
        onTabChangeParent: (tab) => updatePageData({ activeTabParent: tab, activePage: 1,sessionItem:'',sessionId:'',clientRequest :false }),
        onPageChange: (pageNumber) => updatePageData({ activePage: pageNumber }),
        totalPages: Math.ceil((totalCount || 1) / totalRows),
        activePage
    };

    function updatePageData(data) {
        dispatch(setPageData({ ...pageData, ...data }));
    }
}
