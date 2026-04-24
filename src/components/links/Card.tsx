import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Image from 'next/image';
import { useContext, useState } from 'react';
import DeleteLinkModal from './DeleteLinkModal';
import { context } from '@/pages/links';
import EditLinkModal from './EditLinkModal';

interface Link {
    id: number;
    favorite: boolean;
    url: string;
    title: string;
    imageSource: string;
    description: string;
    createdAt: string;
}
interface Prop {
    links: Link[];
}
dayjs.extend(relativeTime);
export default function Card({ links }: Prop) {
    const [isDrop, setIsDrop] = useState<null | number>(null);
    const [isOpen, setIsOpen] = useState<null | string>(null);
    const [linkId, setLinkId] = useState<null | number>(null);
    const a = useContext(context);
    if (!a) throw new Error();
    const { handleDeleteLink, handleEditLink } = a;

    return (
        <>
            {links.map((link) => (
                <div
                    className="relative w-full max-w-[340px] cursor-pointer"
                    key={link.id}
                    onClick={() => window.open(`https://${link.url}`, '_blank')}
                >
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        className="absolute right-[17px] top-[15px] z-1"
                    >
                        <Image src="/links/icons/Star.png" alt="star" width={32} height={32} />
                    </button>
                    <div className="relative w-full h-[200px] rounded-t-2xl overflow-hidden">
                        <Image
                            src={link.imageSource || '/links/icons/base.png'}
                            alt="카드이미지"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="py-4 px-5 flex flex-col gap-6 border border-t-0 rounded-b-2xl border-black/20">
                        <div className="flex justify-between items-center">
                            <p className="text-gray-7 font-normal text-fourteen">{dayjs(link.createdAt).fromNow()}</p>
                            <div
                                className="relative w-full max-w-[21px] h-[17px]"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsDrop(isDrop === link.id ? null : link.id);
                                }}
                            >
                                {isDrop === link.id && (
                                    <div className="z-1 top-5 -translate-x-12 flex flex-col items-center absolute rounded-md">
                                        <button
                                            onClick={() => {
                                                setIsDrop(null);
                                                setLinkId(link.id);
                                                setIsOpen('edit');
                                            }}
                                            className="whitespace-nowrap hover:bg-gray-F bg-white px-[25px] py-[14px] border rounded-md font-normal text-fourteen rounded-b-none border-gray-B text-gray-800 "
                                        >
                                            수정하기
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsDrop(null);
                                                setLinkId(link.id);
                                                setIsOpen('delete');
                                            }}
                                            className="whitespace-nowrap hover:bg-gray-F bg-white px-[25px] py-[14px] font-normal border rounded-md border-gray-B rounded-t-none text-fourteen text-gray-800 "
                                        >
                                            삭제하기
                                        </button>
                                    </div>
                                )}
                                <Image src={'/links/icons/kebab.png'} alt="kebab" fill />
                            </div>
                        </div>
                        <h1 className="text-gray-1 text-eighteen font-semibold truncate">
                            {link.title ? link.title : '.'}
                        </h1>
                        <p className="text-sixteen font-noraml text-gray-2 truncate">
                            {link.description ? link.description : '.'}
                        </p>
                        <p className="text-gray-7 font-normal text-fourteen truncate">
                            {dayjs(link.createdAt).format('YYYY-MM-DD')}
                        </p>
                    </div>
                    {isOpen === 'delete' && linkId === link.id && (
                        <DeleteLinkModal
                            setIsOpen={setIsOpen}
                            url={link.url}
                            handleDeleteLink={handleDeleteLink}
                            linkId={link.id}
                        />
                    )}
                    {isOpen === 'edit' && linkId === link.id && (
                        <EditLinkModal
                            setIsOpen={setIsOpen}
                            url={link.url}
                            handleEditLink={handleEditLink}
                            linkId={link.id}
                        />
                    )}
                </div>
            ))}
        </>
    );
}
