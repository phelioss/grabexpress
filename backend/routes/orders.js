import { Router } from 'express'
import pool from '../db.js'
import auth from '../middleware/auth.js'

const router = Router()

function generateTracking() {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `GE-${date}-${rand}`
}

// Create order
router.post('/', auth, async (req, res) => {
  const { pickup_address, dropoff_address, recipient_name, recipient_phone, package_size, package_weight, service_type, notes, price } = req.body
  if (!pickup_address || !dropoff_address || !recipient_name || !recipient_phone) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const tracking_number = generateTracking()
  try {
    const [result] = await pool.query(
      `INSERT INTO orders (tracking_number, sender_id, pickup_address, dropoff_address, recipient_name, recipient_phone, package_size, package_weight, service_type, notes, price, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [tracking_number, req.user.id, pickup_address, dropoff_address, recipient_name, recipient_phone,
       package_size || 'small', package_weight || null, service_type || 'same_day', notes || null, price || 0]
    )
    const [rows] = await pool.query('SELECT * FROM orders WHERE id = ?', [result.insertId])
    res.status(201).json({ order: rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get my orders
router.get('/my', auth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM orders WHERE sender_id = ? ORDER BY created_at DESC',
      [req.user.id]
    )
    res.json({ orders: rows })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// Track by tracking number (public)
router.get('/track/:tracking_number', async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT tracking_number, pickup_address, dropoff_address, recipient_name, service_type, status, package_size, price, created_at FROM orders WHERE tracking_number = ?',
      [req.params.tracking_number]
    )
    if (rows.length === 0) return res.status(404).json({ message: 'Order not found' })
    res.json({ order: rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// Get single order by id
router.get('/:id', auth, async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM orders WHERE id = ? AND sender_id = ?', [req.params.id, req.user.id])
    if (rows.length === 0) return res.status(404).json({ message: 'Order not found' })
    res.json({ order: rows[0] })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
