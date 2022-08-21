import { ReactNode } from 'react';
import Navbar from '@/components/navbar/navbar';
import Footer from '@/components/footer';
import styled from '@emotion/styled';
import { Typography, Rating, useMediaQuery, Box } from '@mui/material';
import BaseLayout from './base.layout';
import { useTheme } from '@mui/material';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { Spacer } from '@/components/base/spacer';
import { MImage } from '@/components/base/image/MImage';
import { useRouter } from 'next/router';
import { useUserLoginOrNot } from 'src/auth/useRedirectOnToken';
import { useGetUser } from 'src/auth/UserProvider';
import { useDispatch, useSelector } from 'react-redux';
import CalenderDate from 'src/assets/icons/calender-date';
import { newModal } from 'src/redux/actions/actions';
import CalenderHealer from '@/components/shared/modal/calender-healer';
import { CircularProgress } from '@mui/material';

const Main = styled.main(({ hasSearch, hasMenu }: { hasSearch: boolean; hasMenu: boolean }) => ({
    marginTop: hasMenu ? '80px' : 0,
    background: 'white',
    '@media(max-width: 570px)': { marginTop: hasSearch ? 115 : 70 }
}));

const Section = styled.section({ minHeight: '40vh' });

const HeaderContainer = styled.header({ position: 'relative' });

const HeaderDescription = styled(Typography)({
    marginLeft: '40px',
    fontWeight: 'bold',
    '@media(max-width:900px)': {
        textAlign: 'justify',
        marginLeft: '0px',
        fontSize: '1.4rem'
    },
    '@media(max-width:700px)': {
        textAlign: 'justify',
        marginLeft: '0px',
        fontSize: '1.2rem'
    },
    '@media(max-width:480px)': {
        textAlign: 'justify',
        marginLeft: '0px',
        fontSize: '1rem'
    }
});

const CustomImage = styled(MImage)(({ theme }) => ({
    position: 'absolute',
    left: '30px',
    bottom: '-15%',
    borderRadius: '50%',
    width: '20vw',
    height: '20vw',
    maxWidth: '230px',
    maxHeight: '230px',
    minWidth: '120px',
    minHeight: '120px',
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}));

const HeadaerText = styled.div(
    ({ position, top = '50%', home }: { position: string; top: string; home: string }) => ({
        position: 'absolute',
        right: home === 'true' ? '8%' : 0,
        left: home === 'true' ? null : '8%',
        fontWeight: 'bold',
        top,
        transform: `translateY(-${top})`,
        maxWidth: '380px',
        '@media(max-width:900px)': {
            top: home === 'true' ? '80%' : '25%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            width: '70%',
            maxWidth: '100%',
            left: '5%'
        }
    })
);

const BackgroundImage = styled.img(({ maxHeight }: { maxHeight: string }) => ({
    width: '100%',
    maxHeight,
    minHeight: '250px',
    objectFit: 'cover'
}));
const SlideContainer = styled.div(({ index }: { index: number }) => ({
    width: '100%',
    minHeight: '440px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: index % 2 === 0 ? 'flex-start' : 'flex-end'
}));
const SlideImage = styled.img(({ maxHeight, index }: { maxHeight?: string; index?: number }) => ({
    width: '100%',
    maxHeight,
    maxWidth: '260px',
    objectFit: 'cover',
    marginTop: `${index * 30}px`
}));

const DescriptionBox = styled(Box)(() => ({
    position: 'absolute',
    bottom: '5%',
    top: '53%',
    width: '50%',
    left: '9%',
    '@media(max-width: 900px)': {
        position: 'absolute',
        bottom: '5%',
        top: 'auto',
        width: '80%',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(250, 250, 250, 0.6)',
        borderRadius: 30,
        backdropFilter: 'blur(2px)',
        padding: 10
    }
}));

type Props = {
    children: ReactNode;
    title?: string;
    description?: string;
    rate?: number;
    imageUrl?: string;
    phoneImageUrl?: string;
    headline?: string;
    profileUrl?: string;
    withoutFooter?: boolean;
    withoutHeader?: boolean;
    imageSlider?: Array<string>;
    isLoading?: boolean;
};

export default function MainLayout({
    children,
    withoutFooter = false,
    withoutHeader = false,
    isLoading = false,
    ...rest
}: Props) {
    const router = useRouter();
    useUserLoginOrNot();
    const user = useGetUser();
    let hasSearch = false;
    if (
        (router.pathname === '/healing' ||
            router.pathname === '/healers' ||
            router.asPath.includes('/healers/healer/') ||
            router.asPath.includes('/healing/session/')) &&
        typeof user === 'string'
    ) {
        hasSearch = true;
    }
    return (
        <BaseLayout>
            {!withoutHeader && <Navbar />}

            <Main hasSearch={hasSearch} hasMenu={!withoutHeader}>
                {rest.imageUrl && <Header {...rest} />}
                <Section>{children}</Section>
            </Main>
            {!withoutFooter && <Footer />}
        </BaseLayout>
    );
}

function Header({
    title = '',
    imageUrl = '',
    description = '',
    rate = undefined,
    headline = '',
    profileUrl = '',
    phoneImageUrl = '',
    imageSlider = []
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter();
    const dispatch = useDispatch();

    const handleShowCalender = () => {
        dispatch(
            newModal({
                id: 'calender',
                closeButton: true,
                topBar: true,
                Body: CalenderHealer
            })
        );
    };

    return (
        <HeaderContainer>
            <HeadaerText
                position={'left'}
                top={profileUrl ? '5%' : '50%'}
                home={String(router.pathname === '/')}>
                <Typography
                    fontSize={60}
                    fontFamily="Yeseva One"
                    style={{
                        fontSize: matches ? '24px' : '60px',
                        marginLeft: router.pathname === '/' && matches ? '80px' : 0,
                        ...(matches && { textAlign: 'center', alignSelf: 'center' })
                    }}
                    fontWeight={'bold'}
                    whiteSpace={router.pathname === '/' ? 'wrap' : 'nowrap'}>
                    {title || headline}
                </Typography>
                {rate !== undefined && (
                    <Box display="flex" alignItems="end">
                        <Rating value={rate} style={{ marginTop: '10px' }} readOnly />
                        <Spacer space={3} />
                        <Typography color="#a3a3a2">{rate}</Typography>
                    </Box>
                )}
            </HeadaerText>
            {description && (
                <DescriptionBox mt={3}>
                    <HeaderDescription variant="body1">{description}</HeaderDescription>
                </DescriptionBox>
            )}
            {imageSlider.length > 0 ? (
                <ImageSlide imageSlider={imageSlider} />
            ) : (
                <>
                    <BackgroundImage
                        src={matches ? phoneImageUrl : imageUrl}
                        alt="healing"
                        maxHeight={profileUrl ? '550px' : undefined}
                    />
                    {router.pathname === '/healers/healer' ? (
                        <div
                            onClick={handleShowCalender}
                            style={{
                                position: 'absolute',
                                bottom: isSmall ? 80 : 20,
                                right: 25,
                                backgroundColor: 'red',
                                padding: '5px 10px',
                                cursor: 'pointer',
                                background: 'rgba(255, 255, 255, 0.2)',
                                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                                backdropFilter: 'blur(5px)',
                                WebkitBackdropFilter: 'blur(5px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)'
                            }}>
                            <CalenderDate />
                        </div>
                    ) : null}
                </>
            )}
            {profileUrl && (
                <CustomImage
                    resources={{
                        src: profileUrl,
                        fallback: '/images/empty_profile.png'
                    }}
                />
            )}
        </HeaderContainer>
    );
}

function ImageSlide({ imageSlider, isLoading }) {
    return isLoading ? (
        <CircularProgress />
    ) : (
        <Swiper
            centeredSlides
            loop={true}
            loopAdditionalSlides={imageSlider?.length + 1}
            mousewheel={{ releaseOnEdges: true, sensitivity: 1, thresholdTime: 200 }}
            modules={[Autoplay]}
            autoplay={{
                delay: 0.2
            }}
            speed={7000}
            centerInsufficientSlides
            style={{ padding: '40px 0', backgroundColor: '#CDE5FC', minHeight: 599 }}
            breakpoints={{
                0: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                900: {
                    slidesPerView: 3.2,
                    spaceBetween: 20
                }
            }}>
            {imageSlider.map((item, index) => (
                <SwiperSlide key={index}>
                    <SlideContainer index={index}>
                        <SlideImage index={index + 1} src={item} />
                    </SlideContainer>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
