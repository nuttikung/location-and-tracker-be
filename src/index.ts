import express, { type Express, type Request, type Response } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

const app: Express = express()
// TODO: load from env
const port = 3000

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.get('/hello-world', (req: Request, res: Response) => {
  res.json({ message: 'it works' })
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
