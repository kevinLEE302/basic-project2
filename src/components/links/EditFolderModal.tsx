import { useState } from 'react';
import Modal from './Modal';

interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<string | null>>;
    handleFolderEdit: (name: string) => void;
}

export default function EditFolderModal({ setIsOpen, handleFolderEdit }: Props) {
    const [value, setValue] = useState('');
    return (
        <Modal setIsOpen={setIsOpen}>
            <h1 className="font-bold text-twenty text-gray-1">폴더 이름 변경</h1>
            <input
                className="w-full flex items-center border border-gray-D rounded-md p-4 text-sixteen placeholder:text-gray-7 font-normal placeholder:text-sixteen placeholder:font-normal "
                placeholder="내용 입력"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <button
                onClick={() => {
                    handleFolderEdit(value);
                    setIsOpen(null);
                }}
                className="rounded-4xl py-[14px] w-full bg-gray-2 flex items-center justify-center text-white font-semibold text-eighteen"
            >
                변경하기
            </button>
        </Modal>
    );
}
