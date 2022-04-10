import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import AuthRouter from './auth/auth.router'
import UsersRouter from './users/users.router'
import cors from 'cors'

dotenv.config()

export const app = express()
const port = process.env.port || 4000
export const server = http.createServer(app)

app.use(express.json())
app.use(cors())
//app.use(express.urlencoded({extended:'utf-8'}))


app.get('/ping', (req, res) => {
	res.send('pong')
})

app.use('/auth', AuthRouter);
app.use('/users', UsersRouter)

server.listen(port, () => console.log(`Se ha iniciado en el puerto ${port}`))
