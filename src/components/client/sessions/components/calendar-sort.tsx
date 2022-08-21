import Calendar from '@/components/calendar';
import Card from '@/components/cards/card';
import { Grid,CircularProgress } from '@mui/material';
import { useState } from 'react'
import { DateObject } from 'react-multi-date-picker';
import { useBooking_GetAllBookingsQuery, SortEnumType } from 'src/graphql/generated';
import { useGetUser } from "src/auth/UserProvider";
import { getFullImageUrl } from '@/utils/helper/ui';


const CalendarSort = () => {
    const user = useGetUser();
    const [value, setValue] = useState(new Date());

    const { data, isLoading } = useBooking_GetAllBookingsQuery(
        {
            take: 50,
            skip: 0,
            order: { createdDate: SortEnumType.Desc },
            where: {
                and: [
                    { visitorId: { eq: Number(user?.id) } },
                    { createdDate: { gt: new DateObject(value).format(), lt: new DateObject(value).add(1, 'day').format() } },
                    {session:{isClosed:{eq:false}}}
                ]
            }
        }
    );
    const items = data?.booking_getAllBookings?.result?.items;

    return (
        <Grid container pb={10}>
            <Grid item xs={12} lg={6}>
                <Calendar value={value} setValue={setValue} />
            </Grid>
            <Grid item xs={12} lg={6} sx={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                {
                    isLoading ? <CircularProgress /> :
                        items?.map((item, index) => {
                            return (
                                <Card
                                    key={index}
                                    buttonLabel="See More"
                                    rating={true}
                                    path={`/healing/session/details/?sessionid=${item?.sessionId}`}
                                    event={item?.session?.eventType}
                                    imageUrl={getFullImageUrl(item?.session?.sessionImages[0]?.imageAddress)}
                                    title={(item?.session?.title) || '----'}
                                    healerName={item?.session?.host?.user?.name}
                                    ID={item?.session?.id}
                                    healingType={item?.session?.healingType?.title}
                                    price={item?.session?.cost}
                                    duration={item?.session?.duration}
                                    Status={item?.session?.onlineStatus}
                                    record={item?.session?.isRecordable}
                                    description={item?.session?.description || '-----'}
                                />
                            )
                        })
                }
            </Grid>
        </Grid>
    );
};

export default CalendarSort;
