import { theme } from '@/provider/ThemeProvider';
import '@emotion/react';
import { Property } from 'csstype';

type ThemeObj = typeof theme;

declare module '@emotion/react' {
    export interface Theme extends ThemeObj {
        palette: {
            [key: keyof ThemeObj]: ThemeObj[key];
            common: {
                black: string;
                white: string;
                success: string;
                info: string;
                warning: string;
            };
            primary: {
                main: string;
                light: string;
                dark: string;
                foreground: string;
            };
            secondary: {
                main: string;
                light: string;
                dark: string;
            };
            grey: {
                main: string;
                text: string;
                dark: string;
                light: string;
                lighter: string;
                border: string;
            };
            text: {
                main: string;
                placeholder: string;
                100: string;
                700: string;
            };
            error: { main: string };
            paginate: { main: string };
        };
    }
}

// You are also able to use a 3rd party theme this way:
import '@emotion/react';
import { LibTheme } from 'some-lib';

declare module '@emotion/react' {
    export interface Theme extends LibTheme {}
}
// @types/react/index.d.ts
declare module 'react' {
    interface Attributes {
        css?: Property;
    }
}
