import { useState } from 'react';
import Modal from './Modal';

interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<string | null>>;
    handleAddFolder: (name: string) => void;
}

export default function AddFolderModal({ setIsOpen, handleAddFolder }: Props) {
    const [value, setValue] = useState('');
    return (
        <Modal setIsOpen={setIsOpen}>
            <h1 className="font-bold text-twenty text-gray-1">폴더 추가</h1>
            <input
                className="w-full flex items-center border border-gray-D rounded-md p-4 text-sixteen placeholder:text-gray-7 font-normal placeholder:text-sixteen placeholder:font-normal "
                placeholder="내용 입력"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button
                onClick={async () => {
                    await handleAddFolder(value);
                    setIsOpen(null);
                }}
                className="rounded-4xl py-[14px] w-full bg-gray-2 flex items-center justify-center text-white font-semibold text-eighteen"
            >
                추가하기
            </button>
        </Modal>
    );
}
