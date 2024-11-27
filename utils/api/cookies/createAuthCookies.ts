import {request} from "@playwright/test";

let sid;
export default async function createAuthCookie(email: string, password: string) {

    const contextRequest = await request.newContext()
    const response = await contextRequest.post('/api/auth/signin', {
        data: {
            "email": email,
            "password": password,
            "remember": false
        }
    })
    const cookie = response.headers()['set-cookie'];
    console.log(response.headers())
    if (cookie) {
        const cookiesArray = cookie.split('\n');
        for (const cookie of cookiesArray) {
            if (cookie.trim().startsWith('sid=')) {
                sid = (cookie.trim().split('=')[1]).split(';')[0];
                break;
            }
        }
    }
    return sid;
}