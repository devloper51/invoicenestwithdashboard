import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

// Layout Components
// import Navbar from './components/layout/Navbar' // No longer imported directly here
// import Footer from './components/layout/Footer' // No longer imported directly here
import PublicLayout from './layouts/PublicLayout' // Import the new PublicLayout
import DashboardLayout from './layouts/DashboardLayout'

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
// import InvoicePreview from './pages/dashboard/InvoicePreview'
import Profile from './pages/dashboard/Profile'
import Clients from './pages/dashboard/Clients'
import Settings from './pages/dashboard/Settings'
import AddClient from './pages/dashboard/AddClient'
import ClientDetail from './pages/dashboard/ClientDetail'
import EditClient from './pages/dashboard/EditClient'
import EditInvoice from './pages/dashboard/EditInvoice'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#F8F9FA]">
        <Toaster position="top-center" />
        {/* <Navbar /> */} {/* Removed from here */}
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            {/* Error Routes can also be nested if they should share the public layout */}
            <Route path="/error" element={<Error />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="create-invoice" element={<CreateInvoice />} />
            <Route path="my-invoices" element={<Invoices />} />
            {/* <Route path="invoice/:id" element={<InvoicePreview />} /> */}
            <Route path="profile" element={<Profile />} />
            <Route path="clients" element={<Clients />} />
            <Route path="clients/new" element={<AddClient />} />
            <Route path="clients/:id" element={<ClientDetail />} />
            <Route path="clients/edit/:id" element={<EditClient />} />
            <Route path="invoices/edit/:id" element={<EditInvoice />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Standalone Error Routes (if they shouldn't have PublicLayout) */}
          {/* <Route path="/error" element={<Error />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
        {/* <Footer /> */} {/* Removed from here */}
      </div>
    </Router>
  )
}

export default App
