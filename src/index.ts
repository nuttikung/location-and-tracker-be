import 'dotenv/config'
import express, { type Express } from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { userRoute } from '@/routes'
import { errorHandler, notFound } from '@/middlewares'
import methodOverride from 'method-override'

const app: Express = express()
const port = process.env.PORT ?? 3000

app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json())
app.use(methodOverride())

app.use('/user', userRoute)

app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
