import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import bp from 'body-parser'
import path from 'path'
import cookieParser from 'cookie-parser'
import 'colors'

import userRoutes from './routes/userRoutes.js'
import bookRoutes from './routes/bookRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/books', bookRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, '/frontend/build')))

const PORT = process.env.PORT
app.listen(PORT, console.log(`server on port ${PORT}`.yellow.bold))
