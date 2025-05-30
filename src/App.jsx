import './App.css'
import SignIn from './components/SignIn'
import Navbar from './components/Navbar'
import Customer from './pages/Customer'
import Admin from './pages/Admin'
import Rider from './pages/Rider'
import Unauthorized from './pages/Unauthorized'
import { Routes, Route } from 'react-router-dom';
import ProductDetail from './components/ProductDetails'
import CartPage from './pages/CartPage'
import ProtectedRoute from './components/ProtectedRoute'
function App() {
  return (
    <main>
      <header>
      <Navbar />
        <Routes>
          <Route path="/" element={<SignIn />} />
          
          {/* Customer Routes */}
          <Route path="/customer-home" element={
            <ProtectedRoute allowedRoles={['customer']}>
              <Customer />
            </ProtectedRoute>
          } />

          <Route path="/cart" element={
            <ProtectedRoute allowedRoles={['customer']}>
              <CartPage />
            </ProtectedRoute>
          } />

          <Route path="/product/:id" element={
            <ProtectedRoute allowedRoles={['customer']}>
              <ProductDetail />
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Admin />
            </ProtectedRoute>
          } />

          {/* Rider Routes */}
          <Route path="/rider" element={
            <ProtectedRoute allowedRoles={['rider']}>
              <Rider />
            </ProtectedRoute>
          } />

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </header>
    </main>
  )
}

export default App
