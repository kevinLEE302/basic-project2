interface Delete {
    folderId: number | null;
    token: string;
}

export default async function deleteFolder({ folderId, token }: Delete) {
    const response = await fetch(`https://linkbrary-api.vercel.app/17-5/folders/${folderId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
        throw new Error();
    }
}
