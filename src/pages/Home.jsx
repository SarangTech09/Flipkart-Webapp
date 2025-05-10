import BannerSlider from "../components/BannerSlider";
import CategoryNav from "../components/CategoryNav";
import DealsSection from "../components/DealsSection";

const Home = () => {
  return (
    <div className="pt-16"> {/* Add padding-top equal to navbar height */}
      <CategoryNav /> {/* Regular positioning */}
      
      <div className="mt-4 px-4 sm:px-8"> {/* Slightly more space above banner */}
        <BannerSlider />
      </div>
      
      <DealsSection />
    </div>
  );
};

export default Home;