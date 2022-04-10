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
        const res = await request(app).get('/auth/validate?token=576aebeb8e7a5c12130af9ce79a0a4b4be42e94fd91ab0d6ea9df83435d516741e56275104557249200ad156ba6a3ce017841f18b8fa4b2a2d906c2163945bc3c9d2ad1aea7863060d72c58fcad2643f7e8c98ed491218ca919e29f848c1c95fcb593f1f6f95eafa6388f660825374f4281aeacc6aa3273ab8329de1d0769ff1').send()
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
