import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'

const app: Express = express()
// TODO: load from env
const port = 3000

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
