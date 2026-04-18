import AuthButton from '@/components/auth/AuthButton';
import Input from '@/components/common/Input';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SignupPage() {
    const [showEye, setShowEye] = useState(false);
    const handleEyeClick = () => {
        setShowEye((prev) => !prev);
    };
    const router = useRouter();
    return (
        <div className="flex justify-center items-center bg-[url('/auth/auth-back-image.png')] bg-cover bg-no-repeat bg-center min-h-screen ">
            <div className="pt-20 pb-16 px-10 w-[min(480px,calc(100%-50px))] flex flex-col items-center gap-8 bg-gray-2/80 shadow-md max-sm:p-0 max-sm:bg-transparent">
                <div className="flex flex-col gap-4 items-center">
                    <button
                        onClick={() => {
                            router.push('/');
                        }}
                        className="relative w-full max-w-[210px] h-[38px] max-sm:max-w-[133px]  max-sm:h-[24px]"
                    >
                        <Image src="/auth/logo.png" alt="로고" fill />
                    </button>
                    <p className="font-normal text-sixteen text-gray-F">
                        회원이 아니신가요?{' '}
                        <Link href="./login" className="underline underline-offset-4  text-point">
                            로그인 하기
                        </Link>
                    </p>
                </div>
                <form className="flex flex-col gap-6 w-full" id="myForm">
                    <div className="flex flex-col gap-3 items-start">
                        <label className="text-white text-fourteen font-normal">이메일</label>
                        <Input placeholder="이메일" type="email" />
                    </div>
                    <div className="flex flex-col gap-3 items-start">
                        <label className="text-white text-fourteen font-normal">이름</label>
                        <Input placeholder="이름" type="text" />
                    </div>
                    <div className="flex flex-col gap-3 items-start">
                        <label className="text-white text-fourteen font-normal">비밀번호</label>
                        <Input
                            placeholder="비밀번호"
                            type={showEye ? 'text' : 'password'}
                            onClick={handleEyeClick}
                            eye={showEye}
                        />
                    </div>
                    <div className="flex flex-col gap-3 items-start">
                        <label className="text-white text-fourteen font-normal">비밀번호 확인</label>
                        <Input
                            placeholder="비밀번호 확인"
                            type={showEye ? 'text' : 'password'}
                            onClick={handleEyeClick}
                            eye={showEye}
                        />
                    </div>
                </form>
                <AuthButton form="myForm">로그인</AuthButton>
            </div>
        </div>
    );
}
