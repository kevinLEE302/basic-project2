import { context } from '@/pages/links';
import Image from 'next/image';
import { useContext } from 'react';

export default function SearchInput() {
    const data = useContext(context);
    if (!data) return null;
    const { search, handleSearchChange } = data;
    return (
        <div className="px-6 py-4 bg-gray-F rounded-4xl ">
            <div className="flex items-center gap-3 max-sm:gap-2">
                <Image src={'/links/icons/search-icon.png'} alt="서치아이콘" width={16} height={16} />
                <input
                    placeholder="링크를 검색해 보세요"
                    className="text-sixteen font-normal outline-none placeholder:text-sixteen placeholder:text-gray-7"
                    value={search}
                    onChange={handleSearchChange}
                />
            </div>
        </div>
    );
}
