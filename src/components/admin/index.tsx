import TableContainer from 'src/components/table_container';
import { ColumnHealerPending, ColumnHealerApprove, ColumnFinancial, ColumnClient, tabs, tabsParent } from './data_type';
import { useRouter } from 'next/router';
import { useInitialProps } from '@/components/table_container/useTableProps';
import { setPageData } from 'src/redux/actions/actions';
import { connect } from 'react-redux';
import BasicSelect from '../shared/basic-select';
import Dashboard from './Dashboard';
import { ActiveStatus, SessionUserStatus, SortEnumType, useBooking_GetAllBookingsQuery, UserTypes, useUser_GetUsersQuery } from 'src/graphql/generated';
import { capitalizeFirstString } from '@/utils/helper/capitalize';

function Index({ pageData, setPageData }) {
    const router = useRouter();
    const { activePage = 1, activeTab = tabs[0], activeTabParent = tabsParent[0] } = pageData;
    const { data, isLoading } = useUser_GetUsersQuery({
        take: 10,
        skip: (activePage - 1) * 10,
        where: activeTabParent.id === "healers" ? activeTab.id === "pending" ? {
            and: [
                { activeStatus: { eq: ActiveStatus.Pending } },
                { userTypes: { eq: UserTypes.Healer } },
                pageData?.searchdata !== "" && { healer: { user: { name: { contains: pageData.searchdata } } } }
            ].filter(Boolean)
        } :
            {
                and: [
                    { activeStatus: { eq: ActiveStatus.Accepted } },
                    { userTypes: { eq: UserTypes.Healer } },
                    pageData?.searchdata !== "" && { healer: { user: { name: { contains: pageData.searchdata } } } }
                ].filter(Boolean)
            } :
            {
                and: [
                    { userTypes: { eq: UserTypes.Client } },
                    pageData?.searchdata !== "" && { client: { user: { name: { contains: pageData.searchdata } } } }
                ].filter(Boolean)
            },
        order: { id: SortEnumType.Desc }
    }, {
        keepPreviousData: true,
        enabled: (activeTabParent.id === "healers" || activeTabParent.id === "client")
    });
    const itemsUsers = data?.user_getUsers?.result?.items;
    const RowHealerPending = itemsUsers?.map((item) => ({
        image: item?.imageAddress,
        healerame: item?.name,
        healertype: item?.userHealingTypeInterfaces[0]?.healingType?.title,
        gender: capitalizeFirstString(item?.genders),
        phonenumber: item?.phoneNumber,
        options: item?.id
    }))
    const RowHealerApprove = itemsUsers?.map((item) => {
        const arr = []
        item?.healer?.bookings?.map((item) => arr.push(item?.sessionId))
        return ({
            image: item?.imageAddress,
            healerame: item?.name,
            healertype: item?.userHealingTypeInterfaces[0]?.healingType?.title,
            gender: capitalizeFirstString(item?.genders),
            phonenumber: item?.phoneNumber,
            num: [... new Set(arr)].length,
            options: item?.id
        })
    })
    const RowClient = itemsUsers?.map((item) => ({
        image: item?.imageAddress,
        clientname: item?.name,
        gender: capitalizeFirstString(item?.genders),
        phonenumber: item?.phoneNumber,
        options: item?.id
    }))
    const { data: dataBooking, isLoading: loadingBooking } = useBooking_GetAllBookingsQuery({
        take: 10,
        skip: (activePage - 1) * 10,
        where: {
            and: [
                { status: { eq: SessionUserStatus.Accepted } },
                pageData?.searchdata !== "" && {
                    or: [
                        { session: { host: { user: { name: { contains: pageData.searchdata } } } } },
                        { visitor: { name: { contains: pageData.searchdata } } },
                    ].filter(Boolean)
                }
            ].filter(Boolean)
        },
        order: [
            (pageData.sortData.Sort == 'ld' || pageData.sortData.Sort == 'md') && {
                session:{duration: pageData.sortData.Sort === 'ld' ? SortEnumType.Asc : SortEnumType.Desc}
            },
            (pageData.sortData.Sort == 'lb' || pageData.sortData.Sort == 'mb') && {
                session: {cost:pageData.sortData.Sort === 'lb' ? SortEnumType.Asc : SortEnumType.Desc}
            },
            { id: SortEnumType.Desc }
        ].filter(Boolean)
    }, {
        keepPreviousData: true,
        enabled: (activeTabParent.id === "financial")
    });
    const itemsBookings = dataBooking?.booking_getAllBookings?.result?.items;
    const RowFinancial = itemsBookings?.map((item) => ({
        clientname: item?.visitor?.name,
        session: item?.session?.title,
        duration: `${item?.session?.duration} Day`,
        healername: item?.session?.host?.user?.name,
        healerstatus: capitalizeFirstString(item?.session?.host?.user?.activeStatus),
        cost: `$ ${item?.payments?.map((payment) => payment?.amount)?.reduce((a, b) => a + b, 0)}`,
    }));
    const initialProps = useInitialProps({
        totalCount: (activeTabParent.id === "healers" || activeTabParent.id === "client") ? data?.user_getUsers?.result?.totalCount : dataBooking?.booking_getAllBookings?.result?.totalCount,
        totalRows: 10
    });

    const props = {
        ...initialProps,
        columns: activeTabParent.id === "client" ? ColumnClient : activeTabParent.id === "financial" ? ColumnFinancial : (activeTab.id === "pending" && activeTabParent.id === "healers") ? ColumnHealerPending : (activeTab.id === "approved" && activeTabParent.id === "healers") ? ColumnHealerApprove : [],
        rows: activeTabParent.id === "client" ? RowClient : activeTabParent.id === "financial" ? RowFinancial : activeTab.id === "pending" ? RowHealerPending : activeTab.id === "approved" ? RowHealerApprove : [],
        tabs: activeTabParent.id === "healers" ? tabs : [],
        tabsParent,
        activeTab,
        activeTabParent,
        sortInput: activeTabParent.id == "financial" ? <BasicSelect /> : null,
        isLoading: isLoading || loadingBooking,
        adminLayout: true,
        centerItem: true,
    };

    return <TableContainer  {...props} >{activeTabParent.id === "dashboard" && <Dashboard />}</TableContainer>
}

const mapStateToProps = ({ pageData }) => ({ pageData });

const mapDispatchToProps = { setPageData };

export default connect(mapStateToProps, mapDispatchToProps)(Index);
