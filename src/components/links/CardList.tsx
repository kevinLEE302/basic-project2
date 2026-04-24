import Card from './Card';

interface Link {
    id: number;
    favorite: boolean;
    url: string;
    title: string;
    imageSource: string;
    description: string;
    createdAt: string;
}
interface Prop {
    links: Link[];
}
export default function CardList({ links }: Prop) {
    return (
        <div className="grid gap-5 max-sm:gap-6 grid-cols-3  max-md:grid-cols-2  max-sm:grid-cols-1 mt-8 mb-16 max-md:mt-6 max-md:mb-12 max-sm:mt-4 max-sm:mb-8">
            <Card links={links} />
        </div>
    );
}
