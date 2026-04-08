import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-gradient-to-br from-foreground via-foreground to-foreground/90 text-background/80 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-accent/5" />
    <div className="container py-16 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-lg font-bold text-background mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Sleep</span>
            <span className="text-background">Well</span>
          </h3>
          <p className="text-sm leading-relaxed text-background/70">Premium mattresses designed for the perfect night's sleep. Trusted by thousands across India.</p>
        </div>
        <div>
          <h4 className="font-semibold text-background mb-4 text-sm">Shop</h4>
          <div className="space-y-2">
            {["Memory Foam", "Orthopedic", "Latex", "Hybrid"].map((t) => (
              <Link key={t} to="/products" className="block text-sm text-background/70 hover:text-primary transition-all duration-300 hover:translate-x-1">{t} Mattress</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-background mb-4 text-sm">Company</h4>
          <div className="space-y-2">
            <Link to="/about" className="block text-sm text-background/70 hover:text-primary transition-all duration-300 hover:translate-x-1">About Us</Link>
            <Link to="/blog" className="block text-sm text-background/70 hover:text-primary transition-all duration-300 hover:translate-x-1">Sleep Guide</Link>
            <Link to="/contact" className="block text-sm text-background/70 hover:text-primary transition-all duration-300 hover:translate-x-1">Contact</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-background mb-4 text-sm">Support</h4>
          <div className="space-y-2 text-sm text-background/70">
            <p className="flex items-center gap-2 hover:text-primary transition-colors duration-300">
              <span>📞</span> 1800-123-4567 (Toll Free)
            </p>
            <p className="flex items-center gap-2 hover:text-primary transition-colors duration-300">
              <span>📧</span> hello@sleepwell.in
            </p>
            <p className="flex items-center gap-2 hover:text-primary transition-colors duration-300">
              <span>🕐</span> Mon–Sat, 9AM – 7PM
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10 mt-12 pt-8 text-center text-sm text-background/50">
        © 2026 SleepWell. All rights reserved. Made with ❤️ in India.
      </div>
    </div>
  </footer>
);

export default Footer;
