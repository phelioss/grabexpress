import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiPlus } from 'react-icons/fi'

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

export default function Dashboard() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`${API}/orders/my`)
      .then(res => setOrders(res.data.orders || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const stats = {
    total: orders.length,
    active: orders.filter(o => !['delivered', 'cancelled'].includes(o.status)).length,
    delivered: orders.filter(o => o.status === 'delivered').length,
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0]}!</h1>
            <p className="text-gray-500 text-sm mt-0.5">Here's an overview of your deliveries</p>
          </div>
          <Link to="/send" className="btn-primary flex items-center gap-2">
            <FiPlus className="w-4 h-4" /> Send Package
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="card flex items-center gap-4">
            <div className="bg-grab-light p-3 rounded-xl"><FiPackage className="text-grab-green w-6 h-6" /></div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Total Orders</p>
            </div>
          </div>
          <div className="card flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-xl"><FiTruck className="text-orange-500 w-6 h-6" /></div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
              <p className="text-sm text-gray-500">Active Deliveries</p>
            </div>
          </div>
          <div className="card flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-xl"><FiCheckCircle className="text-green-500 w-6 h-6" /></div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.delivered}</p>
              <p className="text-sm text-gray-500">Delivered</p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="card">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900">Recent Orders</h2>
            <Link to="/history" className="text-sm text-grab-green font-semibold hover:underline">View All</Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-grab-green border-t-transparent" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiPackage className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-4">No orders yet</p>
              <Link to="/send" className="btn-primary inline-flex items-center gap-2">
                <FiPlus className="w-4 h-4" /> Send Your First Package
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 5).map(order => (
                <div key={order.id} className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded-lg border border-gray-100">
                      <FiPackage className="w-5 h-5 text-grab-green" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm font-mono">{order.tracking_number}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{order.dropoff_address}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor(order.status)}`}>
                      {order.status?.replace(/_/g, ' ')}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">₱{order.price}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
