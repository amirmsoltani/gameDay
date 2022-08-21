import { useEffect } from 'react';
import AppThemeProvider from 'src/provider/ThemeProvider';
import NProgress from 'nprogress';
import UserProvider from 'src/auth/UserProvider';
import SnackProvider from '@/provider/SnackProvider';
import store from '../src/redux/store/store';
import { AppProps } from 'next/app';
import { Router } from 'next/router';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import SubscribeMessagesComponent from 'src/components/chat/subscription_component';

import '../public/css/global.css';
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');

        if (jssStyles) {
            jssStyles?.parentElement?.removeChild(jssStyles);
        }
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />
            <Provider store={store}>
                <SnackProvider>
                    <UserProvider>
                        <AppThemeProvider>
                            <Component {...pageProps} />
                            <SubscribeMessagesComponent />
                        </AppThemeProvider>
                    </UserProvider>
                </SnackProvider>
            </Provider>
        </QueryClientProvider>
    );
}

export default MyApp;
