import { Link } from "react-router-dom";
import { Phone, Mail, Clock } from "lucide-react";

const Footer = () => (
  <footer className="bg-[#111827] text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-[#111827] via-[#111827] to-[#1E3A8A]/30" />
    <div className="container py-20 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4 font-playfair">
            Mustafa's Mattress
          </h3>
          <p className="text-sm leading-relaxed text-gray-400 font-montserrat">Premium mattresses crafted with care for the perfect night's sleep. Experience luxury and comfort like never before.</p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider font-montserrat">Products</h4>
          <div className="space-y-3">
            {["Memory Foam", "Orthopedic", "Latex", "Hybrid"].map((t) => (
              <Link key={t} to="/products" className="block text-sm text-gray-400 hover:text-[#3B82F6] transition-colors duration-300 font-montserrat">{t} Mattress</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider font-montserrat">Company</h4>
          <div className="space-y-3">
            <Link to="/about" className="block text-sm text-gray-400 hover:text-[#3B82F6] transition-colors duration-300 font-montserrat">About Us</Link>
            <Link to="/blog" className="block text-sm text-gray-400 hover:text-[#3B82F6] transition-colors duration-300 font-montserrat">Sleep Guide</Link>
            <Link to="/contact" className="block text-sm text-gray-400 hover:text-[#3B82F6] transition-colors duration-300 font-montserrat">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider font-montserrat">Contact</h4>
          <div className="space-y-3 text-sm text-gray-400 font-montserrat">
            <p className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#3B82F6]" /> 1800-123-4567
            </p>
            <p className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#3B82F6]" /> hello@mustafasmattress.in
            </p>
            <p className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#3B82F6]" /> Mon–Sat, 9AM – 7PM
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-500 font-montserrat">
        © 2026 Mustafa's Mattress. All rights reserved. Sleep Better, Live Better.
      </div>
    </div>
  </footer>
);

export default Footer;
