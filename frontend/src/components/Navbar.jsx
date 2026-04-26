import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiMenu, FiX, FiPackage, FiUser, FiLogOut } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/')
    setMenuOpen(false)
    setDropdownOpen(false)
  }

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/send', label: 'Send Package' },
    { to: '/track', label: 'Track Order' },
    { to: '/pricing', label: 'Pricing' },
  ]

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-grab-green rounded-lg p-1.5">
              <FiPackage className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl text-gray-900">Grab<span className="text-grab-green">Express</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-sm font-medium transition-colors ${isActive(link.to) ? 'text-grab-green' : 'text-gray-600 hover:text-grab-green'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-grab-green"
                >
                  <div className="bg-grab-green text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span>{user.name}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                    <Link to="/dashboard" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-grab-light hover:text-grab-green">
                      <FiUser className="w-4 h-4" /> Dashboard
                    </Link>
                    <Link to="/history" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-grab-light hover:text-grab-green">
                      <FiPackage className="w-4 h-4" /> My Orders
                    </Link>
                    <hr className="my-1" />
                    <button onClick={handleLogout} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50">
                      <FiLogOut className="w-4 h-4" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-outline text-sm py-2 px-4">Log In</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-600">
            {menuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium py-2 ${isActive(link.to) ? 'text-grab-green' : 'text-gray-600'}`}
            >
              {link.label}
            </Link>
          ))}
          <hr />
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="text-sm text-gray-700 py-2">Dashboard</Link>
              <Link to="/history" onClick={() => setMenuOpen(false)} className="text-sm text-gray-700 py-2">My Orders</Link>
              <button onClick={handleLogout} className="text-sm text-red-500 py-2 text-left">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-outline text-center text-sm">Log In</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-primary text-center text-sm">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  )
}
