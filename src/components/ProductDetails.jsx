import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../constants';
import axios from 'axios';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);

  const handleAddToCart = async () => {
    const email = localStorage.getItem('email'); 
    try {
      await axios.post('http://localhost:3000/api/cart/add', {
        email,
        productId: product.id,
        selectedColor,
        selectedSize,
        quantity: 1
      });
      alert('Added to cart!');
    } catch (err) {
      console.error('Error adding to cart', err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 flex flex-col md:flex-row gap-10">
      <div className="flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-md object-contain rounded-md border border-gray-200 shadow-sm"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <h2 className="text-3xl font-semibold mb-4">{product.name}</h2>
        <p className="text-2xl font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</p>

        <div className="mb-4">
          <label className="block font-semibold mb-1" htmlFor="color-select">Color:</label>
          <select
            id="color-select"
            value={selectedColor}
            onChange={e => setSelectedColor(e.target.value)}
            className="w-full border bg-gray-200 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {product.colors.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-1" htmlFor="size-select">Variant:</label>
          <select
            id="size-select"
            value={selectedSize}
            onChange={e => setSelectedSize(e.target.value)}
            className="w-full border bg-gray-200 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {product.sizes.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 rounded-md shadow-md transition duration-200"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
