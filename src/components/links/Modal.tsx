import Image from 'next/image';
import { createPortal } from 'react-dom';
interface Props {
    children: React.ReactNode;
    setIsOpen: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Modal({ children, setIsOpen }: Props) {
    if (typeof window === 'undefined') return null;
    return createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-2">
            <div className="relative max-w-90 w-full rounded-4xl py-8 px-10 flex flex-col gap-6 items-center bg-white">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(null);
                    }}
                    className="flex items-center justify-center absolute right-4 top-4 w-full max-w-6 h-6 bg-gray-F rounded-full"
                >
                    <Image src={'/links/icons/delete.png'} alt="닫기" width={16} height={16} />
                </button>
                {children}
            </div>
        </div>,
        document.getElementById('modal-root')!,
    );
}
