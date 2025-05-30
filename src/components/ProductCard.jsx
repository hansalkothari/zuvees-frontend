import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  return (
    <div className="border border-gray-300 rounded-md m-2 p-4 w-48 hover:shadow-lg cursor-pointer transition" onClick={() => navigate(`/product/${product.id}`)}>
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-40 object-contain mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-gray-700 font-medium mb-4">${product.price.toFixed(2)}</p>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/product/${product.id}`);
        }} 
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        View Details
      </button>
    </div>
  );
}
