import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import orderRoutes from './routes/orders.js'

dotenv.config()

const app = express()

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`GrabExpress API running on port ${PORT}`))
