import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Subscription', href: '/subscription' },
    { name: 'Temp Dashboard', href: '/dashboard' },
  ]

  // Define base and active classes for NavLink
  const getNavLinkClass = ({ isActive }) => {
    return `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive ? 'bg-[#1ABC9C] text-white' : 'text-[#ECF0F1] hover:text-[#1ABC9C]'}`;
  };

  const getMobileNavLinkClass = ({ isActive }) => {
    return `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${isActive ? 'bg-[#1ABC9C] text-white' : 'text-[#ECF0F1] hover:text-[#1ABC9C]'}`;
  };

  return (
    <nav className="fixed w-full bg-[#2C3E50] shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-[#ECF0F1] text-2xl font-bold">
              InvoiceNest
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={getNavLinkClass}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <NavLink
                to="/dashboard"
                className={getNavLinkClass}
              >
                Temp Dashboard
              </NavLink>
              <NavLink
                to="/login"
                className={getNavLinkClass} // Login might not need active state, but using NavLink for consistency
              >
                Login
              </NavLink>
              <Link // Sign Up is a button, so Link might be more appropriate than NavLink if no active state needed
                to="/signup"
                className="bg-[#1ABC9C] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#16A085] transition-colors duration-200"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#ECF0F1] hover:text-[#1ABC9C] p-2 rounded-md"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={getMobileNavLinkClass}
                onClick={() => setIsMenuOpen(false)} // Close menu on click
              >
                {item.name}
              </NavLink>
            ))}
            <NavLink
              to="/dashboard"
              className={getMobileNavLinkClass}
              onClick={() => setIsMenuOpen(false)}
            >
              Temp Dashboard
            </NavLink>
            <div className="pt-4 pb-3 border-t border-[#34495E]">
              <NavLink
                to="/login"
                className={getMobileNavLinkClass} // Login in mobile
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
              <Link // Sign Up in mobile
                to="/signup"
                className="bg-[#1ABC9C] text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-[#16A085] mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar 