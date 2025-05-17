import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { useState } from "react";

const ProductCard = ({ product, showAddToCart = true }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const user = localStorage.getItem('user');
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    
    dispatch(addToCart({
      id: product._id,
      name: product.title,
      price: product.price,
      image: product.image,
      stock: product.stock
    }));
  };

  // Calculate rating percentage for star display
  const rating = product.rating?.rate || 0;
  const ratingPercentage = (rating / 5) * 100;

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product._id}`} className="flex flex-col flex-grow">
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.title}
            className={`w-full h-full object-contain transition-transform duration-300 ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          />
          {product.stock <= 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              Out of Stock
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {product.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="mt-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-blue-600 font-bold text-lg">₹{product.price.toLocaleString()}</span>
              {product.stock > 0 && (
                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  In Stock
                </span>
              )}
            </div>
            
            <div className="flex items-center">
              <div className="relative inline-block">
                <div className="text-gray-300">★★★★★</div>
                <div 
                  className="absolute top-0 left-0 text-yellow-400 overflow-hidden" 
                  style={{ width: `${ratingPercentage}%` }}
                >
                  ★★★★★
                </div>
              </div>
              <span className="text-gray-500 text-sm ml-1">
                ({product.rating?.count || 0})
              </span>
            </div>
          </div>
        </div>
      </Link>
      
    
        <button
          onClick={handleAddToCart}
          className={`w-full py-3 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors ${
            isHovered ? "opacity-100" : "opacity-90"
          }`}
        >
          Add to Cart
        </button>

      
    </div>
  );
};

export default ProductCard;