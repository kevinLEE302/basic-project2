type Input = {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    value: string;
    type: string;
};

export default function Input({ placeholder = '', onChange, value, type }: Input) {
    return (
        <input
            className="placholder:text-sixteen placeholder:font-normal placeholder:text-gray-B text-sixteen font-normal w-full rounded-md border border-gray-7 bg-gray-2 py-4 px-[14px] focus:border-gray-E text-white max-sm:text-fourteen max-sm:py-3  "
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            type={type}
        />
    );
}
