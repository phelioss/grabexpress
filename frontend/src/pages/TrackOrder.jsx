import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FiSearch, FiMapPin, FiPackage, FiCheckCircle, FiTruck, FiClock, FiXCircle } from 'react-icons/fi'

const API = 'http://localhost:5000/api'

const STATUS_STEPS = [
  { key: 'pending', label: 'Order Placed', icon: FiClock },
  { key: 'confirmed', label: 'Confirmed', icon: FiCheckCircle },
  { key: 'picked_up', label: 'Picked Up', icon: FiPackage },
  { key: 'in_transit', label: 'In Transit', icon: FiTruck },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: FiMapPin },
  { key: 'delivered', label: 'Delivered', icon: FiCheckCircle },
]

const STATUS_ORDER = ['pending', 'confirmed', 'picked_up', 'in_transit', 'out_for_delivery', 'delivered']

export default function TrackOrder() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleTrack = async (e) => {
    e.preventDefault()
    if (!trackingNumber.trim()) return
    setLoading(true)
    try {
      const res = await axios.get(`${API}/orders/track/${trackingNumber.trim()}`)
      setResult(res.data.order)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Order not found')
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  const currentStep = result ? STATUS_ORDER.indexOf(result.status) : -1
  const isCancelled = result?.status === 'cancelled'

  const statusBadge = (status) => {
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

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
        <p className="text-gray-500 mb-8">Enter your tracking number to get real-time updates</p>

        <form onSubmit={handleTrack} className="card mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tracking Number</label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                value={trackingNumber}
                onChange={e => setTrackingNumber(e.target.value)}
                className="input-field pl-10"
                placeholder="e.g. GE-20240101-ABCD"
              />
            </div>
            <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60 whitespace-nowrap">
              {loading ? 'Tracking...' : 'Track'}
            </button>
          </div>
        </form>

        {result && (
          <div className="card">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">Tracking Number</p>
                <p className="font-bold text-lg text-gray-900 font-mono">{result.tracking_number}</p>
              </div>
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full capitalize ${statusBadge(result.status)}`}>
                {result.status.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 rounded-xl p-4 text-sm">
              <div>
                <p className="text-gray-400 text-xs mb-1">From</p>
                <p className="text-gray-900 font-medium">{result.pickup_address}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">To</p>
                <p className="text-gray-900 font-medium">{result.dropoff_address}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Recipient</p>
                <p className="text-gray-900 font-medium">{result.recipient_name}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Service</p>
                <p className="text-gray-900 font-medium capitalize">{result.service_type?.replace('_', ' ')}</p>
              </div>
            </div>

            {isCancelled ? (
              <div className="flex items-center gap-3 bg-red-50 rounded-xl p-4 text-red-600">
                <FiXCircle className="w-6 h-6 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Order Cancelled</p>
                  <p className="text-sm text-red-500">This order has been cancelled.</p>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-4">Delivery Progress</p>
                <div className="space-y-0">
                  {STATUS_STEPS.map((step, idx) => {
                    const done = idx <= currentStep
                    const active = idx === currentStep
                    const Icon = step.icon
                    return (
                      <div key={step.key} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${done ? 'bg-grab-green border-grab-green text-white' : 'bg-white border-gray-200 text-gray-400'} ${active ? 'ring-4 ring-grab-green/20' : ''}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          {idx < STATUS_STEPS.length - 1 && (
                            <div className={`w-0.5 h-8 ${idx < currentStep ? 'bg-grab-green' : 'bg-gray-200'}`} />
                          )}
                        </div>
                        <div className="pb-6">
                          <p className={`text-sm font-semibold ${done ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</p>
                          {active && <p className="text-xs text-grab-green mt-0.5">Current status</p>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
