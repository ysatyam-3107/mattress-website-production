import { Link } from "react-router-dom";
import { Phone, Mail, Clock, Instagram, Facebook, Twitter, Youtube, ArrowRight, Send } from "lucide-react";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  
  return (
    <footer className="bg-[#111827] text-white relative overflow-hidden wave-divider">
      <div className="absolute inset-0 bg-gradient-to-br from-[#111827] via-[#111827] to-[#1E3A8A]/20" />
      
      {/* Decorative blur orbs */}
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-[#3B82F6]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 left-20 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container py-20 relative z-10">
        {/* Newsletter Section */}
        <div className="relative mb-10 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#1E3A8A]/50 to-[#3B82F6]/30 border border-white/10 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }} />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2 font-playfair">Sleep Tips & Exclusive Deals</h3>
              <p className="text-blue-200/60 font-montserrat text-sm">Join our newsletter and save 10% on your first order.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 md:w-72 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder:text-blue-200/40 outline-none focus:ring-2 focus:ring-[#3B82F6]/30 transition-all font-montserrat"
              />
              <button className="bg-gold hover:bg-gold-dark text-white px-6 py-3 rounded-xl font-bold text-sm transition-all duration-300 hover:shadow-glow-gold font-montserrat flex items-center gap-2 shrink-0">
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Subscribe</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2 font-playfair">
              <span className="drop-shadow-[0_0_12px_rgba(255,255,255,0.1)]">Mustafa's</span>{" "}
              <span className="text-gradient-gold">Mattress</span>
            </h3>
            <p className="text-sm leading-relaxed text-gray-400 font-montserrat mb-6">Premium mattresses crafted with care for the perfect night's sleep. Experience luxury and comfort like never before.</p>
            
            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:border-transparent transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1877F2] hover:border-transparent transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-black hover:border-transparent transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-600 hover:border-transparent transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider font-montserrat flex items-center gap-2">
              <span className="w-6 h-0.5 bg-gradient-to-r from-gold to-gold-light rounded-full" />
              Products
            </h4>
            <div className="space-y-3">
              {[
                { label: "Memory Foam", href: "/products?type=memory-foam" },
                { label: "Orthopedic", href: "/products?type=orthopedic" },
                { label: "Latex", href: "/products?type=latex" },
                { label: "Hybrid", href: "/products?type=hybrid" },
              ].map((item) => (
                <Link key={item.label} to={item.href} className="group block text-sm text-gray-400 hover:text-white transition-all duration-300 font-montserrat flex items-center gap-2">
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-gold" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{item.label} Mattress</span>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider font-montserrat flex items-center gap-2">
              <span className="w-6 h-0.5 bg-gradient-to-r from-gold to-gold-light rounded-full" />
              Company
            </h4>
            <div className="space-y-3">
              <Link to="/about" className="group block text-sm text-gray-400 hover:text-white transition-all duration-300 font-montserrat flex items-center gap-2">
                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-gold" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">About Us</span>
              </Link>
              <Link to="/blog" className="group block text-sm text-gray-400 hover:text-white transition-all duration-300 font-montserrat flex items-center gap-2">
                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-gold" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">Sleep Guide</span>
              </Link>
              <Link to="/contact" className="group block text-sm text-gray-400 hover:text-white transition-all duration-300 font-montserrat flex items-center gap-2">
                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-gold" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">Contact</span>
              </Link>
              <Link to="/wishlist" className="group block text-sm text-gray-400 hover:text-white transition-all duration-300 font-montserrat flex items-center gap-2">
                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-gold" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">Wishlist</span>
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider font-montserrat flex items-center gap-2">
              <span className="w-6 h-0.5 bg-gradient-to-r from-gold to-gold-light rounded-full" />
              Contact
            </h4>
            <div className="space-y-4 text-sm text-gray-400 font-montserrat">
              <a href="tel:18001234567" className="flex items-center gap-3 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center group-hover:bg-[#3B82F6]/20 transition-all border border-[#3B82F6]/10">
                  <Phone className="w-4 h-4 text-[#3B82F6]" />
                </div>
                1800-123-4567
              </a>
              <a href="mailto:hello@mustafasmattress.in" className="flex items-center gap-3 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center group-hover:bg-[#3B82F6]/20 transition-all border border-[#3B82F6]/10">
                  <Mail className="w-4 h-4 text-[#3B82F6]" />
                </div>
                hello@mustafasmattress.in
              </a>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center border border-[#3B82F6]/10">
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
            <span className="text-gray-700">·</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Terms of Service</span>
            <span className="text-gray-700">·</span>
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Shipping Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
