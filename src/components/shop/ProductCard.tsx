import React from "react";
import { Product } from "../../types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300">
      {/* Product Image */}
      <img
        src={product.image || "https://via.placeholder.com/200"} // fallback
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm">{product.description}</p>
        <p className="text-red-700 font-bold mt-2">₹{product.price}</p>

        {/* Category */}
        <span className="inline-block mt-2 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
          {product.category}
        </span>
      </div>

      {/* Buy Button */}
      <div className="p-4">
        <button className="w-full bg-red-700 text-white py-2 rounded-lg hover:bg-red-800 transition">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
