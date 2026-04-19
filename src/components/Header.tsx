import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Header() {
    const [exist, setExist] = useState(false);
    const [name, setName] = useState<string | null>('');
    const [drop, setDrop] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setExist(true);
            setName(localStorage.getItem('name')); // 조건 안으로 이동
        }
    }, []);

    return (
        <div className="bg-black h-[113px] py-8">
            {exist ? (
                <div className="flex justify-between w-[min(1040px,calc(100%-64px))] mx-auto items-center">
                    <button
                        className="relative w-full max-w-[133px] h-6 max-sm:max-w-22 max-sm:max-w-4 "
                        onClick={() => router.push('/')}
                        disabled={router.pathname === '/'}
                    >
                        <Image src={'/home/images/logo.png'} alt="로고" fill />
                    </button>
                    <div className="relative flex gap-6 max-sm:gap-4 items-center">
                        <button
                            onClick={() => router.push('/favorite')}
                            className="max-md:px-3 max-md:py-2 rounded-4xl px-6 py-3 text-eighteen font-normal text-white bg-gray-2/80 max-md:text-fourteen"
                        >
                            ⭐️즐겨찾기
                        </button>
                        <div className="relative">
                            <button className="flex gap-1" onClick={() => setDrop((prev) => !prev)}>
                                <div className="relative w-5 h-5">
                                    <Image src="/home/icons/myprofile.png" fill alt="유저" />
                                </div>
                                <span className="text-eighteen font-normal text-white max-md:text-fourteen max-sm:hidden">
                                    {name}
                                </span>
                            </button>
                            {drop && (
                                <button
                                    className="translate-y-1/5 whitespace-nowrap absolute max-md:px-3 max-md:py-2 rounded-md px-6 py-3 text-eighteen font-normal text-black bg-white max-md:text-fourteen"
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        setExist(false);
                                        setName(null);
                                        setDrop(false);
                                        if (router.pathname !== '/') router.push('/');
                                    }}
                                >
                                    로그아웃
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-between w-[min(1040px,calc(100%-64px))] mx-auto items-center">
                    <div className="relative w-full max-w-[133px] h-6 max-sm:max-w-22 max-sm:max-w-4 ">
                        <Image src={'/home/images/logo.png'} alt="로고" fill />
                    </div>
                    <button
                        onClick={() => router.push('login')}
                        className="rounded-4xl px-6 py-3 text-eighteen font-semibold text-white bg-gray-2/80 max-md:text-fourteen max-md:px-3 max-md:py-2"
                    >
                        로그인
                    </button>
                </div>
            )}
        </div>
    );
}
