import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { ReactNode } from 'react';

type ComponentLayout = NextPage & {
    getLayout?: (page: ReactNode) => ReactNode;
};
type AppPropsLayout = AppProps & {
    Component: ComponentLayout;
};
export default function App({ Component, pageProps }: AppPropsLayout) {
    const layout = Component.getLayout ?? ((page: ReactNode) => page);
    return layout(<Component {...pageProps} />);
}
