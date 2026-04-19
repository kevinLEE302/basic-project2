import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <div className="bg-gray-E h-40 py-8 ">
            <div className=" w-[min(1040px,calc(100%-56px))] grid grid-cols-3 mx-auto h-full max-md:grid-cols-2">
                <p className="max-md:order-3 max-md:self-end text-sixteen max-md:text-fourteen font-normal text-gray-B">
                    ©codeit - 2025
                </p>
                <div className="max-md:justify-start max-md:order-1 flex justify-center gap-[30px] ">
                    <Link href={'/privacy'} className="text-sixteen max-md:text-fourteen font-normal text-gray-7">
                        Privacy Policy
                    </Link>
                    <Link className="text-sixteen max-md:text-fourteen font-normal text-gray-7" href={'/faq'}>
                        FAQ
                    </Link>
                </div>
                <div className="max-md:order-2 flex gap-3 justify-end ">
                    <Link href="https://www.facebook.com/">
                        <Image src="/home/icons/facebook-icon.png" alt="facebook" width={20} height={20} />
                    </Link>
                    <Link href="https://www.twitter.com/">
                        <Image src="/home/icons/twitter-icon.png" alt="facebook" width={20} height={20} />
                    </Link>
                    <Link href="https://www.youtube.com/">
                        <Image src="/home/icons/youtube-icon.png" alt="facebook" width={20} height={20} />
                    </Link>
                    <Link href="https://www.instagram.com/">
                        <Image src="/home/icons/instagram-icon.png" alt="facebook" width={20} height={20} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
