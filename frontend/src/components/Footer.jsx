import { Link } from 'react-router-dom'
import { FiPackage } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-grab-green rounded-lg p-1.5">
                <FiPackage className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-white">Grab<span className="text-grab-green">Express</span></span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Fast, reliable, and affordable delivery service. Send packages anywhere with ease.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/send" className="hover:text-grab-green transition-colors">Send Package</Link></li>
              <li><Link to="/track" className="hover:text-grab-green transition-colors">Track Order</Link></li>
              <li><Link to="/pricing" className="hover:text-grab-green transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Account</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login" className="hover:text-grab-green transition-colors">Log In</Link></li>
              <li><Link to="/register" className="hover:text-grab-green transition-colors">Sign Up</Link></li>
              <li><Link to="/dashboard" className="hover:text-grab-green transition-colors">Dashboard</Link></li>
            </ul>
          </div>
        </div>
        <hr className="border-gray-800 mb-4" />
        <p className="text-center text-xs">© {new Date().getFullYear()} GrabExpress Clone. Built with React & TailwindCSS.</p>
      </div>
    </footer>
  )
}
