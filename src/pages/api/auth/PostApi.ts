interface Signin {
    email: string;
    password: string;
}
interface SigninResponse {
    accessToken: string;
}
interface SignUp {
    email: string;
    password: string;
    name: string;
}

async function PostSignIn(data: Signin): Promise<SigninResponse> {
    const response = await fetch('https://linkbrary-api.vercel.app/17-5/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error();
    }
    return response.json();
}
async function PostSignUp(data: SignUp) {
    const response = await fetch('https://linkbrary-api.vercel.app/17-5/auth/sign-up', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error();
    }
    return response.json();
}
async function PostCheckEmail(data: { email: string }) {
    const response = await fetch('https://linkbrary-api.vercel.app/17-5/users/check-email', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data),
    });
    return response;
}
export { PostSignIn, PostSignUp, PostCheckEmail };
