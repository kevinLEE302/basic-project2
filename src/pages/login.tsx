import AuthButton from '@/components/auth/AuthButton';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoginFormData, LoginSchema } from './schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostSignIn } from './api/auth/PostApi';

export default function LoginPage() {
    const [showEye, setShowEye] = useState(false);
    const router = useRouter();

    //눈버튼 onClick
    const handleEyeClick = () => {
        setShowEye((prev) => !prev);
    };

    //zod
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>({ resolver: zodResolver(LoginSchema) });

    //전송
    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await PostSignIn(data);
            localStorage.setItem('token', response.accessToken);
            router.push('/');
        } catch (e) {
            if (e instanceof Error) {
                alert('이메일 또는 비밀번호가 올바르지 않습니다');
            }
        }
    };

    return (
        <div className="bg-[url('/auth/auth-back-image.png')] bg-cover bg-center bg-no-repeat min-h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col gap-8 w-[min(400px,calc(100%-50px))] ">
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
                        <Link href="./signup" className="underline underline-offset-4  text-point">
                            회원 가입하기
                        </Link>
                    </p>
                </div>
                <form className="flex flex-col gap-6 w-full" id="myForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-3 items-start">
                        <label className="text-white text-fourteen font-normal">이메일</label>
                        <div className="w-full relative flex flex-col gap-2">
                            <input
                                className={
                                    errors.email
                                        ? `placholder:text-sixteen placeholder:font-normal placeholder:text-gray-B text-sixteen font-normal w-full rounded-md border border-system-error focus:border-system-error outline-none bg-gray-2 py-4 px-[14px] text-white max-sm:text-fourteen max-sm:py-3`
                                        : 'placholder:text-sixteen placeholder:font-normal placeholder:text-gray-B text-sixteen font-normal w-full rounded-md border border-gray-7 bg-gray-2 py-4 px-[14px] focus:border-gray-E text-white max-sm:text-fourteen max-sm:py-3'
                                }
                                placeholder="이메일"
                                type="email"
                                {...register('email')}
                            />
                            {errors.email?.message && (
                                <p className="text-system-error text-fourteen font-normal">{errors.email.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 items-start">
                        <label className="text-white text-fourteen font-normal">비밀번호</label>
                        <div className="w-full relative flex flex-col gap-2">
                            <input
                                className={
                                    errors.password
                                        ? `placholder:text-sixteen placeholder:font-normal placeholder:text-gray-B text-sixteen font-normal w-full rounded-md border border-system-error focus:border-system-error outline-none bg-gray-2 py-4 px-[14px] text-white max-sm:text-fourteen max-sm:py-3`
                                        : 'placholder:text-sixteen placeholder:font-normal placeholder:text-gray-B text-sixteen font-normal w-full rounded-md border border-gray-7 bg-gray-2 py-4 px-[14px] focus:border-gray-E text-white max-sm:text-fourteen max-sm:py-3'
                                }
                                placeholder="비밀번호"
                                type={showEye ? 'text' : 'password'}
                                {...register('password')}
                            />
                            <button
                                onClick={handleEyeClick}
                                className="absolute w-4 h-4 right-[14px] top-4"
                                type="button"
                            >
                                {showEye ? (
                                    <Image src="/auth/eye-on.png" alt="눈" width={16} height={16} />
                                ) : (
                                    <Image src="/auth/eye-off.png" alt="눈" width={16} height={16} />
                                )}
                            </button>
                            {errors.password?.message && (
                                <p className="text-system-error text-fourteen font-normal">{errors.password.message}</p>
                            )}
                        </div>
                    </div>
                </form>
                <AuthButton form="myForm" disabled={isSubmitting}>
                    로그인
                </AuthButton>
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
