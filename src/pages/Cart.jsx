import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../redux/slices/cartSlice";

const Cart = () => {
  const { items, total } = useSelector((state) => state.cart);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Please login to view your cart</h2>
        <Link 
          to="/login" 
          className="px-6 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
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
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold">Cart Items</h2>
              <button
                onClick={handleClearCart}
                className="text-red-500 hover:text-red-700"
              >
                Clear Cart
              </button>
            </div>
            <div className="divide-y">
              {items.map((item) => (
                <div key={item.id} className="py-4 flex flex-col sm:flex-row gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="bg-gray-200 px-2 py-1 rounded-l"
                        >
                          -
                        </button>
                        <span className="border-t border-b border-gray-200 px-3 py-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="bg-gray-200 px-2 py-1 rounded-r"
                        >
                          +
                        </button>
                      </div>
                      <div>
                        <span className="font-bold">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 self-start sm:self-center"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{(total * 0.18).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span>₹{(total * 1.18).toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition-colors mb-2">
              Proceed to Checkout
            </button>
            <Link
              to="/products"
              className="block text-center text-blue-600 hover:underline"
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