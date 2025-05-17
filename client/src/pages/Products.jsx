import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchProducts } from "../redux/slices/productSlice";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

const Products = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);
  const searchTerm = searchParams.get("search");
  const category = searchParams.get("category");

const queryParams = new URLSearchParams(window.location.search);
const categoryName = queryParams.get('category');
console.log("category name is:",categoryName); // Outputs: Electronics

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = items.filter((product) => {
    if (searchTerm) {
      return product.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
    if (category) {
      return product.category === category;
    }
    return true;
  });

  if (status === "loading") {
    return <div className="text-center py-8">Loading products...</div>;
  }

  if (status === "failed") {
    return <div className="text-center py-8 text-red-500">Error loading products</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <SearchBar />
      </div>
      <h1 className="text-2xl font-bold mb-6">
        {searchTerm
          ? `Search Results for "${searchTerm}"`
          : category
          ? `${category} Products`
          : "All Products"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl">No products found</p>
        </div>
      )}
    </div>
  );
};

export default Products;