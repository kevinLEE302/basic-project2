interface Props {
    name: string;
    token: string;
}
interface Response {
    id: number;
    createdAt: string;
    name: string;
}
export default async function PostFolder({ name, token }: Props): Promise<Response> {
    const response = await fetch('https://linkbrary-api.vercel.app/17-5/folders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
    });
    if (!response.ok) {
        throw new Error();
    }
    return response.json();
}
