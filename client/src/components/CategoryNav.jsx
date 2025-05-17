import { Link, useSearchParams } from "react-router-dom";

const categories = [
  { id: 1, name: "Electronics", image: "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/g/y/j/-original-imah3xrqppxmnzcv.jpeg?q=70", path: "/products?category=Electronics" },
  { id: 2, name: "Men", image: 'https://rukminim2.flixcart.com/image/612/612/k4hcjgw0pkrrdj/t-shirt/e/d/5/m-mekhal-1254-b-m-jangoboy-mekhal-1254-b-m-original-imafheghyfzwzygy.jpeg?q=70', path: "/products?category=Men" },
  { id: 3, name: "Women", image: 'https://rukminim2.flixcart.com/image/612/612/kfbfr0w0-0/t-shirt/o/b/o/s-st-camellia-2pc-2-sharktribe-original-imafvsratspfdnt7.jpeg?q=70', path: "/products?category=Women" },
  { id: 4, name: "Groceries", image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/shopsy-fmcg-combo/j/u/i/gluten-free-maida-replacer-500g-and-gluten-free-flour-1kg-combo-original-imagrzggeefjwcfh.jpeg?q=70', path: "/products?category=Grocery" },
  { id: 5, name: "Furniture", image: "https://rukminim2.flixcart.com/image/612/612/xif0q/bed-mattress/a/9/y/normal-top-single-5-35-72-ortho-quilted-memory-foam-memory-foam-original-imah52dgwvgf5vwh.jpeg?q=70", path: "/products?category=Furniture" },
  { id: 6, name: "Beauty", image: "https://rukminim2.flixcart.com/image/612/612/xif0q/sunscreen/y/o/7/30-multivitamin-gel-uva-uvb-protection-zero-white-cast-50-original-imahbk4dpbvap6x9.jpeg?q=70", path: "/products?category=Beauty" }
];

const CategoryNav = () => {
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category");

  return (
    <div className="bg-white shadow-sm py-4 top-0 z-10">
      <div className="container mx-auto px-2">
        <div className="flex justify-center overflow-x-auto gap-4 sm:gap-4 px-4 hide-scrollbar">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={category.path}
              className={`flex flex-col items-center min-w-[80px] sm:min-w-[100px] group transition-all duration-200 ${
                currentCategory === category.name
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-500"
              }`}
            >
              <div className={`w-16 h-16 sm:w-20 sm:h-20 p-2 mb-1 rounded-full flex items-center justify-center transition-all ${
                currentCategory === category.name
                  ? "bg-blue-50 border-2 border-blue-200 shadow-sm"
                  : "bg-gray-50 group-hover:bg-blue-50 group-hover:border group-hover:border-blue-100"
              }`}>
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-contain p-1"
                />
              </div>
              <span className={`text-xs sm:text-sm font-medium text-center mt-1 ${
                currentCategory === category.name ? "font-semibold" : "font-medium"
              }`}>
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;