import Modal from './Modal';

interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<string | null>>;
    handleFolderDelete: () => void;
    folderName: string;
    setRefreshFolder: React.Dispatch<React.SetStateAction<number>>;
}

export default function DeleteFolderModal({ setRefreshFolder, setIsOpen, folderName, handleFolderDelete }: Props) {
    return (
        <Modal setIsOpen={setIsOpen}>
            <div className="flex flex-col gap-2 items-center">
                <h1 className="font-bold text-twenty text-gray-1">폴더 삭제</h1>
                <p className="text-fourteen font-normal text-gray-B overflow-hidden">{folderName}</p>
            </div>
            <button
                onClick={async () => {
                    await handleFolderDelete();
                    setRefreshFolder((prev) => prev + 1);
                    setIsOpen(null);
                }}
                className="rounded-4xl py-[14px] w-full bg-gray-2 flex items-center justify-center text-white font-semibold text-eighteen"
            >
                삭제하기
            </button>
        </Modal>
    );
}
