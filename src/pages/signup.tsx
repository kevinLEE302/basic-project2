import AuthButton from '@/components/auth/AuthButton';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignUpFormData, SignUpSchema } from './schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostCheckEmail, PostSignUp } from './api/auth/PostApi';
import clsx from 'clsx';

export default function SignupPage() {
    const [passwordEye, setPasswordEye] = useState(false);
    const [confirmEye, setConfirmEye] = useState(false);
    const [checkEmail, setCheckEmail] = useState<string | null>(null);
    const [check, setCheck] = useState(false);
    const router = useRouter();

    //비밀번호 토글
    const handlePasswordClick = () => {
        setPasswordEye((prev) => !prev);
    };
    const handlePasswordConfirmClick = () => {
        setConfirmEye((prev) => !prev);
    };

    //zod
    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(SignUpSchema),
    });

    //이메일 중복 확인
    const handleCheckClick = async () => {
        const emailValue = getValues('email');
        setCheck(false);
        try {
            const res = await PostCheckEmail({ email: emailValue });
            if (res.status === 200) {
                setCheckEmail('yes');
            } else if (res.status === 409) {
                setCheckEmail('no');
            }
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
            }
        }
    };
    const onSubmit = async (data: SignUpFormData) => {
        if (checkEmail !== 'yes') {
            setCheck(true);
            return;
        }
        try {
            await PostSignUp(data);
            localStorage.setItem('name', data.name);
            router.push('/login');
        } catch (e) {
            if (e instanceof Error) {
                console.log(e.message);
            }
        }
    };
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
                <form className="flex flex-col gap-6 w-full" id="myForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-3 items-start">
                        <label className="text-white text-fourteen font-normal">이메일</label>
                        <div className="w-full relative flex flex-col gap-2">
                            <input
                                className={clsx(
                                    'placholder:text-sixteen placeholder:font-normal border placeholder:text-gray-B text-sixteen font-normal w-full rounded-md  bg-gray-2 py-4 px-[14px]  text-white max-sm:text-fourteen max-sm:py-3',
                                    {
                                        'border-system-error focus:border-system-error': errors.email,
                                        'border-system-success focus:border-system-success': checkEmail === 'yes',
                                        'border-gray-7 focus:border-gray-E': !errors.email && checkEmail !== 'yes',
                                    },
                                )}
                                placeholder="이메일을 입력해주세요"
                                type="email"
                                {...register('email', {
                                    onChange: () => {
                                        setCheckEmail(null);
                                    },
                                })}
                            />
                            <button
                                type="button"
                                className="px-3 py-1.5 bg-white text-fourteen font-semibold rounded-md absolute right-[14px] top-3"
                                onClick={handleCheckClick}
                            >
                                중복 확인
                            </button>
                            {checkEmail === 'yes' && (
                                <p className="text-system-success text-fourteen font-normal">
                                    사용 가능한 이메일 입니다
                                </p>
                            )}
                            {checkEmail === 'no' && (
                                <p className="text-system-error text-fourteen font-normal">중복된 이메일입니다</p>
                            )}
                            {errors.email && (
                                <p className="text-system-error text-fourteen font-normal">{errors.email.message}</p>
                            )}
                            {check && <p className="text-system-error text-fourteen font-normal">중복 확인 해주세요</p>}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 items-start">
                        <label className="text-white text-fourteen font-normal">이름</label>
                        <div className="w-full relative flex flex-col gap-2">
                            <input
                                className={
                                    errors.name
                                        ? `placholder:text-sixteen placeholder:font-normal placeholder:text-gray-B text-sixteen font-normal w-full rounded-md border border-system-error focus:border-system-error outline-none bg-gray-2 py-4 px-[14px] text-white max-sm:text-fourteen max-sm:py-3`
                                        : 'placholder:text-sixteen placeholder:font-normal placeholder:text-gray-B text-sixteen font-normal w-full rounded-md border border-gray-7 bg-gray-2 py-4 px-[14px] focus:border-gray-E text-white max-sm:text-fourteen max-sm:py-3'
                                }
                                placeholder="이름"
                                type="text"
                                {...register('name')}
                            />
                            {errors.name && (
                                <p className="text-system-error text-fourteen font-normal">{errors.name.message}</p>
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
                                type={passwordEye ? 'text' : 'password'}
                                {...register('password')}
                            />
                            {errors.password && (
                                <p className="text-system-error text-fourteen font-normal">{errors.password.message}</p>
                            )}
                            <button
                                onClick={handlePasswordClick}
                                className="absolute w-4 h-4 right-[14px] top-4"
                                type="button"
                            >
                                {passwordEye ? (
                                    <Image src="/auth/eye-on.png" alt="눈" width={16} height={16} />
                                ) : (
                                    <Image src="/auth/eye-off.png" alt="눈" width={16} height={16} />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 items-start">
                        <label className="text-white text-fourteen font-normal">비밀번호 확인</label>
                        <div className="w-full relative flex flex-col gap-2">
                            <input
                                className={
                                    errors.confirmPassword
                                        ? `placholder:text-sixteen placeholder:font-normal placeholder:text-gray-B text-sixteen font-normal w-full rounded-md border border-system-error focus:border-system-error outline-none bg-gray-2 py-4 px-[14px] text-white max-sm:text-fourteen max-sm:py-3`
                                        : 'placholder:text-sixteen placeholder:font-normal placeholder:text-gray-B text-sixteen font-normal w-full rounded-md border border-gray-7 bg-gray-2 py-4 px-[14px] focus:border-gray-E text-white max-sm:text-fourteen max-sm:py-3'
                                }
                                placeholder="비밀번호 확인"
                                type={confirmEye ? 'text' : 'password'}
                                {...register('confirmPassword')}
                            />
                            {errors.confirmPassword && (
                                <p className="text-system-error text-fourteen font-normal">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                            <button
                                onClick={handlePasswordConfirmClick}
                                className="absolute w-4 h-4 right-[14px] top-4"
                                type="button"
                            >
                                {confirmEye ? (
                                    <Image src="/auth/eye-on.png" alt="눈" width={16} height={16} />
                                ) : (
                                    <Image src="/auth/eye-off.png" alt="눈" width={16} height={16} />
                                )}
                            </button>
                        </div>
                    </div>
                </form>
                <AuthButton disabled={isSubmitting} form="myForm">
                    회원가입
                </AuthButton>
            </div>
        </div>
    );
}
