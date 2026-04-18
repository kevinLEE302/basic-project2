import Image from 'next/image';

type Input = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    value: string;
    type: string;
    eye?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function Input({ placeholder = '', onChange, value, type, eye = false, onClick }: Input) {
    return (
        <div className="w-full relative">
            <input
                className="placholder:text-sixteen placeholder:font-normal placeholder:text-gray-B text-sixteen font-normal w-full rounded-md border border-gray-7 bg-gray-2 py-4 px-[14px] focus:border-gray-E text-white max-sm:text-fourteen max-sm:py-3  "
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                type={type}
            />
            {onClick && (
                <button onClick={onClick} className="absolute w-4 h-4 right-[14px] top-4 ">
                    {eye ? (
                        <Image src="/auth/eye-on.png" alt="눈" width={16} height={16} />
                    ) : (
                        <Image src="/auth/eye-off.png" alt="눈" width={16} height={16} />
                    )}
                </button>
            )}
        </div>
    );
}
