import Card from "@/components/cards/card";
import { CircularProgress, Grid } from "@mui/material";
import { useSelector,useDispatch } from "react-redux";
import { useGetUser } from "src/auth/UserProvider";
import { SortEnumType, useBooking_GetAllBookingsQuery } from "src/graphql/generated";
import Pagination from '@/components/table/pagination/pagination';
import { setPageData } from "src/redux/actions/actions";
import { getFullImageUrl } from "@/utils/helper/ui";


const SessionSort = () => {
    const dispatch = useDispatch();
    const user = useGetUser();
    const pageData = useSelector(({ pageData }: any) => pageData);
    const { activePage = 1 } = pageData;
    const { data, isLoading } = useBooking_GetAllBookingsQuery({  take: 8,skip: (activePage - 1) * 8,order:{session:{isClosed:SortEnumType.Asc}} , where: { visitorId: { eq: Number(user?.id) } } });
    const totalPages = Math.ceil((data?.booking_getAllBookings?.result?.totalCount || 8) / 8);
    const items = data?.booking_getAllBookings?.result?.items;

    return (
        <>
            <Grid container item flexDirection='row' spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                {
                    isLoading ? <CircularProgress />:
                    items?.map((item,index)=>{
                        return (
                            <Grid item md={3} xs={12} key={index}>
                                <Card
                                    buttonLabel="See More"
                                    path={`/healing/session/details/?sessionid=${item?.session?.id}`}
                                    imageUrl={getFullImageUrl(item?.session?.sessionImages[0]?.imageAddress)}
                                    title={(item?.session?.title) || '----'}
                                    healingType={item?.session?.healingType?.title}
                                    price={item?.session?.cost}
                                    event={item?.session?.eventType}
                                    rating={true}
                                    healerName={item?.session?.host?.user?.name}
                                    ID={item?.session?.id}
                                    duration={item?.session?.duration}
                                    Status={item?.session?.onlineStatus}
                                    record={item?.session?.isRecordable}
                                    description={item?.session?.description || '-----'}
                                />
                            </Grid>
                        )
                    })
                }   
            </Grid>
            <div style={{ margin: '0 auto' }}>
                <Pagination activePage={activePage || 1} totalPages={totalPages || 1} onPageChange={(pageNumber) => dispatch(setPageData({ ...pageData, activePage: pageNumber }))} />
            </div>
        </>
    );
};

export default SessionSort;