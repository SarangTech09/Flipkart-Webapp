import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";
import { fetchProducts } from "../redux/slices/productSlice";

// Star Rating Component
const StarRating = ({ rating }) => {
  // Ensure rating is between 0 and 5
  const clampedRating = Math.min(5, Math.max(0, rating));
  const fullStars = Math.floor(clampedRating);
  const hasHalfStar = clampedRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, i) => (
        <svg key={`full-${i}`} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      
      {/* Half Star */}
      {hasHalfStar && (
        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="half-star" x1="0" x2="100%" y1="0" y2="0">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
          <path fill="url(#half-star)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
      
      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const { items: products } = useSelector((state) => state.products);
  const { items: cartItems } = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  const product = products.find((item) => item._id === id);
  const isInCart = cartItems.some((item) => item._id === id);

  if (!product) {
    return <div className="text-center py-8">Loading product details...</div>;
  }

  const handleCartAction = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (isInCart) {
      dispatch(removeFromCart({ id: product._id }));
    } else {
      dispatch(
        addToCart({
          id: product._id,
          name: product.title,
          price: product.price,
          image: product.image,
          rating: product.rating?.rate, // Updated to use correct property
          stock: product.stock
        })
      );
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!isInCart) {
      dispatch(
        addToCart({
          id: product._id,
          name: product.title,
          price: product.price,
          image: product.image,
          rating: product.rating?.rate, // Updated to use correct property
          stock: product.stock
        })
      );
    }
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto my-8 px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image Section */}
          <div className="md:w-1/2">
            <div className="h-96 bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="md:w-1/2">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center mb-4">
              <StarRating rating={product.rating?.rate || 0} />
              <span className="text-gray-500 ml-2">
                ({product.rating?.count || 0} ratings)
              </span>
            </div>
            <div className="mb-6">
              <span className="text-3xl font-bold text-blue-600">
                ₹{product.price}
              </span>
              <span className="ml-2 text-green-600">
                In Stock
              </span>
            </div>
            <div className="mb-6">
              <h2 className="font-bold mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
            <div className="mb-6">
              <h2 className="font-bold mb-2">Category</h2>
              <p className="text-gray-700">{product.category}</p>
            </div>
            <div className="mb-6">
              <h2 className="font-bold mb-2">Quantity</h2>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 px-3 py-1 rounded-l hover:bg-gray-300"
                >
                  -
                </button>
                <span className="border-t border-b border-gray-200 px-4 py-1">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock || 10, quantity + 1))}
                  className="bg-gray-200 px-3 py-1 rounded-r hover:bg-gray-300"
                >
                  +
                </button>
                {product.stock && (
                  <span className="text-gray-500 ml-2">
                    (Max: {product.stock})
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleCartAction}
                className={`px-6 py-2 rounded transition-colors ${
                  isInCart
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isInCart ? "Remove from Cart" : "Add to Cart"}
              </button>
              <button
                onClick={handleBuyNow}
                className="px-6 py-2 rounded bg-yellow-500 text-white hover:bg-yellow-600 transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;