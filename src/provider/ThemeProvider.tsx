import React from 'react';
import { Global, css } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { EmotionCache } from '@emotion/cache';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import createEmotionCache from '@/utils/createEmotionCache';
const clientSideEmotionCache = createEmotionCache();

export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1500
        }
    },
    palette: {
        common: {
            black: '#3d3d3d',
            white: '#FFF',
            success: '#1CA24A',
            info: '#3583EB',
            warning: '#FFBD0A'
        },
        primary: {
            main: '#7251b2',
            light: '#DCD0F3',
            dark: '#414358'
        },
        secondary: {
            main: '#172B4D',
            light: '#E7F1FC',
            dark: '#3D3D3D'
        },
        grey: {
            main: '#EBEBEB',
            text: '#F8F8F8',
            border:'#EBF2F7',
            dark: '#828282',
            light: '#F8F8F8',
            lighter: '#FAFAFA'
        },
        error: { main: '#BF1A1A' },
        paginate: { main: '#8B8B8B' },
        text: {
            main: '#3d3d3d',
            placeholder: '#B3B8BD',
            100: '#6270DD',
            700: '#424242'
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none'
                }
            }
        }
    },
    // fontFamily: ['Yeseva One', 'roboto-reg'].join(',')
    typography: {
        useNextVariants: true,
        h3: {
            fontSize: '3.6rem',
            '@media(max-width:1400px)': {
                fontSize: '3rem'
            },
            '@media(max-width:1280px)': {
                fontSize: '2.5rem'
            },
            '@media(max-width:900px)': {
                fontSize: '2rem',
                textAlign: 'center'
            },
            '@media(max-width:700px)': {
                fontSize: '1.7rem',
                textAlign: 'center'
            },
            '@media(max-width:480px)': {
                fontSize: '1.5rem',
                textAlign: 'center'
            }
        },
        h4: {
            fontSize: '2.4rem',
            '@media(max-width:900px)': {
                fontSize: '1.8rem',
                textAlign: 'center'
            },
            '@media(max-width:700px)': {
                fontSize: '1.5rem',
                textAlign: 'center'
            },
            '@media(max-width:480px)': {
                fontSize: '1.2rem',
                textAlign: 'center'
            }
        },
        allVariants: {
            fontFamily: ['Poppins', 'Lato'].join(','), // font aval va bishtar in proje roboto na Yeseva One
            color: '#3d3d3d'
        }
    }
} as any);

interface Props {
    children: React.ReactNode;
    emotionCache?: EmotionCache;
}

export default function AppThemeProvider({
    children,
    emotionCache = clientSideEmotionCache
}: Props) {
    return (
        <CacheProvider value={emotionCache}>
            {/* <DirectionProvider> */}
            <CssBaseline />
            <Global
                styles={css`
                    * {
                        box-sizing: border-box;
                        font-family: Poppins;
                    }

                    html,
                    body {
                        width: 100%;
                        height: 100%;
                        min-height: 100%;
                        padding: 0;
                        margin: 0;
                        background: white;
                    }
                `}
            />
            <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
            {/* </DirectionProvider> */}
        </CacheProvider>
    );
}
