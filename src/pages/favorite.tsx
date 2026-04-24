import FavoritePagination from '@/components/favorites/FavoritePagination';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';

interface Link {
    id: number;
    favorite: boolean;
    url: string;
    title: string;
    imageSource: string;
    description: string;
    createdAt: string;
}

export default function FavoritePage() {
    const [pageSize, setPageSize] = useState(() => (typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 9));
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [links, setLinks] = useState<Link[]>([]);

    //페이지 접근 보호
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/');
        }
    }, []);
    //pageSize 개수 조절
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setPageSize(8);
            } else {
                setPageSize(9);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <FavoritePagination totalCount={totalCount} currentPage={currentPage} links={links} pageSize={pageSize} />
        </div>
    );
}

FavoritePage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;
