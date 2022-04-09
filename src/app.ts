import express from 'express'

const app = express()
const port = 4000

app.get('/ping', (req, res) => {
	res.send('pong')
})

app.listen(port, () => console.log(`Se ha iniciado en el puerto ${port}`))
