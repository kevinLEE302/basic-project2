interface AddLink {
    url: string;
    folderId: number;
    token: string;
}
interface Link {
    id: number;
    favorite: boolean;
    url: string;
    title: string;
    imageSource: string;
    description: string;
    createdAt: string;
}
async function PostAddLink({ url, folderId, token }: AddLink): Promise<Link> {
    const response = await fetch(`https://linkbrary-api.vercel.app/17-5/links`, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        method: 'POST',
        body: JSON.stringify({ url, folderId }),
    });
    if (!response.ok) {
        throw new Error();
    }
    return response.json();
}
export { PostAddLink };
