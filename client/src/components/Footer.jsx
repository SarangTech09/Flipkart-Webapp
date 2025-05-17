import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaStore, FaGift, FaBullhorn, FaQuestionCircle } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 py-8 text-sm">
      <div className="w-full border-b border-gray-700">
        <div className="max-w-[1200px] mx-auto">
          {/* Top Grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 py-8">
            {/* ABOUT */}
            <div>
              <h4 className="text-gray-400 font-semibold mb-2">ABOUT</h4>
              <ul className="space-y-1">
                <li><a href="#" className='hover:text-blue-600'>Contact Us</a></li>
                <li><a href="#" className='hover:text-blue-600'>About Us</a></li>
                <li><a href="#" className='hover:text-blue-600'>Careers</a></li>
                <li><a href="#" className='hover:text-blue-600'>Flipkart Stories</a></li>
                <li><a href="#" className='hover:text-blue-600'>Press</a></li>
                <li><a href="#" className='hover:text-blue-600'>Corporate Information</a></li>
              </ul> 
            </div>

            {/* GROUP COMPANIES */}
            <div>
              <h4 className="text-gray-400 font-semibold mb-2">GROUP COMPANIES</h4>
              <ul className="space-y-1">
                <li> <a href="https://www.myntra.com/" className='hover:text-blue-600'>Myntra</a></li>
                <li> <a href="https://www.cleartrip.com/" className='hover:text-blue-600'>Cleartrip </a></li>
                <li><a href="https://www.shopsy.in/" className='hover:text-blue-600'>Shopsy </a></li>
              </ul>
            </div>

            {/* HELP */} 
            <div>
              <h4 className="text-gray-400 font-semibold mb-2">HELP</h4>
              <ul className="space-y-1">
                <li><a href="#" className = "hover:text-blue-600">Payments</a></li>
                <li><a href="#" className = "hover:text-blue-600">Shipping</a></li>
                <li><a href="#" className = "hover:text-blue-600">Cancellation & Returns</a></li>
                <li><a href="#" className = "hover:text-blue-600">FAQ</a></li>
              </ul>
            </div>

            {/* CONSUMER POLICY */}
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-px hidden md:block"></div>
              <h4 className="text-gray-400 font-semibold mb-2">CONSUMER POLICY</h4>
              <ul className="space-y-1"> 
                <li><a href="#" className = 'hover:text-blue-600'>Cancellation & Returns</a></li>
                <li><a href="#" className = 'hover:text-blue-600'>Terms Of Use</a></li>
                <li><a href="#" className = 'hover:text-blue-600'>Security</a></li>
                <li><a href="#" className = 'hover:text-blue-600'>Privacy</a></li>
                <li><a href="#" className = 'hover:text-blue-600'>Sitemap</a></li>
                <li><a href="#" className = 'hover:text-blue-600'>Grievance Redressal</a></li>
                <li><a href="#" className = 'hover:text-blue-600'>EPR Compliance</a></li>
              </ul>
            </div>

            {/* MAIL US */}
            <div className="md:col-span-1 col-span-2 relative ">
              <div className="absolute -left-7 top-0 bottom-0 w-px bg-gray-700 hidden md:block"></div>
              <h4 className="text-gray-400 font-semibold mb-2">Mail Us:</h4>
              <p>
                Flipkart Internet Private Limited,<br />
                Buildings Alyssa, Begonia & Clove Embassy Tech Village,<br />
                Outer Ring Road, Devarabeesanahalli Village,<br />
                Bengaluru, 560103,<br />
                Karnataka, India
              </p>
              <div className="mt-4">
                <h4 className="text-gray-400 font-semibold mb-2">Social:</h4>
                <div className="flex space-x-4 text-lg">
                  <FaFacebookF />
                  <FaTwitter />
                  <FaYoutube />
                  <FaInstagram />
                </div>
              </div>
            </div>

            {/* REGISTERED OFFICE */}
            <div className="md:col-span-1 col-span-2">
              <h4 className="text-gray-400 font-semibold mb-2">Registered Office Address:</h4>
              <p>
                Flipkart Internet Private Limited,<br />
                Buildings Alyssa, Begonia & Clove Embassy Tech Village,<br />
                Outer Ring Road, Devarabeesanahalli Village,<br />
                Bengaluru, 560103,<br />
                Karnataka, India<br />
                CIN: U51109KA2012PTC066107<br />
                Telephone: <span className="text-blue-400">044-45614700 / 044-67415800</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1200px] mx-auto">
        <div className="mt-0 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap justify-center gap-6 text-yellow-400 mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <FaStore />
              <span className='text-white'>Become a Seller</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaBullhorn />
              <span className='text-white'>Advertise</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaGift />
              <span className='text-white'>Gift Cards</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaQuestionCircle />
              <span className='text-white'>Help Center</span>
            </div>
          </div>

          <div className="text-gray-400">
            © 2007-{new Date().getFullYear()} Flipkart.com
          </div>

          {/* Payment Icons */}
          <div className="flex space-x-2 mt-4 md:mt-0">
            <img src="https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/payment-method-c454fb.svg" alt="payment-icon" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;