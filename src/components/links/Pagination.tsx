import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';

const totalSize = 5;
interface Props {
    totalCount: number;
    pageSize: number;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}
export default function Pagination({ totalCount, pageSize, currentPage, setCurrentPage }: Props) {
    const totalPage = Math.ceil(totalCount / pageSize);
    const currnetGroup = Math.ceil(currentPage / totalSize);
    const startIndex = (currnetGroup - 1) * totalSize + 1;
    const lastIndex = Math.min(totalPage, startIndex + totalSize - 1);
    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };
    const handleNextClick = () => {
        if (currentPage < totalPage) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    return (
        <div className="flex items-center justify-center mx-auto mb-16 max-md:mb-12 max-sm:mb-10">
            <button
                className="flex-[0_0_40px] h-10 flex justify-center items-center"
                onClick={handlePrevClick}
                disabled={currentPage === 1}
            >
                <Image
                    src={currentPage === 1 ? '/links/icons/disabled-left.png' : '/links/icons/left.png'}
                    alt="왼쪽"
                    width={24}
                    height={24}
                />
            </button>
            {Array.from({ length: lastIndex - startIndex + 1 }, (_, i) => startIndex + i).map((page) => (
                <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className="flex-[0_0_40px] h-10 flex justify-center items-center"
                >
                    <span
                        className={
                            currentPage === page
                                ? 'font-semibold text-eighteen text-gray-1'
                                : 'font-semibold text-eighteen text-gray-B'
                        }
                    >
                        {page}
                    </span>
                </button>
            ))}
            {lastIndex < totalPage && (
                <>
                    <div className="flex-[0_0_40px] h-10 flex justify-center items-center">
                        <Image src="/links/icons/pagekebab.png" alt="..." width={13} height={3} />
                    </div>
                    <button
                        className="flex-[0_0_40px] flex justify-center items-center"
                        onClick={() => setCurrentPage(totalPage)}
                    >
                        {totalPage}
                    </button>
                </>
            )}
            <button
                className="flex-[0_0_40px] h-10 flex justify-center items-center"
                onClick={handleNextClick}
                disabled={currentPage === totalPage}
            >
                <Image
                    src={currentPage === totalPage ? '/links/icons/disabled-right.png' : '/links/icons/right.png'}
                    alt="오른쪽"
                    width={24}
                    height={24}
                />
            </button>
        </div>
    );
}
