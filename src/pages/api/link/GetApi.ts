interface AllUser {
    page: number;
    pageSize: number;
    search: string;
    token: string;
}
interface User {
    page: number;
    pageSize: number;
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
interface LinkResponse {
    totalCount: number;
    list: Link[];
}

async function getAllLink({ token, page, pageSize, search }: AllUser): Promise<LinkResponse> {
    const response = await fetch(
        `https://linkbrary-api.vercel.app/17-5/links?page=${page}&pageSize=${pageSize}&search=${search}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    );
    if (!response.ok) {
        throw new Error();
    }
    return response.json();
}
async function getLink({ folderId, pageSize, page, token }: User): Promise<LinkResponse> {
    const response = await fetch(
        `https://linkbrary-api.vercel.app/17-5/folders/${folderId}/links?page=${[page]}&pageSize=${pageSize}`,
        {
            headers: { Authorization: `Bearer ${token}` },
        },
    );
    if (!response.ok) {
        throw new Error();
    }
    return response.json();
}
export { getAllLink, getLink };
