type button = {
    children: string;
    disabled?: boolean;
    form: string;
};
export default function AuthButton({ children, disabled = false, form }: button) {
    return (
        <button
            className="py-[14px] w-full bg-white text-eighteen font-semibold text-gray-1 rounded-4xl "
            disabled={disabled}
            form={form}
            type="submit"
        >
            {children}
        </button>
    );
}
