import Image from 'next/image';
import Modal from './Modal';
interface Folder {
    id: number;
    createdAt: string;
    name: string;
    linkCount: number;
}
interface Props {
    value: string;
    folders: Folder[];
    onSubmit: () => void;
    setFolderId: React.Dispatch<React.SetStateAction<number | null>>;
    setIsOpen: React.Dispatch<React.SetStateAction<string | null>>;
    folderId: number | null;
}

export default function AddLinkModal({ folderId, value, folders, setFolderId, onSubmit, setIsOpen }: Props) {
    return (
        <Modal setIsOpen={setIsOpen}>
            <div className="flex flex-col gap-2 items-center">
                <h1 className="font-bold text-twenty text-gray-1">폴더에 추가</h1>
                <p className="text-fourteen font-normal text-gray-B overflow-hidden">{value}</p>
            </div>
            <div className="w-full flex flex-col gap-1.5 max-h-53 overflow-y-scroll scrollbar-hide">
                {folders.map((folder) =>
                    folderId === folder.id ? (
                        <div
                            className="p-2 w-full items-center rounded-md bg-gray-F flex justify-between"
                            key={folder.id}
                        >
                            <button className=" flex gap-2" onClick={() => setFolderId(folder.id)}>
                                <p className="font-normal text-sixteen">{folder.name}</p>
                                <p className="font-normal text-fourteen text-gray-B">{`${folder.linkCount}개 링크`}</p>
                            </button>
                            <div className="relative w-4 h-4">
                                <Image src={'/links/icons/check.png'} alt="체크" fill />
                            </div>
                        </div>
                    ) : (
                        <button
                            key={folder.id}
                            className="w-full  flex gap-2 p-2"
                            onClick={() => setFolderId(folder.id)}
                        >
                            <p className="font-normal text-sixteen">{folder.name}</p>
                            <p className="font-normal text-fourteen text-gray-B">{`${folder.linkCount}개 링크`}</p>
                        </button>
                    ),
                )}
            </div>
            <button
                onClick={async () => {
                    await onSubmit();
                    setIsOpen(null);
                }}
                className="rounded-4xl py-[14px] w-full bg-gray-2 flex items-center justify-center text-white font-semibold text-eighteen"
            >
                링크 추가하기
            </button>
        </Modal>
    );
}
