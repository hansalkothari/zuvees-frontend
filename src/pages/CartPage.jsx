import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { products } from '../constants';

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');

  const userEmail = localStorage.getItem('email');

  useEffect(() => {
    async function fetchCart() {
      try {
        setLoading(true);
        const res = await axios.get(`https://zuvees-backend-l2o0.onrender.com/api/cart/${userEmail}`);
        setCartItems(res.data.cart);
      } catch {
        setError('Failed to load cart');
      } finally {
        setLoading(false);
      }
    }

    if (userEmail) fetchCart();
  }, [userEmail]);

  const cartWithDetails = cartItems.map(item => {
    const product = products.find(p => p.id === item.productId) || {};
    return { ...item, product };
  });

  const totalPrice = cartWithDetails.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity,0);

  const handleCheckout = () => {
    setShowModal(true); 
  };

  const handlePlaceOrder = async () => {
    if (!contactNumber || !address) {
      alert('Please enter contact number and address');
      return;
    }
    try {
      const res = await axios.post('https://zuvees-backend-l2o0.onrender.com/api/orders/create', {
        email: userEmail,
        contactNumber,
        address,
      });
      if (res.data.success) {
        alert('Order placed successfully!');
        setCartItems([]);
        setShowModal(false);
      } else {
        alert('Failed to place order');
      }
    } catch (err) {
      alert('Error placing order');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading cart...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (cartItems.length === 0) return <div className="text-center mt-10">Your cart is empty.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">Your Cart</h2>
      <div className="flex gap-10">
        <div className="flex-3 space-y-6">
          {cartWithDetails.map(({ productId, selectedColor, selectedSize, quantity, product }) => (
            <div key={productId} className="flex border-b pb-4">
              <img src={product.imageUrl} alt={product.name} className="w-32 h-32 object-contain" />
              <div className="ml-6 flex-1">
                <h3 className="text-xl font-medium">{product.name}</h3>
                <p className="text-gray-600">Color: {selectedColor}</p>
                <p className="text-gray-600">Size: {selectedSize}</p>
                <p className="font-semibold mt-1">${product.price?.toFixed(2)}</p>
              </div>
              <div className="flex flex-col justify-between items-center">
                <p className="font-bold mt-2">Total: ${(product.price * quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-1 border p-6 rounded-lg sticky top-6 bg-gray-50 h-fit">
          <h3 className="text-2xl font-semibold mb-4">Order Summary</h3>
          <p className="mb-2">Total items: {cartWithDetails.reduce((sum, item) => sum + item.quantity, 0)}</p>
          <p className="text-xl font-bold mb-6">Total Price: ${totalPrice.toFixed(2)}</p>
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* Modal for contact info */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Enter Contact Info</h3>
            <input
              type="text"
              placeholder="Contact Number"
              value={contactNumber}
              onChange={e => setContactNumber(e.target.value)}
              className="border w-full p-2 mb-4 rounded"
            />
            <textarea
              placeholder="Address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="border w-full p-2 mb-4 rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handlePlaceOrder}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
