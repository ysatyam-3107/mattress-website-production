import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-primary text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-blue-900" />
    <div className="container py-20 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">
            SleepCompany
          </h3>
          <p className="text-sm leading-relaxed text-white/80">Premium mattresses crafted with care for the perfect night's sleep. Experience luxury and comfort like never before.</p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Products</h4>
          <div className="space-y-3">
            {["Memory Foam", "Orthopedic", "Latex", "Hybrid"].map((t) => (
              <Link key={t} to="/products" className="block text-sm text-white/80 hover:text-white transition-all duration-300">{t} Mattress</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Company</h4>
          <div className="space-y-3">
            <Link to="/about" className="block text-sm text-white/80 hover:text-white transition-all duration-300">About Us</Link>
            <Link to="/blog" className="block text-sm text-white/80 hover:text-white transition-all duration-300">Sleep Guide</Link>
            <Link to="/contact" className="block text-sm text-white/80 hover:text-white transition-all duration-300">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Contact</h4>
          <div className="space-y-3 text-sm text-white/80">
            <p className="flex items-center gap-2">
              <span>📞</span> 1800-123-4567
            </p>
            <p className="flex items-center gap-2">
              <span>📧</span> hello@sleepcompany.in
            </p>
            <p className="flex items-center gap-2">
              <span>🕐</span> Mon–Sat, 9AM – 7PM
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20 pt-8 text-center text-sm text-white/70">
        © 2026 SleepCompany. All rights reserved. Sleep Better, Live Better.
      </div>
    </div>
  </footer>
);

export default Footer;
