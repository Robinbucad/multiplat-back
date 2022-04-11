import { app, server } from '../app'
import request from 'supertest'
import { UserModel } from '../TYPES'


describe.skip('Testing the App Login and Register', () => {

    beforeAll(async() => {
        await request(app).delete('/users').send()
    })
    it('Should return 201 if user sign Up succesfully', async():Promise<void> => {
        const user:UserModel = {
            email: "kaxal14855@procowork.com",
            name:"Robin",
            username:"BucadRobin",
            password:"12",
            date:"27-03-2000"
        }

        const res =  await request(app).post('/auth/register').send(user)
        expect(res.status).toBe(201)
    } )

    it ('Should return 201 when user get validated', async ():Promise<void> => {
        const res = await request(app).get('/auth/validate?token=').send()
        expect(res.status).toBe(200)
        
    })

    it ('Should return 201 when user sign up or 409 if user is logged', async ():Promise<void> => {
        const res = await request(app).post('/auth/login').send({
            email:'kaxal14855@procowork.com',
            password:'12'
        })
        expect(res.status).toBe(201 || 409)
        
    })
   
    afterAll(() => {
        server.close()
    })
})
