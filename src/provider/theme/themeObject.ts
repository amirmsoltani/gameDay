// import {  fontSizes } from 'src/utils/helpers/theme';
import { BP_DN, BP_UP, BP_UP_H, BP_DN_H, breakpointsKeys } from './breakpoint';
import { variants } from './typographySettings';
export const TOOLBAR_HEIGHT = 70;
export const PRIMARY_COLOR = '#7251b2';
const SHADOW_COLOR = 'rgb(0, 0, 0,0.43)';

const themeObj = {
    palette: {
        palette: {
            common: {
                black: '#002434',
                white: '#FFF',
                success: '#1CA24A',
                info: '#3583EB',
                warning: '#FFBD0A'
            },
            primary: {
                main: PRIMARY_COLOR,
                light: '#EAFCFF',
                dark: '#414358'
            },
            secondary: {
                main: '#172B4D',
                light: '#E7F1FC',
                dark: '#3D3D3D',
            },
            grey: {
                main: '#828282',
                text: '#4F4F4F',
                dark: '#828282',
                light: '#AEAFB4',
                lighter: '#FAFAFA'
            },
            error: { main: '#BF1A1A' },
            paginate: { main: '#8B8B8B' }
        },
        text: {
            main: '#002434',
            placeholder: '#A8A8A8',
            100: '#6270DD',
            700: '#424242'
        }
    },
    breakpoints: {
        values: breakpointsKeys,
        up: BP_UP,
        down: BP_DN,
        height: {
            up: BP_UP_H,
            down: BP_DN_H
        }
    },
    shape: {
        borderRadius: {
            common: 5,
            tiny: 4,
            small: 8,
            medium: 12,
            large: 16,
            xlarge: 24
        }
    },
    shadows: {
        shadowColor: SHADOW_COLOR,
        regular: `0px 0px 7px 1px ${SHADOW_COLOR}, 0 1px 2px rgba(0,0,0,0.24)`
    },
    sizes: {
        pageHeight: `calc(100vh - ${TOOLBAR_HEIGHT}px)`
    },
    mixins: {
        toolbar: {
            minHeight: TOOLBAR_HEIGHT,
            zIndex: 1500
        }
    },
    transition: {
        duration: '0.3s',
        background: '0.3s background-color'
    },
    typography: {
        // useNextVariants: true,
        fontFamily: ['Yeseva One', 'roboto-reg'].join(','),
        allVariants: { fontWeight: 'normal' },
        transform: { small: 'scale(0.85)', xsmall: 'scale(0.75)' },
        ...variants
    },
    zIndex: {
        modal: 9999,
        menu: 8888
    }
};
export default themeObj;
