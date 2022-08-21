import React from 'react';
import { Global, css } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { EmotionCache } from '@emotion/cache';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import createEmotionCache from '@/utils/createEmotionCache';
const clientSideEmotionCache = createEmotionCache();

export const PRIMARY_COLOR = '#6FCBDF';
export const SUCCESS_COLOR = '#D5623D';
export const baseFontSize = 16;
// import '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
    interface CommonColors {
        success: string;
        info: string;
        warning: string;
    }
    interface SecondaryColors {
        dark: string;
        darker: string;
    }
}

const theme = createTheme({
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
            black: '#002434',
            white: '#F9FEFF',
            success: '#1CA24A',
            info: '#3583EB',
            warning: '#FFBD0A'
        },
        primary: {
            main: PRIMARY_COLOR,
            light: '#EAFCFF',
            dark: '#06677C'
        },
        secondary: {
            main: SUCCESS_COLOR,
            light: '#E7F1FC',
            dark: '#75B0EA',
            darker: '#222222'
        },
        grey: {
            main: '#828282',
            text: '#4F4F4F',
            dark: '#828282',
            light: '#AEAFB4',
            lighter: '#DEE0E5'
        },
        error: { main: '#BF1A1A' },
        paginate: { main: '#8B8B8B' }
    },
    components: {
        MuiButton: {
            //       variants: [
            //         {
            //           props: { variant: 'submit' },
            //           style: {
            //             'borderRadius': 10,
            //             'textTransform': 'none',
            //             'padding': '8px 24px',
            //             'backgroundColor': PRIMARY_COLOR,
            //             'color': '#FFF',
            //             '&:hover': {
            //               backgroundColor: `${PRIMARY_COLOR}AA`,
            //             },
            //           },
            //         },
            //         {
            //           props: { variant: 'cancel' },
            //           style: {
            //             borderRadius: 10,
            //             boxShadow: '0 0 1px 1px #191A23',

            //             backgroundColor: '#FFF',
            //             padding: '8px 24px',
            //           },
            //         },
            //       ],

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
            fontFamily: ['Roboto', 'Yeseva One'].join(','), // font aval va bishtar in proje roboto na Yeseva One
            color: '#213950'
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
                        font-family: Roboto;
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
