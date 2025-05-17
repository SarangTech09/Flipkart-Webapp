import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import ProductCard from "./ProductCard";

const DealsSection = () => {
  const dispatch = useDispatch();
  const { items = [], status } = useSelector((state) => state.products);

  // Fetch products on component mount
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items]);

  if (status === "loading") {
    return <div className="text-center py-8">Loading deals...</div>;
  }

  if (status === "failed") {
    return <div className="text-center py-8 text-red-500">Error loading deals</div>;
  }

  // Get 6 products from each category with proper null checks
  const getCategoryProducts = (categoryName) => {
  if (!Array.isArray(items)) return [];

  return items
    .filter((product) => product?.category === categoryName)
    .slice(0, 6);
};


  const electronicsDeals = getCategoryProducts("Electronics");
  const menDeals = getCategoryProducts("Men");
  const womenDeals = getCategoryProducts("Women");
  const groceriesDeals = getCategoryProducts("Grocery");
  const furnitureDeals = getCategoryProducts("Furniture");
  const beautyDeals = getCategoryProducts("Beauty");

  // Filter out empty categories
  const categorySections = [
    { name: "Electronics", deals: electronicsDeals },
    { name: "Men", deals: menDeals },
    { name: "Women", deals: womenDeals },
    { name: "Groceries", deals: groceriesDeals },
    { name: "Furniture", deals: furnitureDeals },
    { name: "Beauty", deals: beautyDeals },
  ].filter(section => section.deals.length > 0);

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Today's Best Deals</h2>
        
        {categorySections.length > 0 ? (
          categorySections.map((section) => (
            <div key={section.name} className="mb-10">
              <h3 className="text-xl font-semibold mb-4 text-blue-600">
                {section.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {section.deals.map((product) => (
                  <ProductCard 
                    key={product._id} 
                    product={product} 
                    showAddToCart={false} 
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">No deals available at the moment.</div>
        )}
      </div>
    </section>
  );
};

export default DealsSection;