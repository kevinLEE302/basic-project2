import { PostAddLink } from '@/pages/api/link/PostApi';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import AddLinkModal from './AddLinkModal';
import { getAllFolder } from '@/pages/api/folder/GetApi';

interface Folder {
    id: number;
    createdAt: string;
    name: string;
    linkCount: number;
}
interface Props {
    folders: Folder[];
    setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    setRefresh: React.Dispatch<React.SetStateAction<number>>;
}
export default function AddLink({ folders, setFolders, setCurrentPage, setRefresh }: Props) {
    const [value, setValue] = useState('');
    const [isOpen, setIsOpen] = useState<string | null>(null);
    const [folderId, setFolderId] = useState<number | null>(null);
    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token === null) return;
            if (folderId === null) return;
            await PostAddLink({ token, url: value, folderId });
            const updatedFolders = await getAllFolder(token);
            setFolders(updatedFolders);
            setValue('');
            setRefresh((prev) => prev + 1);
            setCurrentPage(1);
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
            }
        }
    };
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);
    return (
        <div className="bg-black h-[255px] max-sm:h-[185px] flex flex-col pt-5 max-sm:pt-8 pb-20 max-sm:pb-12 gap-10 max-sm:gap-6 items-center">
            <h1 className="text-white text-thirtytwo font-semibold  max-sm:font-bold">
                세상의 모든 정보, 필요한 순간에
            </h1>
            <div className="w-[min(640px,calc(100%-50px))] max-md:w-[min(569px,calc(100%-50px))] py-3 pl-8 pr-3 max-sm:py-2 max-sm:pr-2 max-sm:pl-5 bg-black/50 border border-gray-7 border-2 rounded-4xl flex justify-between items-center">
                <div className="flex gap-5 max-sm:gap-2">
                    <div className="relative w-7 h-7 max-sm:w-4 max-sm:h-4">
                        <Image src="/links/icons/link.png" alt="링크" fill />
                    </div>
                    <input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="링크를 추가해 보세요"
                        className="max-md:max-w-[166px] max-sm:max-w-[116px]  placeholder:text-twenty placeholder:font-normal placeholder:text-gray-B text-white text-twenty font-normal outline-none "
                    />
                </div>
                <button
                    onClick={() => setIsOpen('add')}
                    className="whitespace-nowrap bg-white border rounded-4xl py-[14px] px-6 text-eighteen font-semibold max-sm:py-2 max-sm:px-4"
                    disabled={value === ''}
                >
                    추가하기
                </button>
            </div>
            {isOpen && (
                <AddLinkModal
                    value={value}
                    folders={folders}
                    setFolderId={setFolderId}
                    onSubmit={handleSubmit}
                    setIsOpen={setIsOpen}
                    folderId={folderId}
                />
            )}
        </div>
    );
}
