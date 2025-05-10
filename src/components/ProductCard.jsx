import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";

const ProductCard = ({ product, showAddToCart = true }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    dispatch(addToCart({
      id: product._id,
      name: product.title,
      price: product.price,
      image: product.thumbnail,
      stock: product.stock
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/product/${product._id}`}>
        <div className="h-48 overflow-hidden">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-blue-600 font-bold">₹{product.price}</span>
            {product.stock > 0 ? (
              <span className="text-sm text-green-600">In Stock</span>
            ) : (
              <span className="text-sm text-red-600">Out of Stock</span>
            )}
          </div>
          <div className="flex items-center mt-2">
            <span className="text-yellow-400">★★★★☆</span>
            {showAddToCart && (
              <span className="text-gray-500 text-sm ml-1">
                ({product.ratingAndReviews?.length || 0})
              </span>
            )}
          </div>
        </div>
      </Link>
      {showAddToCart && (
        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className={`w-full py-2 ${
            product.stock > 0
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          } transition-colors`}
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      )}
    </div>
  );
};

export default ProductCard;