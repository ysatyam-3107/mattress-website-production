import { Link } from "react-router-dom";
import { Phone, Mail, Clock, Instagram, Facebook, Twitter, Youtube } from "lucide-react";

const Footer = () => (
  <footer className="bg-[#111827] text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-[#111827] via-[#111827] to-[#1E3A8A]/30" />
    <div className="container py-20 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4 font-playfair">
            Mustafa's Mattress
          </h3>
          <p className="text-sm leading-relaxed text-gray-400 font-montserrat mb-6">Premium mattresses crafted with care for the perfect night's sleep. Experience luxury and comfort like never before.</p>
          
          {/* Social Media Icons */}
          <div className="flex items-center gap-3">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:border-transparent transition-all duration-300 hover:scale-110">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1877F2] hover:border-transparent transition-all duration-300 hover:scale-110">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-black hover:border-transparent transition-all duration-300 hover:scale-110">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 hover:border-transparent transition-all duration-300 hover:scale-110">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider font-montserrat">Products</h4>
          <div className="space-y-3">
            {[
              { label: "Memory Foam", href: "/products?type=memory-foam" },
              { label: "Orthopedic", href: "/products?type=orthopedic" },
              { label: "Latex", href: "/products?type=latex" },
              { label: "Hybrid", href: "/products?type=hybrid" },
            ].map((item) => (
              <Link key={item.label} to={item.href} className="block text-sm text-gray-400 hover:text-[#3B82F6] hover:translate-x-1 transition-all duration-300 font-montserrat">{item.label} Mattress</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider font-montserrat">Company</h4>
          <div className="space-y-3">
            <Link to="/about" className="block text-sm text-gray-400 hover:text-[#3B82F6] hover:translate-x-1 transition-all duration-300 font-montserrat">About Us</Link>
            <Link to="/blog" className="block text-sm text-gray-400 hover:text-[#3B82F6] hover:translate-x-1 transition-all duration-300 font-montserrat">Sleep Guide</Link>
            <Link to="/contact" className="block text-sm text-gray-400 hover:text-[#3B82F6] hover:translate-x-1 transition-all duration-300 font-montserrat">Contact</Link>
            <Link to="/wishlist" className="block text-sm text-gray-400 hover:text-[#3B82F6] hover:translate-x-1 transition-all duration-300 font-montserrat">Wishlist</Link>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider font-montserrat">Contact</h4>
          <div className="space-y-4 text-sm text-gray-400 font-montserrat">
            <a href="tel:18001234567" className="flex items-center gap-3 hover:text-white transition-colors group">
              <div className="w-9 h-9 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center group-hover:bg-[#3B82F6]/20 transition-colors">
                <Phone className="w-4 h-4 text-[#3B82F6]" />
              </div>
              1800-123-4567
            </a>
            <a href="mailto:hello@mustafasmattress.in" className="flex items-center gap-3 hover:text-white transition-colors group">
              <div className="w-9 h-9 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center group-hover:bg-[#3B82F6]/20 transition-colors">
                <Mail className="w-4 h-4 text-[#3B82F6]" />
              </div>
              hello@mustafasmattress.in
            </a>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-[#3B82F6]" />
              </div>
              Mon–Sat, 9AM – 7PM
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500 font-montserrat">
          © 2026 Mustafa's Mattress. All rights reserved. Sleep Better, Live Better.
        </p>
        <div className="flex items-center gap-6 text-xs text-gray-500 font-montserrat">
          <span className="hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
          <span className="hover:text-gray-300 cursor-pointer transition-colors">Terms of Service</span>
          <span className="hover:text-gray-300 cursor-pointer transition-colors">Shipping Policy</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
