interface Props {
    token: string;
    url: string;
    linkId: number;
}
interface Response {
    id: number;
    favorite: boolean;
    url: string;
    title: string;
    imageSource: string;
    description: string;
    createdAt: string;
}

export default async function PutLink({ token, url, linkId }: Props): Promise<Response> {
    const response = await fetch(`https://linkbrary-api.vercel.app/17-5/links/${linkId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token} `,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
    });
    if (!response.ok) {
        throw new Error();
    }
    return response.json();
}
