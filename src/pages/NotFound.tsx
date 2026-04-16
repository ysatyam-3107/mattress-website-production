import { Link, useLocation } from "react-router-dom";
import { Home, ArrowRight, Search, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  return (
    <>
      <SEO 
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist. Return to Mustafa's Mattress to find your perfect sleep solution."
        noIndex
      />
      <div className="flex min-h-[75vh] items-center justify-center bg-[#1E3A8A] px-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3B82F6]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-300/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="text-center max-w-lg mx-auto space-y-8 relative z-10 animate-fade-up">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center border border-white/20 shadow-[0_0_40px_rgba(59,130,246,0.3)]">
              <Moon className="w-12 h-12 text-blue-200" />
            </div>
          </div>
          
          <div>
            <h1 className="text-7xl lg:text-9xl font-black text-white/5 font-playfair tracking-tighter absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[80%] -z-10 select-none">
              404
            </h1>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 font-playfair">
              Looks like somebody is sleepwalking.
            </h2>
            <p className="text-lg text-blue-200/80 font-montserrat">
              The page <code className="bg-white/10 px-2 py-1 rounded text-white font-mono text-sm mx-1">{location.pathname}</code> doesn't exist or has been moved. Let's get you back to bed.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/">
              <Button size="lg" className="w-full sm:w-auto bg-[#3B82F6] hover:bg-blue-500 text-white font-bold h-14 rounded-xl shadow-xl hover:shadow-blue-500/30 transition-all btn-press font-montserrat">
                <Home className="w-5 h-5 mr-2" /> Back to Home
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white h-14 rounded-xl backdrop-blur-sm transition-all btn-press font-montserrat">
                <Search className="w-5 h-5 mr-2" /> Browse Mattresses
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
