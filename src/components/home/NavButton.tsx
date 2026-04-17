import { PropsWithChildren } from 'react';

export default function NavButton({ children }: PropsWithChildren) {
    return <button className="px-6 py-3.5 bg-white rounded-4xl text-gray-1 max-sm:px-4 max-sm:py-2">{children}</button>;
}
