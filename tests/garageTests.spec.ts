import {test, expect} from '@playwright/test';
import {users} from "../test-data/credentials"
import createAuthCookie from "../utils/api/cookies/createAuthCookies";


test.describe('API Test BeforeEach', () => {

    let sid: string;
    test.beforeAll(async () => {
        sid = await createAuthCookie(users.mainUser.email, users.mainUser.password)
    })

    test('Get cars test', async ({request}) => {
        const response = await request.get('/api/cars/', {
            headers: {
                'Cookie' : `sid=${sid}`
            }
        });
        const body = await response.json()
        console.log(body)
    })
    test('Create car test (positive)', async ({request}) => {
        const response = await request.post('/api/cars/', {
            headers: {
                'Cookie' : `sid=${sid}`
            },
            data: {
                carBrandId: 1,
                carModelId: 1,
                mileage: 122
            }
        });

        expect(response.status()).toBe(201);
        const responseBody = await response.json()
        expect(responseBody.status).toBe('ok');
        expect(responseBody.data).toMatchObject({
            carBrandId: 1,
            carModelId: 1,
            brand: 'Audi',
            model: 'TT',
            mileage: 122,
            logo: 'audi.png',
        });
    })
    test('Create car test (negative test 1). Route or entity not found', async ({request}) => {
        const response = await request.post('/api/cars/', {
            headers: {
                'Cookie' : `sid=${sid}`
            },
            data: {
                carBrandId: 0,
                carModelId: 0,
                mileage: 0
            }
        });

        expect(response.status()).toBe(404);
        const responseBody = await response.json()
        expect(responseBody.status).toBe('error');
    })
    test('Create car test (negative test 2). User is not logged in', async ({request}) => {
        const response = await request.post('/api/cars/', {
            headers: {
                'Cookie' : `sid=0`
            }
        });

        expect(response.status()).toBe(401);
        const responseBody = await response.json()
        expect(responseBody.status).toBe('error');
    })
})