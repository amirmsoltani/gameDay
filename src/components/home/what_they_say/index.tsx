import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper';
import Slide from './slide';
import { Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useMemo } from 'react';
export default function Slider() {
    const options = useMemo(() => {
        return [
            {
                id: 1,
                imageUrl: './images/what_they_say.png',
                description: [
                    {
                        id: 101,
                        text: 'Lorem ipsum dolor sit amet, consetetur'
                    },
                    {
                        id: 102,
                        text: 'sadipscing elitr, sed diam nonumy eirmod'
                    },
                    {
                        id: 103,
                        text: 'Lorem ipsum dolor sit amet  sadipscing elitr,'
                    },
                    {
                        id: 104,
                        text: 'sed diam nonumy eirmod'
                    }
                ]
            },
            {
                id: 2,
                imageUrl: './images/what_they_say.png',
                description: [
                    {
                        id: 201,
                        text: 'Lorem ipsum dolor sit amet, consetetur'
                    },
                    {
                        id: 202,
                        text: 'sadipscing elitr, sed diam nonumy eirmod'
                    },
                    {
                        id: 203,
                        text: 'Lorem ipsum dolor sit amet  sadipscing elitr,'
                    },
                    {
                        id: 204,
                        text: 'sed diam nonumy eirmod'
                    }
                ]
            },
            {
                id: 3,
                imageUrl: './images/what_they_say.png',
                description: [
                    {
                        id: 101,
                        text: 'Lorem ipsum dolor sit amet, consetetur'
                    },
                    {
                        id: 102,
                        text: 'sadipscing elitr, sed diam nonumy eirmod'
                    },
                    {
                        id: 103,
                        text: 'Lorem ipsum dolor sit amet  sadipscing elitr,'
                    },
                    {
                        id: 104,
                        text: 'sed diam nonumy eirmod'
                    }
                ]
            },
            {
                id: 4,
                imageUrl: './images/what_they_say.png',
                description: [
                    {
                        id: 201,
                        text: 'Lorem ipsum dolor sit amet, consetetur'
                    },
                    {
                        id: 202,
                        text: 'sadipscing elitr, sed diam nonumy eirmod'
                    },
                    {
                        id: 203,
                        text: 'Lorem ipsum dolor sit amet  sadipscing elitr,'
                    },
                    {
                        id: 204,
                        text: 'sed diam nonumy eirmod'
                    }
                ]
            }
        ];
    }, []);
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Grid
            container
            justifyContent="center"
            sx={(theme) => ({
                position: 'relative',
                marginBottom: '7vw',
                '& .swiper': {
                    display: 'flex',
                    width: '100%',
                    height: '50vw'
                },
                '& .swiper-slide': {
                    display: 'flex',
                    paddingLeft: 3
                },
                '& .swiper-pagination-bullets': {
                    right: '12vw !important'
                },
                '& .swiper-pagination-bullet': {
                    width: '15px !important',
                    height: '15px !important',
                    backgroundColor: '#ffffff',
                    border: '1px solid #3E205A',
                    opacity: '1 !important'
                },
                '& .swiper-pagination-bullet-active': {
                    backgroundColor: theme.palette.primary.main,
                    border: '1px solid #3E205A'
                }
            })}>
            <Stack width="100%" alignItems={'flex-start'}>
                <Typography
                    variant="h4"
                    sx={{
                        fontSize: '40px',
                        marginLeft: '70px',
                        top: isSmall ? -10 : -70
                    }}>
                    What They Say …
                </Typography>
            </Stack>
            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                centeredSlides
                direction={'vertical'}
                pagination={{ clickable: true }}
                modules={[Mousewheel, Pagination]}
                mousewheel={{ releaseOnEdges: true, sensitivity: 1, thresholdTime: 100 }}
                breakpoints={{
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    900: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    }
                }}>
                {options.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Slide imageUrl={item.imageUrl} description={item.description} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Grid>
    );
}
