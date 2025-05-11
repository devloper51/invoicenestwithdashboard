import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-9xl font-bold text-[#E74C3C]">500</h1>
        <h2 className="mt-4 text-3xl font-bold text-[#2C3E50]">Something went wrong</h2>
        <p className="mt-2 text-lg text-[#7F8C8D]">
          We're sorry, but there was an error processing your request.
        </p>
        <div className="mt-6 space-x-4">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#1ABC9C] hover:bg-[#16A085] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C]"
          >
            Go back home
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-4 py-2 border border-[#BDC3C7] rounded-md shadow-sm text-sm font-medium text-[#34495E] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1ABC9C]"
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  )
}

export default Error 