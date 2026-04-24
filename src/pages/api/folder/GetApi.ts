interface Folder {
    id: number;
    createdAt: string;
    name: string;
    linkCount: number;
}

async function getAllFolder(token: string): Promise<Folder[]> {
    const response = await fetch('https://linkbrary-api.vercel.app/17-5/folders', {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
        throw new Error();
    }
    return response.json();
}
export { getAllFolder };
