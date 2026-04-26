import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FiMapPin, FiPackage, FiUser, FiPhone, FiFileText, FiCheckCircle } from 'react-icons/fi'

const API = 'http://localhost:5000/api'

const SIZES = [
  { value: 'small', label: 'Small', desc: 'Documents, envelopes (up to 1 kg)', price: 50 },
  { value: 'medium', label: 'Medium', desc: 'Shoes, clothing, books (1–5 kg)', price: 90 },
  { value: 'large', label: 'Large', desc: 'Electronics, appliances (5–20 kg)', price: 150 },
]

const SERVICES = [
  { value: 'instant', label: 'Instant', desc: 'Within 1–2 hours', multiplier: 2.0, color: 'text-orange-600 bg-orange-50 border-orange-200' },
  { value: 'same_day', label: 'Same Day', desc: 'By end of day', multiplier: 1.5, color: 'text-grab-green bg-grab-light border-grab-green/30' },
  { value: 'next_day', label: 'Next Day', desc: 'By tomorrow', multiplier: 1.0, color: 'text-blue-600 bg-blue-50 border-blue-200' },
]

export default function SendPackage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [order, setOrder] = useState(null)
  const [form, setForm] = useState({
    pickup_address: '',
    dropoff_address: '',
    recipient_name: '',
    recipient_phone: '',
    package_size: 'small',
    package_weight: '',
    service_type: 'same_day',
    notes: '',
  })

  const selectedSize = SIZES.find(s => s.value === form.package_size)
  const selectedService = SERVICES.find(s => s.value === form.service_type)
  const estimatedPrice = selectedSize && selectedService
    ? Math.round(selectedSize.price * selectedService.multiplier)
    : 0

  const update = (field, val) => setForm(prev => ({ ...prev, [field]: val }))

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await axios.post(`${API}/orders`, { ...form, price: estimatedPrice })
      setOrder(res.data.order)
      setStep(3)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order')
    } finally {
      setLoading(false)
    }
  }

  if (step === 3 && order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full card text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheckCircle className="w-9 h-9 text-grab-green" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Placed!</h2>
          <p className="text-gray-500 mb-6">Your package is confirmed and a rider will pick it up shortly.</p>
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tracking Number</span>
              <span className="font-bold text-grab-green font-mono">{order.tracking_number}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Service</span>
              <span className="font-medium capitalize">{order.service_type.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Amount</span>
              <span className="font-bold text-gray-900">₱{order.price}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => navigate('/track')} className="btn-outline flex-1">Track Order</button>
            <button onClick={() => { setStep(1); setForm({ pickup_address: '', dropoff_address: '', recipient_name: '', recipient_phone: '', package_size: 'small', package_weight: '', service_type: 'same_day', notes: '' }) }} className="btn-primary flex-1">Send Another</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Send a Package</h1>
        <p className="text-gray-500 mb-8">Fill in the delivery details below</p>

        {/* Steps indicator */}
        <div className="flex items-center gap-2 mb-8">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-grab-green text-white' : 'bg-gray-200 text-gray-500'}`}>{s}</div>
              <span className={`text-sm ${step >= s ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>{s === 1 ? 'Delivery Details' : 'Package & Service'}</span>
              {s < 2 && <div className={`h-0.5 w-12 ${step > s ? 'bg-grab-green' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="card space-y-5">
            <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2"><FiMapPin className="text-grab-green" /> Delivery Addresses</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Pickup Address</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-grab-green rounded-full" />
                <input value={form.pickup_address} onChange={e => update('pickup_address', e.target.value)} className="input-field pl-8" placeholder="Enter full pickup address" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Drop-off Address</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full" />
                <input value={form.dropoff_address} onChange={e => update('dropoff_address', e.target.value)} className="input-field pl-8" placeholder="Enter full drop-off address" required />
              </div>
            </div>

            <hr />
            <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2"><FiUser className="text-grab-green" /> Recipient Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Recipient Name</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input value={form.recipient_name} onChange={e => update('recipient_name', e.target.value)} className="input-field pl-9" placeholder="Full name" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Recipient Phone</label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input value={form.recipient_phone} onChange={e => update('recipient_phone', e.target.value)} className="input-field pl-9" placeholder="09XX-XXX-XXXX" required />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Notes (Optional)</label>
              <div className="relative">
                <FiFileText className="absolute left-3 top-3.5 text-gray-400 w-4 h-4" />
                <textarea value={form.notes} onChange={e => update('notes', e.target.value)} className="input-field pl-9 resize-none" rows={3} placeholder="Leave at doorstep, fragile, etc." />
              </div>
            </div>

            <button
              onClick={() => {
                if (!form.pickup_address || !form.dropoff_address || !form.recipient_name || !form.recipient_phone) {
                  toast.error('Please fill in all required fields')
                  return
                }
                setStep(2)
              }}
              className="btn-primary w-full text-center"
            >
              Continue →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="card space-y-6">
            <h2 className="font-bold text-lg text-gray-900 flex items-center gap-2"><FiPackage className="text-grab-green" /> Package Details</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Package Size</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SIZES.map(size => (
                  <button
                    key={size.value}
                    type="button"
                    onClick={() => update('package_size', size.value)}
                    className={`border-2 rounded-xl p-4 text-left transition-all ${form.package_size === size.value ? 'border-grab-green bg-grab-light' : 'border-gray-200 hover:border-gray-300'}`}
                  >
                    <p className="font-bold text-gray-900 text-sm">{size.label}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{size.desc}</p>
                    <p className="text-grab-green font-bold mt-1 text-sm">from ₱{size.price}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Weight (kg) — Optional</label>
              <input type="number" min="0" step="0.1" value={form.package_weight} onChange={e => update('package_weight', e.target.value)} className="input-field" placeholder="e.g. 1.5" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Delivery Service</label>
              <div className="space-y-3">
                {SERVICES.map(svc => (
                  <button
                    key={svc.value}
                    type="button"
                    onClick={() => update('service_type', svc.value)}
                    className={`w-full border-2 rounded-xl p-4 flex items-center justify-between transition-all ${form.service_type === svc.value ? `border-current ${svc.color}` : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                  >
                    <div className="text-left">
                      <p className="font-bold text-sm text-gray-900">{svc.label} Delivery</p>
                      <p className="text-xs text-gray-500">{svc.desc}</p>
                    </div>
                    <p className="font-bold text-gray-900 text-sm">₱{Math.round(selectedSize.price * svc.multiplier)}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-grab-light rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Estimated Total</p>
                <p className="text-2xl font-bold text-grab-green">₱{estimatedPrice}</p>
              </div>
              <div className="text-right text-xs text-gray-500">
                <p>{selectedSize?.label} package</p>
                <p>{selectedService?.label} delivery</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="btn-outline flex-1">← Back</button>
              <button onClick={handleSubmit} disabled={loading} className="btn-primary flex-1 disabled:opacity-60">
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
