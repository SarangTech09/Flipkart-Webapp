import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";
import { fetchProducts } from "../redux/slices/productSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { items: products } = useSelector((state) => state.products);
  const { items: cartItems } = useSelector((state) => state.cart);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  const product = products.find((item) => item._id === id);
  const isInCart = cartItems.some((item) => item.id === id);

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
          image: product.thumbnail,
          quantity,
          stock: product.stock
        })
      );
    }
  };

  return (
    <div className="container mx-auto my-8 px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image Section */}
          <div className="md:w-1/2">
            <div className="h-96 bg-gray-100 rounded-lg overflow-hidden mb-4">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Product Info Section */}
          <div className="md:w-1/2">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                ★★★★☆
              </div>
              <span className="text-gray-500 ml-2">
                ({product.ratingAndReviews?.length || 0} reviews)
              </span>
            </div>
            <div className="mb-6">
              <span className="text-3xl font-bold text-blue-600">
                ₹{product.price}
              </span>
              <span className="text-green-600 ml-2">
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <div className="mb-6">
              <h2 className="font-bold mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>
            <div className="mb-6">
              <h2 className="font-bold mb-2">Category</h2>
              <p className="text-gray-700">{product.category.name}</p>
            </div>
            <div className="mb-6">
              <h2 className="font-bold mb-2">Quantity</h2>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-200 px-3 py-1 rounded-l"
                >
                  -
                </button>
                <span className="border-t border-b border-gray-200 px-4 py-1">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="bg-gray-200 px-3 py-1 rounded-r"
                >
                  +
                </button>
                <span className="text-gray-500 ml-2">
                  (Max: {product.stock})
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleCartAction}
                disabled={product.stock <= 0}
                className={`px-6 py-2 rounded transition-colors ${
                  product.stock > 0
                    ? isInCart
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
              >
                {isInCart ? "Remove from Cart" : "Add to Cart"}
              </button>
              <button
                disabled={product.stock <= 0}
                className={`px-6 py-2 rounded transition-colors ${
                  product.stock > 0
                    ? "bg-yellow-500 text-white hover:bg-yellow-600"
                    : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
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