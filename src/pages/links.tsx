import Layout from '@/components/Layout';
import AddLink from '@/components/links/AddLink';
import Main from '@/components/links/Main';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { getAllLink, getLink } from './api/link/GetApi';
import { createContext } from 'react';
import { getAllFolder } from './api/folder/GetApi';
import Pagination from '@/components/links/Pagination';
import deleteFolder from './api/folder/DeleteApi';
import PutFolder from './api/folder/Put';
import PostFolder from './api/folder/PostApi';
import deleteLink from './api/link/Delete';
import PutLink from './api/link/Put';

interface Link {
    id: number;
    favorite: boolean;
    url: string;
    title: string;
    imageSource: string;
    description: string;
    createdAt: string;
}
interface Folder {
    id: number;
    createdAt: string;
    name: string;
    linkCount: number;
}

interface Context {
    search: string;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleDeleteLink: (linkId: number) => void;
    setRefresh: React.Dispatch<React.SetStateAction<number>>;
    handleEditLink: ({ url, linkId }: { url: string; linkId: number }) => void;
}

export const context = createContext<Context | null>(null);
export default function LinkPage() {
    const [search, setSearch] = useState('');
    const [links, setLinks] = useState<Link[]>([]);
    const [folders, setFolders] = useState<Folder[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [folderCount, setFolderCount] = useState<number>(0);
    const [pageSize, setPageSize] = useState(() => (typeof window !== 'undefined' && window.innerWidth < 768 ? 8 : 9));
    const [currentPage, setCurrentPage] = useState(1);
    const [refresh, setRefresh] = useState(0);
    const [folderName, setFolderName] = useState<string>('전체');
    const [folderId, setFolderId] = useState<null | number>(null);
    const [refreshFolder, setRefreshFolder] = useState(0);

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

    //링크 검색 onChange
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        router.push(`/links?page=1&pageSize=${pageSize}&search=${value}`);
    };

    //링크들 데이터 조회
    useEffect(() => {
        const getLinks = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;
            try {
                if (folderId === null) {
                    const a = await getAllLink({ token, page: currentPage, pageSize, search });
                    setLinks(a.list);
                    setTotalCount(a.totalCount);
                    setFolderCount(a.totalCount);
                } else {
                    const a = await getLink({ token, page: currentPage, pageSize, folderId });
                    setLinks(a.list);
                    setFolderCount(a.totalCount);
                }
            } catch (e) {
                if (e instanceof Error) console.log(e.message);
            }
        };
        getLinks();
    }, [search, pageSize, currentPage, refresh, folderId]);

    //폴더들 데이터 조회
    useEffect(() => {
        const token = localStorage.getItem('token');
        const getFolders = async () => {
            try {
                if (token === null) return;
                const a = await getAllFolder(token);
                setFolders(a);
            } catch (e) {
                if (e instanceof Error) console.log(e.message);
            }
        };
        getFolders();
    }, [refreshFolder]);

    //폴더 삭제
    const handleFolderDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            await deleteFolder({ token, folderId });
            setFolderId(null);
            setFolderName('전체');
            setCurrentPage(1);
        } catch (e) {
            if (e instanceof Error) console.log(e.message);
        }
    };

    //폴더 이름 수정
    const handleFolderEdit = async (name: string) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            if (!folderId) return;
            const a = await PutFolder({ token, name, folderId });
            setFolderName(a.name);
            setRefreshFolder((prev) => prev + 1);
        } catch (e) {
            if (e instanceof Error) console.log(e.message);
        }
    };

    //유저의 폴더 생성
    const handleAddFolder = async (name: string) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            const a = await PostFolder({ token, name });
            setFolders((prev) => [...prev, { ...a, linkCount: 0 }]);
            setFolderName(a.name);
            setFolderId(a.id);
        } catch (e) {
            if (e instanceof Error) console.log(e.message);
        }
    };
    //링크삭제
    const handleDeleteLink = async (linkId: number) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            await deleteLink({ linkId, token });
            setRefresh((prev) => prev + 1);
            setRefreshFolder((prev) => prev + 1);
        } catch (e) {
            if (e instanceof Error) console.log(e.message);
        }
    };
    //링크수정
    const handleEditLink = async ({ url, linkId }: { url: string; linkId: number }) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;
            await PutLink({ token, url, linkId });
            setRefresh((prev) => prev + 1);
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
            }
        }
    };
    return (
        <>
            <AddLink
                folders={folders}
                setFolders={setFolders}
                setCurrentPage={setCurrentPage}
                setRefresh={setRefresh}
            />
            <context.Provider value={{ handleSearchChange, handleEditLink, search, handleDeleteLink, setRefresh }}>
                <Main
                    links={links}
                    folders={folders}
                    totalCount={totalCount}
                    folderName={folderName}
                    setFolderName={setFolderName}
                    setFolderId={setFolderId}
                    setCurrentPage={setCurrentPage}
                    handleFolderDelete={handleFolderDelete}
                    folderId={folderId}
                    folderCount={folderCount}
                    setRefreshFolder={setRefreshFolder}
                    handleFolderEdit={handleFolderEdit}
                    handleAddFolder={handleAddFolder}
                />
            </context.Provider>
            {links.length !== 0 && (
                <Pagination
                    totalCount={folderId === null ? totalCount : folderCount}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            )}
        </>
    );
}

LinkPage.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;
