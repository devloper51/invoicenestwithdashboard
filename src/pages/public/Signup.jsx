import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setEmailError('')
    setPasswordError('')

    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address.')
      toast.error('Invalid email format.')
      // Don't return immediately, check password match too
    }

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match!')
      toast.error('Passwords do not match!')
    }

    // If there are any errors, stop form submission
    if (!validateEmail(formData.email) || formData.password !== formData.confirmPassword) {
        return
    }

    // Handle signup logic here
    console.log('Signup attempt:', formData)
    toast.success('Account created successfully!')
    navigate('/dashboard')
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    if (name === "email") {
      setEmailError('')
    }
    if (name === "password" || name === "confirmPassword") {
      setPasswordError('')
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* <img
            className="mx-auto h-12 w-auto"
            src="/logo.png" // Assuming you have a logo in public/logo.png
            alt="InvoiceNest"
        /> */}
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#2C3E50]">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-[#7F8C8D]">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-[#1ABC9C] hover:text-[#16A085]">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl rounded-lg sm:px-10"> {/* Changed background to white and increased shadow */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2"> {/* Adjusted gap */}
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-[#2C3E50]">
                  First name
                </label>
                <div className="mt-1">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete='given-name'
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-[#2C3E50]">
                  Last name
                </label>
                <div className="mt-1">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete='family-name'
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#2C3E50]">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm`}
                />
              </div>
              {emailError && <p className="mt-2 text-sm text-red-600">{emailError}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#2C3E50]">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#2C3E50]">
                Confirm password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border ${passwordError ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#1ABC9C] focus:border-[#1ABC9C] sm:text-sm`}
                />
              </div>
              {passwordError && <p className="mt-2 text-sm text-red-600">{passwordError}</p>}
            </div>

            <div className="flex items-start"> {/* Changed items-center to items-start for better alignment with multiline terms */}
              <div className="flex-shrink-0">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  required
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-[#1ABC9C] focus:ring-[#1ABC9C] border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm"> {/* Increased margin for better spacing */}
                <label htmlFor="agreeToTerms" className="text-[#7F8C8D]">
                  I agree to the{' '}
                  <Link to="/terms" className="font-medium text-[#1ABC9C] hover:text-[#16A085]">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="font-medium text-[#1ABC9C] hover:text-[#16A085]">
                    Privacy Policy
                  </Link>
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1ABC9C] hover:bg-[#16A085] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C] transition duration-150 ease-in-out" // Increased padding and added transition
              >
                Create account
              </button>
            </div>
          </form>
          {/* Removed the "Or continue with" and social login buttons section */}
        </div>
      </div>
    </div>
  )
}

export default Signup 