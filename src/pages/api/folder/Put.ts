interface Props {
    token: string;
    folderId: number;
    name: string;
}
export default async function PutFolder({ folderId, token, name }: Props): Promise<Props> {
    const response = await fetch(`https://linkbrary-api.vercel.app/17-5/folders/${folderId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
    });
    if (!response.ok) {
        throw new Error();
    }
    const data = response.json();
    return data;
}
