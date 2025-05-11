import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Layout Components
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// Public Pages
import Home from './pages/public/Home'
import About from './pages/public/About'
import Contact from './pages/public/Contact'
import Login from './pages/public/Login'
import Signup from './pages/public/Signup'
import Subscription from './pages/public/Subscription'
import NotFound from './pages/public/NotFound'
import Error from './pages/public/Error'
import Privacy from './pages/public/Privacy'
import Terms from './pages/public/Terms'
import Payment from './pages/public/Payment'

// Protected Pages
import Dashboard from './pages/dashboard/Dashboard'
import CreateInvoice from './pages/dashboard/CreateInvoice'
import Invoices from './pages/dashboard/Invoices'
import InvoicePreview from './pages/dashboard/InvoicePreview'
import Profile from './pages/dashboard/Profile'
import DashboardLayout from './layouts/DashboardLayout'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F8F9FA]">
        <Toaster position="top-center" />
        <Navbar />
        <main className="pt-16"> {/* pt-16 to account for fixed navbar */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="create-invoice" element={<CreateInvoice />} />
              <Route path="my-invoices" element={<Invoices />} />
              <Route path="invoice/:id" element={<InvoicePreview />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            
            {/* Error Routes */}
            <Route path="/error" element={<Error />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
