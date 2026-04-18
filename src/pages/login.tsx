import AuthButton from '@/components/auth/AuthButton';
import Input from '@/components/common/Input';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <div className="bg-[url('/auth/auth-back-image.png')] bg-cover bg-center bg-no-repeat min-h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col gap-8 w-[min(400px,calc(100%-50px))] ">
                <div className="flex flex-col gap-4 items-center">
                    <div className="relative w-full max-w-[210px] h-[38px] max-sm:max-w-[133px]  max-sm:h-[24px]">
                        <Image src="/auth/logo.png" alt="로고" fill />
                    </div>
                    <p className="font-normal text-sixteen text-gray-F">
                        회원이 아니신가요?{' '}
                        <Link href="./signup" className="underline underline-offset-4  text-point">
                            회원 가입하기
                        </Link>
                    </p>
                </div>
                <form className="flex flex-col gap-6 " id="myForm">
                    <div className="flex flex-col gap-3 items-start">
                        <label className="text-white text-fourteen font-normal">이메일</label>
                        <Input placeholder="이메일" type="email" />
                    </div>
                    <div className="flex flex-col gap-3 items-start">
                        <label className="text-white text-fourteen font-normal">비밀번호</label>
                        <Input placeholder="비밀번호" type="password" />
                    </div>
                </form>
                <AuthButton form="myForm">로그인</AuthButton>
                <div className="bg-gray-1/80 px-6 py-3 rounded-md ">
                    <div className="flex justify-between items-center">
                        <p className="text-white font-normal text-fourteen">소셜 로그인</p>
                        <button>
                            <Image src="/auth/kakao.png" alt="kakao" width={42} height={42} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
