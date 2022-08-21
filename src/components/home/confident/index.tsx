import { getFullImageUrl } from '@/utils/helper/ui';
import { Button, Grid, Typography, styled, useTheme, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { EventType, SortEnumType, useSession_GetAllSessionsQuery } from 'src/graphql/generated';
import { CircularProgress } from '@mui/material';

const SessionButton = styled(Button)(({ theme }) => ({
    borderRadius: '20px',
    marginTop: 2,
    width: '45%',
    maxWidth: 200,
    minWidth: 115,
    borderColor: theme.palette.primary.dark,
    color: theme.palette.primary.dark,
    '@media(min-width:1440px)': {
        fontSize: 15
    },
    '@media(min-width:1680px)': {
        fontSize: 17
    },
    '@media(min-width:1920px)': {
        fontSize: 20
    }
}));

const SessionTitle = styled(Typography)(({ theme }) => ({
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
    '@media(min-width:1140px)': {
        fontSize: 16
    },
    '@media(min-width:1440px)': {
        fontSize: 18
    },
    '@media(min-width:1680px)': {
        fontSize: 22
    }
}));

const SessionDescription = styled(Typography)(({ theme }) => ({
    fontSize: 11,
    '@media(min-width:1140px)': {
        fontSize: 12
    },
    '@media(min-width:1280px)': {
        fontSize: 14
    },
    '@media(min-width:1440px)': {
        fontSize: 17
    },
    '@media(min-width:1680px)': {
        fontSize: 20
    }
}));

function Confident() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const router = useRouter()
    const data = [
        {
            id: 1,
            title: 'Yoga Session',
            description:
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod Lorem ipsum dolor sit amet  sadipscing elitr, sed diam nonumy eirmod'
        },
        {
            id: 2,
            title: 'Yoga Session',
            description:
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod Lorem ipsum dolor sit amet  sadipscing elitr, sed diam nonumy eirmod'
        },
        {
            id: 3,
            title: 'Yoga Session',
            description:
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod Lorem ipsum dolor sit amet  sadipscing elitr, sed diam nonumy eirmod'
        }
    ];

    const {data:dataAllSessions,isLoading} = useSession_GetAllSessionsQuery({skip:0,take:3,where:{and:[{eventType:{eq:EventType.GeneralEvent}},{isClosed:{eq:false}}].filter(Boolean)},order:{createdDate:SortEnumType.Desc}});
    const items = dataAllSessions?.session_getAllSessions?.result?.items;

    return (
        <Grid
            container
            justifyContent="center"
            sx={(theme) => ({
                position: 'relative',
                [theme.breakpoints.down('md')]: { display: 'none' }
            })}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 1440 758">
                <defs>
                    <linearGradient
                        id="linear-gradient"
                        x1="0.5"
                        x2="0.494"
                        y2="1"
                        gradientUnits="objectBoundingBox">
                        <stop offset="0" stopColor="#bedcf8" />
                        <stop offset="1" stopColor="#eff5fc" />
                    </linearGradient>
                    <pattern
                        id="pattern"
                        preserveAspectRatio="xMidYMid slice"
                        width="100%"
                        height="100%"
                        viewBox="0 0 421 281">
                        <image width="421" height="281" href={!isLoading ? items[0]?.sessionImages?.length > 0 ? getFullImageUrl(items[0]?.sessionImages[0]?.imageAddress) :"./images/confident_2.png" : "./images/confident_2.png"} />
                    </pattern>
                    <pattern
                        id="pattern-2"
                        preserveAspectRatio="xMidYMid slice"
                        width="100%"
                        height="100%"
                        viewBox="0 0 421 280">
                        <image width="421" height="280" href={!isLoading ? items[1]?.sessionImages?.length > 0 ? getFullImageUrl(items[1]?.sessionImages[0]?.imageAddress) :"./images/confident_2.png" : "./images/confident_2.png"} />
                    </pattern>
                    <pattern
                        id="pattern-3"
                        preserveAspectRatio="xMidYMid slice"
                        width="100%"
                        height="100%"
                        viewBox="0 0 421 281">
                        <image width="421" height="281" href={!isLoading ? items[2]?.sessionImages?.length > 0 ? getFullImageUrl(items[2]?.sessionImages[0]?.imageAddress) :"./images/confident_2.png" : "./images/confident_2.png"} />
                    </pattern>
                </defs>
                <g id="Group_23870" data-name="Group 23870" transform="translate(0 -2663)">
                    <rect
                        id="Rectangle_17115"
                        data-name="Rectangle 17115"
                        width="1440"
                        height="628"
                        transform="translate(0 2663)"
                        fill="url(#linear-gradient)"
                    />
                    <text
                        id="feel_confident_in_no_time"
                        data-name="feel confident in no time"
                        transform="translate(55 2696)"
                        fill="#213950"
                        fontSize="40"
                        fontFamily="SegoeUI, Segoe UI">
                        <tspan x="0" y="43">
                            Feel Confident In No Time
                        </tspan>
                    </text>
                    <path
                        id="Union_4"
                        data-name="Union 4"
                        d="M7066-4040.151v-396.8c0-120.425,94.692-218.052,211.5-218.052s211.5,97.627,211.5,218.052v396.8Z"
                        transform="translate(-7030 7461.001)"
                        fill="#fff"
                    />
                    <path
                        id="Union_4-2"
                        data-name="Union 4"
                        d="M7066-4040.151v-396.8c0-120.425,94.692-218.052,211.5-218.052s211.5,97.627,211.5,218.052v396.8Z"
                        transform="translate(-6556 7461.001)"
                        fill="#fff"
                    />
                    <path
                        id="Union_4-3"
                        data-name="Union 4"
                        d="M7066-4040.151v-396.8c0-120.425,94.692-218.052,211.5-218.052s211.5,97.627,211.5,218.052v396.8Z"
                        transform="translate(-6082 7461.001)"
                        fill="#fff"
                    />
                    <rect
                        id="sound-mind-body-peaceful-happy-attractive-female-with-red-hair-freckles-close-eyes-smile-from-calm-relieved-feelings-as-meditating-lotus-pose-with-mudra-gesture-doing-yoga"
                        width="421"
                        height="281"
                        transform="translate(985 3139)"
                        fill="url(#pattern)"
                    />
                    <rect
                        id="sound-mind-body-peaceful-happy-attractive-female-with-red-hair-freckles-close-eyes-smile-from-calm-relieved-feelings-as-meditating-lotus-pose-with-mudra-gesture-doing-yoga-2"
                        data-name="sound-mind-body-peaceful-happy-attractive-female-with-red-hair-freckles-close-eyes-smile-from-calm-relieved-feelings-as-meditating-lotus-pose-with-mudra-gesture-doing-yoga"
                        width="421"
                        height="280"
                        transform="translate(511 3140)"
                        fill="url(#pattern-2)"
                    />
                    <rect
                        id="sound-mind-body-peaceful-happy-attractive-female-with-red-hair-freckles-close-eyes-smile-from-calm-relieved-feelings-as-meditating-lotus-pose-with-mudra-gesture-doing-yoga-3"
                        data-name="sound-mind-body-peaceful-happy-attractive-female-with-red-hair-freckles-close-eyes-smile-from-calm-relieved-feelings-as-meditating-lotus-pose-with-mudra-gesture-doing-yoga"
                        width="421"
                        height="281"
                        transform="translate(37 3140)"
                        fill="url(#pattern-3)"
                    />
                    <g id="Group_23001" data-name="Group 23001">
                        <path
                            id="Path_41019"
                            data-name="Path 41019"
                            d="M-9728.12,2102.79s42.128-29.144,29.039-78.82-125.857-95.069-287.745-64.072c-180.977,48.763-193.141,144.885-188.151,166.034s13.913,26.657,27.378,35.23"
                            transform="translate(10656.184 878.031)"
                            fill="none"
                            stroke="#a587c2"
                            strokeWidth="1.4"
                        />
                        <path
                            id="Path_41027"
                            data-name="Path 41027"
                            d="M1551.332,223.762c-21.208,1.749-22.626,3.167-24.376,24.376-1.75-21.208-3.167-22.627-24.376-24.376,21.209-1.749,22.626-3.168,24.376-24.376C1528.705,220.595,1530.124,222.013,1551.332,223.762Z"
                            transform="translate(-587.574 2651.425)"
                            fill="#a587c2"
                        />
                        <path
                            id="Path_41032"
                            data-name="Path 41032"
                            d="M1514.2,205.194c-5.053.417-5.391.755-5.808,5.808-.417-5.053-.755-5.391-5.808-5.808,5.053-.417,5.391-.755,5.808-5.808C1508.8,204.439,1509.143,204.777,1514.2,205.194Z"
                            transform="translate(-587.574 2659.998)"
                            fill="#a587c2"
                        />
                        <path
                            id="Path_41033"
                            data-name="Path 41033"
                            d="M1514.2,205.194c-5.053.417-5.391.755-5.808,5.808-.417-5.053-.755-5.391-5.808-5.808,5.053-.417,5.391-.755,5.808-5.808C1508.8,204.439,1509.143,204.777,1514.2,205.194Z"
                            transform="translate(-560.574 2645.617)"
                            fill="#a587c2"
                        />
                        <path
                            id="Path_41034"
                            data-name="Path 41034"
                            d="M1514.2,205.194c-5.053.417-5.391.755-5.808,5.808-.417-5.053-.755-5.391-5.808-5.808,5.053-.417,5.391-.755,5.808-5.808C1508.8,204.439,1509.143,204.777,1514.2,205.194Z"
                            transform="translate(-994.438 2734.103)"
                            fill="#a587c2"
                        />
                        <path
                            id="Path_41035"
                            data-name="Path 41035"
                            d="M1508.537,202.365c-2.592.214-2.765.387-2.979,2.979-.214-2.592-.387-2.765-2.979-2.979,2.592-.214,2.765-.387,2.979-2.979C1505.772,201.978,1505.946,202.151,1508.537,202.365Z"
                            transform="translate(-1025.679 2761.535)"
                            fill="#a587c2"
                        />
                        <path
                            id="Path_41031"
                            data-name="Path 41031"
                            d="M1551.332,223.762c-21.208,1.749-22.626,3.167-24.376,24.376-1.75-21.208-3.167-22.627-24.376-24.376,21.209-1.749,22.626-3.168,24.376-24.376C1528.705,220.595,1530.124,222.013,1551.332,223.762Z"
                            transform="translate(-1031.574 2727.614)"
                            fill="#a587c2"
                        />
                        <path
                            id="Path_41036"
                            data-name="Path 41036"
                            d="M1533.584,214.888c-13.487,1.112-14.39,2.014-15.5,15.5-1.113-13.488-2.014-14.39-15.5-15.5,13.488-1.113,14.39-2.014,15.5-15.5C1519.195,212.874,1520.1,213.776,1533.584,214.888Z"
                            transform="translate(-1022.7 2736.488)"
                            fill="#fff"
                        />
                    </g>
                </g>
            </svg>
            <Grid
                container
                justifyContent="space-around"
                sx={{ position: 'absolute', bottom: '20.5vw' }}>
                    {
                        isLoading ? <CircularProgress /> : 
                        <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ textAlign: 'center', width: '23vw', height: '21vw', paddingTop: 3 }}>
                    <SessionTitle variant="h4">{(items[0]?.title) || '-----'}</SessionTitle>
                    <SessionDescription variant="subtitle1">
                    {(items[0]?.description) || '-------'}
                    </SessionDescription>
                    <SessionButton variant="outlined" onClick={()=>router.push(`/healing/session/details/?sessionid=${items[0]?.id}`)}>See Session</SessionButton>
                </Grid>
                    }
                 {
                        isLoading ? <CircularProgress /> : 
                        <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ textAlign: 'center', width: '23vw', height: '21vw', paddingTop: 3 }}>
                    <SessionTitle variant="h4">{(items[1]?.title) || '-----'}</SessionTitle>
                    <SessionDescription variant="subtitle1">
                    {(items[1]?.description) || '-------'}
                    </SessionDescription>
                    <SessionButton variant="outlined" onClick={()=>router.push(`/healing/session/details/?sessionid=${items[1]?.id}`)}>See Session</SessionButton>
                </Grid>
                    }
                 {
                        isLoading ? <CircularProgress /> : 
                        <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ textAlign: 'center', width: '23vw', height: '21vw', paddingTop: 3 }}>
                    <SessionTitle variant="h4">{(items[2]?.title) || '-----'}</SessionTitle>
                    <SessionDescription variant="subtitle1">
                    {(items[2]?.description) || '-------'}
                    </SessionDescription>
                    <SessionButton variant="outlined" onClick={()=>router.push(`/healing/session/details/?sessionid=${items[2]?.id}`)}>See Session</SessionButton>
                </Grid>
                    }
            </Grid>
        </Grid>
    );
}

export default Confident;
