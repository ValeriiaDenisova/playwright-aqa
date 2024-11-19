import test, {expect} from "@playwright/test";

test("Cars models API", async ({request}) => {

    const response = await request.get('/api/cars/models');
    const body = await response.json()

    console.log(response)
    console.log(body)

    const allCars = body.data
    console.log(allCars)

    const carTitle = allCars[10].title
    console.log("TITLE: " + carTitle)

    expect(allCars.length).toEqual(23)
})

test("Cars API", async ({request}) => {

    const authRequest = await request.post('/api/auth/signin', {
        data: {
            "email": "test@test.com",
            "password": "Qwerty12345",
            "rememberMe": false
        }
    });


    const response = await request.get('/api/cars/');
    const body = await response.json()

    console.log(response)
    console.log(body)

})