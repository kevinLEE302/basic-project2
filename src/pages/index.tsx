import NavButton from '@/components/home/NavButton';
import Layout from '@/components/Layout';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
export default function Home() {
    const router = useRouter();
    return (
        <>
            <nav className="p-15 bg-black flex flex-col gap-11.5 items-center text-center max-sm:p-12">
                <h1 className="text-fiftysix text-white font-thin mx-auto">
                    <span className="font-bold ">세상의 모든 정보</span>를<br /> 쉽게 저장하고{' '}
                    <br className="hidden max-sm:block" />
                    관리해 보세요
                </h1>
                <NavButton
                    onClick={() => {
                        const exist = localStorage.getItem('token');
                        if (exist) {
                            router.push('/links');
                        } else {
                            router.push('/login');
                        }
                    }}
                >
                    링크 추가하기
                </NavButton>
            </nav>
            <div className="py-12.5  flex justify-center items-center max-sm:flex-col">
                <div className="py-32.5 flex gap-6 flex-col items-start justify-center max-sm:py-0 max-sm:items-center ">
                    <h1 className="text-fourtytwo font-bold text-gray-1 max-sm:text-center ">
                        원하는 링크를
                        <br />
                        저장하세요
                    </h1>
                    <p className="text-gray-7 font-normal text-sixteen max-sm:text-center">
                        나중에 읽고 싶은 글, 다시 보고 싶은 영상, <br /> 사고 싶은 옷, 기억하고 싶은 모든 것을 <br /> 한
                        공간에 저장하세요.
                    </p>
                </div>
                <div className="relative w-full h-[450px] max-w-[696px]  max-md:h-[278px] max-md:max-w-[430px] max-sm:h-[215px] max-sm:max-w-[325px] ">
                    <Image src="/home/images/main-image-one.png" alt="이미지1" fill />
                </div>
            </div>
            <div className="py-12.5 flex justify-center bg-gray-F items-center max-sm:flex-col">
                <div className="relative w-full max-w-[729px] h-[450px] max-md:max-w-[403px] max-md:h-[280px] max-sm:max-w-[325px] max-sm:h-[200px] ">
                    <Image src="/home/images/main-image-two-new.png" alt="이미지2" fill />
                </div>
                <div className="py-35.25 flex flex-col gap-6 items-start justify-center max-sm:py-0 max-sm:items-center">
                    <h1 className="font-bold text-fourtytwo text-gray-1 max-sm:text-center">
                        링크를 폴더로
                        <br />
                        관리하세요
                    </h1>
                    <p className="font-normal text-sixteen text-gray-7 max-sm:text-center ">
                        나만의 폴더를 무제한으로 만들고
                        <br />
                        다양하게 활용할 수 있습니다.
                    </p>
                </div>
            </div>
            <div className="py-12.5 flex justify-center items-center max-sm:flex-col">
                <div className="py-32.5 flex flex-col gap-4 justify-center  max-sm:py-0 max-sm:items-center">
                    <h1 className="font-bold text-fourtytwo text-gray-1 max-sm:text-center">
                        저장한 링크를 <br />
                        공유해 보세요.
                    </h1>
                    <p className="font-normal text-sixteen text-gray-7 max-sm:text-center">
                        여러 링크를 폴더에 담고 공유할 수 있습니다. <br />
                        가족, 친구, 동료들에게 쉽고 빠르게 링크를 <br />
                        공유해 보세요.
                    </p>
                </div>
                <div className="relative w-full max-w-[729px] h-[450px] max-md:max-w-[403px] max-md:h-[280px] max-sm:max-w-[325px] max-sm:h-[200px] ">
                    <Image src="/home/images/main-image-three.png" alt="이미지3" fill />
                </div>
            </div>
            <div className="py-12.5 flex justify-center bg-gray-F gap-14.5 items-center max-md:gap-10 max-sm:gap-6 max-sm:flex-col">
                <div className="py-38 flex flex-col gap-6 items-start justify-center  max-sm:py-0 max-sm:items-center">
                    <h1 className="font-bold text-fourtytwo text-gray-1 max-sm:text-center">
                        저장한 링크를
                        <br />
                        검색해 보세요
                    </h1>
                    <p className="font-normal text-sixteen text-gray-7 max-sm:text-center">
                        중요한 정보들을 검색으로 쉽게 찾아보세요.
                    </p>
                </div>
                <div className="relative w-full max-w-[729px] h-[450px] max-md:max-w-[403px] max-md:h-[280px] max-sm:max-w-[325px] max-sm:h-[200px] ">
                    <Image src="/home/images/main-image-four.png" alt="이미지4" fill />
                </div>
            </div>
        </>
    );
}
Home.getLayout = (page: ReactNode) => <Layout>{page}</Layout>;
