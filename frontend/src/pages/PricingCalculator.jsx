import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPackage, FiTruck } from 'react-icons/fi'

const SIZES = [
  { value: 'small', label: 'Small', desc: 'Documents, envelopes', weight: 'Up to 1 kg', base: 50 },
  { value: 'medium', label: 'Medium', desc: 'Shoes, clothing, books', weight: '1–5 kg', base: 90 },
  { value: 'large', label: 'Large', desc: 'Electronics, appliances', weight: '5–20 kg', base: 150 },
]

const SERVICES = [
  { value: 'instant', label: 'Instant Delivery', desc: 'Within 1–2 hours', multiplier: 2.0, tag: 'Fastest', tagColor: 'bg-orange-100 text-orange-600' },
  { value: 'same_day', label: 'Same Day', desc: 'By end of day', multiplier: 1.5, tag: 'Popular', tagColor: 'bg-grab-light text-grab-green' },
  { value: 'next_day', label: 'Next Day', desc: 'By tomorrow', multiplier: 1.0, tag: 'Best Value', tagColor: 'bg-blue-100 text-blue-600' },
]

export default function PricingCalculator() {
  const [size, setSize] = useState('small')
  const [service, setService] = useState('same_day')

  const selectedSize = SIZES.find(s => s.value === size)
  const selectedService = SERVICES.find(s => s.value === service)
  const price = Math.round(selectedSize.base * selectedService.multiplier)

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pricing Calculator</h1>
        <p className="text-gray-500 mb-8">Estimate your delivery cost before booking</p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><FiPackage className="text-grab-green" /> Package Size</h2>
            <div className="space-y-3">
              {SIZES.map(s => (
                <button
                  key={s.value}
                  onClick={() => setSize(s.value)}
                  className={`w-full border-2 rounded-xl p-4 text-left transition-all ${size === s.value ? 'border-grab-green bg-grab-light' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-900">{s.label}</p>
                      <p className="text-sm text-gray-500">{s.desc}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{s.weight}</p>
                    </div>
                    <p className="font-bold text-grab-green">from ₱{s.base}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><FiTruck className="text-grab-green" /> Delivery Service</h2>
            <div className="space-y-3">
              {SERVICES.map(s => (
                <button
                  key={s.value}
                  onClick={() => setService(s.value)}
                  className={`w-full border-2 rounded-xl p-4 text-left transition-all ${service === s.value ? 'border-grab-green bg-grab-light' : 'border-gray-200 hover:border-gray-300 bg-white'}`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-gray-900">{s.label}</p>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.tagColor}`}>{s.tag}</span>
                      </div>
                      <p className="text-sm text-gray-500">{s.desc}</p>
                    </div>
                    <p className="font-bold text-gray-900">×{s.multiplier}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="card mt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Estimated Delivery Cost</p>
              <p className="text-4xl font-bold text-grab-green mt-1">₱{price}</p>
              <p className="text-sm text-gray-400 mt-1">
                {selectedSize.label} package · {selectedService.label}
              </p>
            </div>
            <Link to="/send" className="btn-primary">Book Now</Link>
          </div>
        </div>

        {/* Pricing Table */}
        <div className="card mt-6">
          <h2 className="font-bold text-gray-900 mb-4">Full Pricing Table</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 text-gray-500 font-medium">Size</th>
                  <th className="text-center py-2 text-orange-600 font-medium">Instant</th>
                  <th className="text-center py-2 text-grab-green font-medium">Same Day</th>
                  <th className="text-center py-2 text-blue-600 font-medium">Next Day</th>
                </tr>
              </thead>
              <tbody>
                {SIZES.map(s => (
                  <tr key={s.value} className="border-b border-gray-50">
                    <td className="py-3">
                      <p className="font-semibold text-gray-900">{s.label}</p>
                      <p className="text-xs text-gray-400">{s.weight}</p>
                    </td>
                    {SERVICES.map(svc => (
                      <td key={svc.value} className="text-center py-3 font-bold text-gray-900">
                        ₱{Math.round(s.base * svc.multiplier)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400 mt-3">* Prices are base rates. Final price may vary depending on actual distance and weight.</p>
        </div>
      </div>
    </div>
  )
}
