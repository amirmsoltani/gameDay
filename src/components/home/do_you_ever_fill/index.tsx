import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, styled, Typography, useMediaQuery, useTheme } from '@mui/material';
import Slide from './slide';
import { useEffect, useRef, useState } from 'react';
import next from 'next';
type SlideType = {
    id: number;
    path: string;
    imageUrl: string;
    description: string;
};
const ScrollSection = styled('div')(({ theme }) => ({
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexWrap: 'nowrap',
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}));
const SwiperSection = styled('div')(({ theme }) => ({
    width: '100%',
    display: 'flex',
    [theme.breakpoints.up('md')]: {
        display: 'none'
    }
}));
const Title = styled('h4')({
    fontSize: '40px',
    position: 'relative',
    top: '3vw',
    left: '3.8vw'
});

export default function Slider() {
    const [mouseWheel, setMouseWheel] = useState(false);
    const scrollTarget = useRef<HTMLDivElement>(null);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const options = [
        {
            id: 1,
            path: '/',
            imageUrl: './images/home_slide_1.png',
            description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            Lorem ipsum dolor sit amet  sadipscing elitr, sed diam nonumy eirmod`
        },
        {
            id: 2,
            path: '/',
            imageUrl: './images/home_slide_2.png',
            description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            Lorem ipsum dolor sit amet  sadipscing elitr, sed diam nonumy eirmod`
        },
        {
            id: 3,
            path: '/',
            imageUrl: './images/home_slide_1.png',
            description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            Lorem ipsum dolor sit amet  sadipscing elitr, sed diam nonumy eirmod`
        },
        {
            id: 4,
            path: '/',
            imageUrl: './images/home_slide_2.png',
            description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            Lorem ipsum dolor sit amet  sadipscing elitr, sed diam nonumy eirmod`
        }
    ];
    function useHorizontalScroll() {
        const elRef = useRef<any>();
        useEffect(() => {
            const el = elRef.current;
            let section = 0;
            let time = 2800;
            if (el) {
                const onWheel = (e) => {
                    // console.log(e);
                    if (
                        e.deltaY == 0 ||
                        (e.deltaY > 0 && Math.abs(section) + 1 === options.length) ||
                        (e.deltaY < 0 && section === 0)
                    )
                        return;
                    if (
                        window.pageYOffset < 0.73 * window.innerWidth ||
                        window.pageYOffset > 0.97 * window.innerWidth
                    )
                        return;

                    e.preventDefault();
                    if (e.deltaY > 0 && e.timeStamp > 1000 + time) {
                        section -= 1;
                        // scrollTarget.current.style.transition = 'transform 1200ms ease-out';
                        // scrollTarget.current.style.transform = `translateX(${
                        //     section * window.innerWidth
                        // }px)`;
                        nextSlide(section);
                        time = e.timeStamp;
                    } else if (e.deltaY < 0 && e.timeStamp > 1000 + time) {
                        section += 1;
                        // scrollTarget.current.style.transition = 'transform 1200ms ease-out';
                        // scrollTarget.current.style.transform = `translateX(${
                        //     section * window.innerWidth
                        // }px)`;
                        previousSlide(section);
                        time = e.timeStamp;
                    }
                };
                window.addEventListener('wheel', onWheel, { passive: false });
                return () => window.removeEventListener('wheel', onWheel);
            }
        }, []);
        return elRef;
    }
    const scrollRef = useHorizontalScroll();
    const [currentSlide, setCurrentSlide] = useState<SlideType>();
    useEffect(() => {
        setCurrentSlide(options[0]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const nextSlide = (section: number) => {
        console.log(section);
        setCurrentSlide(options[-section]);
    };
    const previousSlide = (section: number) => {
        setCurrentSlide(options[-section]);
    };
    return (
        <Grid container>
            <Typography variant="h4" sx={{ margin: '60px 25px 0px 25px' }}>
                Do You Ever Feel Like …
            </Typography>
            <ScrollSection ref={scrollRef}>
                <Grid container ref={scrollTarget} wrap="nowrap">
                    <Slide
                        index={options.findIndex((object) => {
                            return object.id === currentSlide?.id;
                        })}
                    />
                </Grid>
            </ScrollSection>
            <SwiperSection>
                {/* <Swiper 
                    slidesPerView={1}
                    spaceBetween={10}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 10
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 15
                        }
                    }}>
                    {options.map((item, index) => (
                        <SwiperSlide key={item.id}>
                            <Slide
                                imageUrl={item.imageUrl}
                                index={index}
                                description={item.description}
                                path={item.path}
                            />
                        </SwiperSlide>
                    ))}
                 </Swiper> */}
            </SwiperSection>
        </Grid>
    );
}
