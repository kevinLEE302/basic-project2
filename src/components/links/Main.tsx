import SearchInput from './SearchInput';
import Image from 'next/image';
import CardList from './CardList';
import { useState } from 'react';
import DeleteFolderModal from './DeleteFolderModal';
import EditFolderModal from './EditFolderModal';
import AddFolderModal from './AddFolderModal';

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
interface Props {
    folders: Folder[];
    links: Link[];
    totalCount: number;
    setFolderName: React.Dispatch<React.SetStateAction<string>>;
    folderName: string;
    setFolderId: React.Dispatch<React.SetStateAction<number | null>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    handleFolderDelete: () => void;
    folderId: number | null;
    folderCount: number;
    setRefreshFolder: React.Dispatch<React.SetStateAction<number>>;
    handleFolderEdit: (name: string) => void;
    handleAddFolder: (name: string) => void;
}
const tabButton = 'flex gap-1.5 border border-gray-D rounded-4xl px-4 py-3 max-sm:px-3 max-sm:py-2';
const focusTabButton = 'bg-gray-D flex gap-1.5 border border-gray-D rounded-4xl px-4 py-3 max-sm:px-3 max-sm:py-2';
export default function Main({
    folders,
    links,
    totalCount,
    folderName,
    setFolderName,
    setFolderId,
    setCurrentPage,
    handleFolderDelete,
    folderCount,
    folderId,
    setRefreshFolder,
    handleFolderEdit,
    handleAddFolder,
}: Props) {
    const [isOpen, setIsOpen] = useState<null | string>(null);
    return (
        <>
            {folders.length !== 0 ? (
                <div className="mx-auto flex flex-col max-md:gap-10 py-16 max-md:py-12 max-sm:pt-5 max-sm:pb-8 w-[min(1060px,calc(100%-64px))] max-sm:w-[min(1060px,calc(100%-50px))] ">
                    <SearchInput />
                    <div className="my-12 max-md:my-10 max-sm:my-6 flex justify-between items-start">
                        <div className="flex gap-1.5 flex-wrap flex-1">
                            <button
                                onClick={() => {
                                    setFolderName('전체');
                                    setFolderId(null);
                                    setCurrentPage(1);
                                }}
                                className={folderName === '전체' ? focusTabButton : tabButton}
                            >
                                <p className="font-normal text-sixteen">전체</p>
                                <p
                                    className={
                                        folderName === '전체'
                                            ? 'text-sixteen font-normal text-gray-7'
                                            : 'text-sixteen font-normal text-gray-B'
                                    }
                                >
                                    {totalCount}
                                </p>
                            </button>
                            {folders.map((folder) => (
                                <button
                                    key={folder.id}
                                    onClick={() => {
                                        setFolderName(folder.name);
                                        setFolderId(folder.id);
                                        setCurrentPage(1);
                                    }}
                                    className={folder.name === folderName ? focusTabButton : tabButton}
                                >
                                    <p className="font-normal text-sixteen">{folder.name}</p>
                                    <p
                                        className={
                                            folderName === folder.name
                                                ? 'text-sixteen font-normal text-gray-7'
                                                : 'text-sixteen font-normal text-gray-B'
                                        }
                                    >
                                        {folder.linkCount}
                                    </p>
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setIsOpen('addFolder')}
                            className="max-sm:fixed max-sm:bottom-4 max-sm:right-4  flex gap-2 px-5 py-[15px] bg-gray-2 border rounded-4xl items-center"
                        >
                            <Image src="/links/icons/Plus.png" alt="추가" width={20} height={20} />
                            <p className="font-semibold text-sixteen text-white">폴더 추가하기</p>
                        </button>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex items-center gap-2 max-sm:gap-1">
                            <h1 className="font-semibold text-thirtytwo">{folderName}</h1>
                            <button
                                className="relative w-10 h-10 max-sm:w-8 max-sm:h-8"
                                onClick={() => setIsOpen('folderEdit')}
                                disabled={folderId === null}
                            >
                                <Image src="/links/icons/record.png" alt="이름변경" fill />
                            </button>
                        </div>
                        <div className="flex gap-3 items-center">
                            <button className="relative w-6 h-6 max-sm:w-5 max-sm:h-5">
                                <Image src="/links/icons/Share.png" alt="공유" fill />
                            </button>
                            <button
                                onClick={() => setIsOpen('trash')}
                                disabled={folderCount !== 0 || folderId === null}
                                className="relative w-6 h-6 max-sm:w-5 max-sm:h-5"
                            >
                                <Image src="/links/icons/trash.png" alt="삭제" fill />
                            </button>
                        </div>
                    </div>
                    <CardList links={links} />
                    {isOpen === 'trash' && (
                        <DeleteFolderModal
                            setIsOpen={setIsOpen}
                            folderName={folderName}
                            handleFolderDelete={handleFolderDelete}
                            setRefreshFolder={setRefreshFolder}
                        />
                    )}
                    {isOpen === 'folderEdit' && (
                        <EditFolderModal setIsOpen={setIsOpen} handleFolderEdit={handleFolderEdit} />
                    )}
                    {isOpen === 'addFolder' && (
                        <AddFolderModal setIsOpen={setIsOpen} handleAddFolder={handleAddFolder} />
                    )}
                </div>
            ) : (
                <div className="pb-16 max-sm:pb-[58px] mx-auto flex flex-col max-md:gap-10 py-16 max-md:py-12 max-sm:pt-5 max-sm:pb-8 w-[min(1060px,calc(100%-64px))] max-sm:w-[min(1060px,calc(100%-50px))] ">
                    <SearchInput />
                    <div className="w-full flex items-center justify-center ">
                        <div className="relative w-50 h-50 max-sm:max-w-30 max-sm:h-30">
                            <Image src={'/links/icons/img.png'} alt="링크없어용" fill />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[14px] items-center text-center">
                        <h1 className="font-bold text-twentyfour text-gray-2">저장된 링크가 없어요</h1>
                        <p className="font-normal text-sixteen text-gray-B">
                            링크를 추가해 흩어져 있는 정보를
                            <br />한 곳에서 보관해 보세요
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
