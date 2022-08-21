import { Button, Grid, styled, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import React,{useState} from 'react'


type Props = {
    index: number;
};
const SeeMoreContainer = styled(Grid)(({ theme }) => ({
    position: 'absolute',
    bottom: '14vw',
    [theme.breakpoints.down('md')]: {
        position: 'relative',
        bottom: '0vw'
    }
}));
const SeeMore = styled(Button)<{ index: number, active?: string,hoverItem?:string }>(({ theme, index, active,hoverItem }) => ({
    width: '200px',
    borderRadius: '20px',
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    textTransform: 'capitalize',
    position: 'relative',
    zIndex: hoverItem === "true" ? 1 : 0,
    right: index % 2 === 0 ? '13.3vw' : '-38vw',
    transition: 'right 1200ms ease-out',
    '&:hover': {
        color: theme.palette.primary.main
    },
    [theme.breakpoints.down('md')]: {
        right: 0
    }
}));
const DescriptionContainer = styled(Grid)({
    position: 'absolute',
    bottom: '14vw',
    '@media(max-width:900px)': {
        position: 'relative',
        bottom: '0',
        margin: '20px 0 40px'
    },
    '@media(max-width:412px)': {
        bottom: '0'
    }
});
const Description = styled(Grid)<{ index: number }>(({ theme, index }) => ({
    maxWidth: '33%',
    position: 'relative',
    right: index % 2 == 0 ? '28vw' : '-26vw',
    transition: 'right 1200ms ease-out',
    bottom: '13vw',
    '@media(max-width:900px)': {
        maxWidth: '80%',
        textAlign: 'center',
        bottom: 'unset',
        right: 'unset'
    }
}));

function Slide({ index }: Props) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const [hoverItem, setHoverItem] = useState(false);

    const options = [
        {
            id: 1,
            path: '/healers/',
            imageUrl: './images/home_slide_1.png',
            description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            Lorem ipsum dolor sit amet  sadipscing elitr, sed diam nonumy eirmod`
        },
        {
            id: 2,
            path: '/healers/',
            imageUrl: './images/home_slide_2.png',
            description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            Lorem ipsum dolor sit amet  sadipscing elitr, sed diam nonumy eirmod`
        },
        {
            id: 3,
            path: '/healers/',
            imageUrl: './images/home_slide_1.png',
            description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            Lorem ipsum dolor sit amet  sadipscing elitr, sed diam nonumy eirmod`
        },
        {
            id: 4,
            path: '/healers/',
            imageUrl: './images/home_slide_2.png',
            description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
            Lorem ipsum dolor sit amet  sadipscing elitr, sed diam nonumy eirmod`
        }
    ];
    return (
        <Grid container justifyContent="flex-end" sx={{ position: 'relative', minWidth: '100vw' }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox={matches ? '-70 0 1417.092 846.844' : '-70 0 1417.092 1246'}
                style={{ zIndex: 1}}
                onMouseEnter = {()=>setHoverItem(true)}
                onMouseLeave = {()=>setHoverItem(false)}
                >
                <defs>
                    <filter
                        id="Ellipse_164"
                        x="667.5"
                        y="96.344"
                        width="637"
                        height="637"
                        filterUnits="userSpaceOnUse">
                        <feOffset dx="1" dy="3" />
                        <feGaussianBlur stdDeviation="7.5" result="blur" />
                        <feFlood floodColor="#5293d3" floodOpacity="0.306" />
                        <feComposite operator="in" in2="blur" />
                        <feComposite in="SourceGraphic" />
                    </filter>
                    <clipPath id="clip-path">
                        <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#Ellipse_164)">
                            <circle
                                id="Ellipse_164-2"
                                data-name="Ellipse 164"
                                cx="296"
                                cy="296"
                                r="296"
                                transform="translate(760 1181)"
                                fill="#cde5fc"
                            />
                        </g>
                    </clipPath>
                </defs>
                <image
                    id="_56033784"
                    data-name="56033784"
                    width={matches ? '590' : '1100'}
                    height={matches ? '590' : '1100'}
                    transform={
                        matches && index % 2 === 0
                            ? 'translate(690 121)'
                            : matches && index % 2 !== 0
                                ? 'translate(-10 121)'
                                : 'translate(120 51)'
                    }
                    href={options[index]?.imageUrl}
                    style={{ transition: 'transform 1200ms ease-out' }}
                />
                <g id="Group_23869" data-name="Group 23869" transform="translate(-71 -1065.156)">
                    <g
                        id="Group_23801"
                        data-name="Group 23801"
                        transform={
                            matches && index % 2 !== 0
                                ? 'translate(-700 0)'
                                : matches && index % 2 === 0
                                    ? null
                                    : 'translate(-1220 -1080) scale(1.86)'
                        }
                        style={{ transition: 'transform 1200ms ease-out' }}>
                        <g
                            id="Ellipse_188"
                            data-name="Ellipse 188"
                            transform="translate(1087.406 1065.156) rotate(45)"
                            fill="none"
                            stroke="#a587c2"
                            strokeWidth="2">
                            <ellipse
                                cx="283.328"
                                cy="313.022"
                                rx="283.328"
                                ry="313.022"
                                stroke="none"
                            />
                            <ellipse
                                cx="283.328"
                                cy="313.022"
                                rx="282.328"
                                ry="312.022"
                                fill="none"
                            />
                        </g>
                        <g
                            id="Ellipse_187"
                            data-name="Ellipse 187"
                            transform="translate(894.447 1082.686) rotate(21)"
                            fill="none"
                            stroke="#a587c2"
                            strokeWidth="2">
                            <ellipse
                                cx="283.328"
                                cy="313.022"
                                rx="283.328"
                                ry="313.022"
                                stroke="none"
                            />
                            <ellipse
                                cx="283.328"
                                cy="313.022"
                                rx="282.328"
                                ry="312.022"
                                fill="none"
                            />
                        </g>
                        <g
                            id="Ellipse_189"
                            data-name="Ellipse 189"
                            transform="matrix(0.602, -0.799, 0.799, 0.602, 623.908, 1535.237)"
                            fill="none"
                            stroke="#a587c2"
                            strokeWidth="2">
                            <ellipse
                                cx="283.328"
                                cy="313.022"
                                rx="283.328"
                                ry="313.022"
                                stroke="none"
                            />
                            <ellipse
                                cx="283.328"
                                cy="313.022"
                                rx="282.328"
                                ry="312.022"
                                fill="none"
                            />
                        </g>
                    </g>
                </g>
            </svg>
            <DescriptionContainer container justifyContent="center">
                <Description item index={index}>
                    {options[index]?.description}
                </Description>
            </DescriptionContainer>
            <SeeMoreContainer container justifyContent="center">
                <Link href={options[index]?.path || '/'}>
                    <a
                        style={{
                            margin: 'auto',
                            marginTop: '5px',
                            color: 'inherit',
                            textDecoration: 'none',
                            fontFamily: 'yeseva-reg'
                        }}>
                        <SeeMore size="small" variant="outlined" index={index} hoverItem={String(hoverItem)}>
                            See More
                        </SeeMore>
                    </a>
                </Link>
            </SeeMoreContainer>
        </Grid>
    );
}

export default Slide;
