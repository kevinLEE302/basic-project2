import Layout from '@/components/Layout';
import { ReactNode } from 'react';

export default function LinkPage() {
    return <div>안녕하세용</div>;
}

LinkPage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;
