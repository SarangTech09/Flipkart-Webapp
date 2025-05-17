import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../redux/slices/cartSlice";

const Cart = () => {
  const { items, total } = useSelector((state) => state.cart);
  const user = localStorage.getItem('user');
  console.log("user in cart is",user);
  const dispatch = useDispatch();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Please login to view your cart</h2>
        <Link 
          to="/login" 
          className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
        >
          Login
        </Link>
      </div>
    );
  }

  const handleQuantityChange = (id, quantity) => {
    if (quantity >= 1) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="mb-4">Looks like you haven't added anything to your cart yet</p>
        <Link
          to="/products"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart ({items.length})</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Cart Items</h2>
              <button
                onClick={handleClearCart}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Clear Cart
              </button>
            </div>
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.id} className="py-4 flex flex-col sm:flex-row gap-4">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                        e.target.className = 'w-full h-full object-cover';
                      }}
                    />
                  </div>
                  <div className="flex-grow flex flex-col">
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <div className="mt-auto">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center border rounded">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="bg-gray-100 hover:bg-gray-200 px-3 py-1 transition-colors"
                          >
                            -
                          </button>
                          <span className="px-4 py-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="bg-gray-100 hover:bg-gray-200 px-3 py-1 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-lg">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                          {item.quantity > 1 && (
                            <p className="text-sm text-gray-500">
                              ₹{item.price.toFixed(2)} each
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 self-start sm:self-center mt-2 sm:mt-0"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal ({items.reduce((acc, item) => acc + item.quantity, 0)} items)</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18%)</span>
                <span>₹{(total * 0.18).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{(total * 1.18).toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-md font-medium transition-colors mb-3">
              Proceed to Checkout
            </button>
            <Link
              to="/products"
              className="block text-center text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;