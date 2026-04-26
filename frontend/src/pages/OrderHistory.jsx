import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FiPackage, FiSearch, FiFilter } from 'react-icons/fi'

const API = 'http://localhost:5000/api'

const statusColor = (status) => {
  const map = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-blue-700',
    picked_up: 'bg-purple-100 text-purple-700',
    in_transit: 'bg-orange-100 text-orange-700',
    out_for_delivery: 'bg-indigo-100 text-indigo-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  }
  return map[status] || 'bg-gray-100 text-gray-700'
}

export default function OrderHistory() {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    axios.get(`${API}/orders/my`)
      .then(res => setOrders(res.data.orders || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = orders.filter(o => {
    const matchSearch = o.tracking_number?.toLowerCase().includes(search.toLowerCase()) ||
      o.dropoff_address?.toLowerCase().includes(search.toLowerCase()) ||
      o.recipient_name?.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || o.status === filter
    return matchSearch && matchFilter
  })

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order History</h1>
        <p className="text-gray-500 mb-8">All your past and current deliveries</p>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-9 py-2.5 text-sm"
              placeholder="Search by tracking no., address, or recipient..."
            />
          </div>
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select value={filter} onChange={e => setFilter(e.target.value)} className="input-field pl-9 py-2.5 text-sm pr-8 appearance-none cursor-pointer">
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="picked_up">Picked Up</option>
              <option value="in_transit">In Transit</option>
              <option value="out_for_delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-grab-green border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="card text-center py-16">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiPackage className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-2">{orders.length === 0 ? 'No orders yet' : 'No matching orders'}</p>
            {orders.length === 0 && <Link to="/send" className="btn-primary inline-block mt-2">Send a Package</Link>}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(order => (
              <div key={order.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-gray-900 font-mono">{order.tracking_number}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{new Date(order.created_at).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${statusColor(order.status)}`}>
                    {order.status?.replace(/_/g, ' ')}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-0.5">From</p>
                    <p className="text-gray-700 font-medium text-xs leading-snug">{order.pickup_address}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-0.5">To</p>
                    <p className="text-gray-700 font-medium text-xs leading-snug">{order.dropoff_address}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-0.5">Recipient</p>
                    <p className="text-gray-700 font-medium text-xs">{order.recipient_name}</p>
                    <p className="text-gray-500 text-xs">{order.recipient_phone}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="capitalize">{order.package_size} package</span>
                    <span>·</span>
                    <span className="capitalize">{order.service_type?.replace('_', ' ')}</span>
                    <span>·</span>
                    <span className="font-bold text-gray-900">₱{order.price}</span>
                  </div>
                  <button
                    onClick={() => navigate(`/track?id=${order.tracking_number}`)}
                    className="text-xs text-grab-green font-semibold hover:underline"
                  >
                    Track →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
