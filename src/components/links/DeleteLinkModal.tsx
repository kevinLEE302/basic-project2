import Modal from './Modal';

interface Props {
    setIsOpen: React.Dispatch<React.SetStateAction<string | null>>;
    url: string;
    handleDeleteLink: (linkId: number) => void;
    linkId: number;
}
export default function DeleteLinkModal({ setIsOpen, url, handleDeleteLink, linkId }: Props) {
    return (
        <Modal setIsOpen={setIsOpen}>
            <div className="flex flex-col gap-2 items-center">
                <h1 className="font-bold text-twenty text-gray-1">링크 삭제</h1>
                <p className="text-fourteen font-normal text-gray-B overflow-hidden">{url}</p>
            </div>
            <button
                onClick={async (e) => {
                    e.stopPropagation();
                    await handleDeleteLink(linkId);
                    setIsOpen(null);
                }}
                className="rounded-4xl py-[14px] w-full bg-gray-2 flex items-center justify-center text-white font-semibold text-eighteen"
            >
                삭제하기
            </button>
        </Modal>
    );
}
