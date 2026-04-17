import Layout from '@/components/Layout';
import { ReactNode } from 'react';

export default function FavoritePage() {
    return <div>안녕하세용</div>;
}

FavoritePage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;
