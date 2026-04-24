interface Props {
    token: string;
    linkId: number;
}

export default async function deleteLink({ token, linkId }: Props) {
    const response = await fetch(`https://linkbrary-api.vercel.app/17-5/links/${linkId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}
