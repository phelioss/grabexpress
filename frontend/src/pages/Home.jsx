import { Link } from 'react-router-dom'
import { FiPackage, FiClock, FiMapPin, FiShield, FiTruck, FiStar } from 'react-icons/fi'

const services = [
  {
    icon: <FiClock className="w-8 h-8 text-grab-green" />,
    title: 'Instant Delivery',
    desc: 'Same-hour delivery within the city. Book now and your package is on its way.',
    tag: 'Fastest',
    tagColor: 'bg-orange-100 text-orange-600',
  },
  {
    icon: <FiTruck className="w-8 h-8 text-grab-green" />,
    title: 'Same Day Delivery',
    desc: 'Book before 2PM and get delivery by end of day. Perfect for urgent parcels.',
    tag: 'Popular',
    tagColor: 'bg-grab-light text-grab-green',
  },
  {
    icon: <FiPackage className="w-8 h-8 text-grab-green" />,
    title: 'Next Day Delivery',
    desc: 'Schedule pickup today, delivered tomorrow. Most affordable option.',
    tag: 'Best Value',
    tagColor: 'bg-blue-100 text-blue-600',
  },
]

const steps = [
  { num: '01', title: 'Enter Details', desc: 'Fill in pickup and drop-off addresses along with package information.' },
  { num: '02', title: 'Choose Service', desc: 'Pick instant, same-day, or next-day delivery based on your needs.' },
  { num: '03', title: 'Track in Real-Time', desc: 'Get live updates on your package from pickup to doorstep delivery.' },
]

const stats = [
  { value: '2M+', label: 'Deliveries Completed' },
  { value: '98%', label: 'On-Time Rate' },
  { value: '500+', label: 'Cities Covered' },
  { value: '4.8★', label: 'Customer Rating' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-grab-green via-grab-dark to-green-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              🚚 Fast & Reliable Delivery
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Send Packages <br />
              <span className="text-grab-yellow">Anywhere, Anytime</span>
            </h1>
            <p className="text-lg text-green-100 mb-10 max-w-xl mx-auto">
              From documents to large parcels — GrabExpress delivers fast, safe, and affordably across the city and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/send" className="bg-white text-grab-green font-bold py-3.5 px-8 rounded-xl hover:bg-green-50 transition-colors text-lg">
                Send a Package
              </Link>
              <Link to="/track" className="border-2 border-white text-white font-bold py-3.5 px-8 rounded-xl hover:bg-white/10 transition-colors text-lg">
                Track Order
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Track Bar */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3">
              <FiMapPin className="text-grab-green w-5 h-5 flex-shrink-0" />
              <input type="text" placeholder="Enter tracking number..." className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400" />
            </div>
            <Link to="/track" className="btn-primary text-center rounded-xl">Track Now</Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-grab-light py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map(s => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-grab-green">{s.value}</p>
                <p className="text-sm text-gray-600 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Delivery Services</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Choose the service that fits your needs and budget</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map(s => (
              <div key={s.title} className="card hover:shadow-md transition-shadow group">
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-grab-light p-3 rounded-xl">{s.icon}</div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${s.tagColor}`}>{s.tag}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.desc}</p>
                <Link to="/send" className="text-grab-green text-sm font-semibold hover:underline">Book Now →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">How It Works</h2>
            <p className="text-gray-500">Send a package in just 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.num} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-grab-green/30 z-0" />
                )}
                <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 bg-grab-green text-white rounded-2xl text-2xl font-bold mb-4 mx-auto">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="bg-grab-light w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiShield className="w-7 h-7 text-grab-green" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Package Protection</h3>
              <p className="text-sm text-gray-500">Every shipment is covered with our built-in protection policy.</p>
            </div>
            <div className="p-6">
              <div className="bg-grab-light w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiMapPin className="w-7 h-7 text-grab-green" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Live Tracking</h3>
              <p className="text-sm text-gray-500">Track your package in real-time from pickup to delivery.</p>
            </div>
            <div className="p-6">
              <div className="bg-grab-light w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiStar className="w-7 h-7 text-grab-green" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Top Rated Service</h3>
              <p className="text-sm text-gray-500">Rated 4.8/5 by over 2 million satisfied customers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-grab-green text-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to send your first package?</h2>
          <p className="text-green-100 mb-8">Join millions of users who trust GrabExpress for their delivery needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-white text-grab-green font-bold py-3.5 px-8 rounded-xl hover:bg-green-50 transition-colors">
              Create Free Account
            </Link>
            <Link to="/pricing" className="border-2 border-white text-white font-bold py-3.5 px-8 rounded-xl hover:bg-white/10 transition-colors">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
