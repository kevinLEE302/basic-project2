import { useState } from 'react';
import Modal from './Modal';
interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<string | null>>;
    url: string;
    handleEditLink: ({ linkId, url }: { linkId: number; url: string }) => void;
    linkId: number;
}
export default function EditLinkModal({ setIsOpen, url, linkId, handleEditLink }: Props) {
    const [value, setValue] = useState('');
    return (
        <Modal setIsOpen={setIsOpen}>
            {' '}
            <h1 className="font-bold text-twenty text-gray-1">링크 수정</h1>
            <input
                className="w-full flex items-center border border-gray-D rounded-md p-4 text-sixteen placeholder:text-gray-7 font-normal placeholder:text-sixteen placeholder:font-normal "
                placeholder="내용 입력"
                value={value}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
            />
            <button
                onClick={async (e) => {
                    e.stopPropagation();
                    await handleEditLink({ url: value, linkId });
                    setIsOpen(null);
                }}
                className="rounded-4xl py-[14px] w-full bg-gray-2 flex items-center justify-center text-white font-semibold text-eighteen"
            >
                수정하기
            </button>
        </Modal>
    );
}
