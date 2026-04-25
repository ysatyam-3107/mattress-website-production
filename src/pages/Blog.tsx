import { Clock, BookOpen, Moon, Heart, Lightbulb, TrendingUp, ArrowRight, ArrowUpRight, BarChart3, ShoppingBag, HeartPulse } from "lucide-react";
import { blogPosts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";
import heroImg from "@/assets/hero-bedroom.jpg";
import memoryFoamImg from "@/assets/mattress-memory-foam.jpg";
import orthopedicImg from "@/assets/mattress-orthopedic.jpg";
import latexImg from "@/assets/mattress-latex.jpg";

const toSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const sleepTips = [
  {
    icon: Moon,
    title: "Maintain Sleep Schedule",
    desc: "Go to bed and wake up at the same time daily, even on weekends. This helps regulate your body clock.",
  },
  {
    icon: Heart,
    title: "Optimize Room Temperature",
    desc: "Keep your bedroom cool (65-68°F) and dark. A cooler environment promotes better sleep quality.",
  },
  {
    icon: Lightbulb,
    title: "Limited Screen Time",
    desc: "Avoid screens 1-2 hours before bed. Blue light can interfere with melatonin production.",
  },
  {
    icon: TrendingUp,
    title: "Exercise Regularly",
    desc: "Regular physical activity improves sleep quality, but avoid intense exercise close to bedtime.",
  },
];

const Blog = () => (
  <>
    <SEO 
      title="Sleep Guide & Mattress Advice" 
      description="Read our latest articles on improving sleep quality, choosing the right mattress, and comparing back pain solutions."
    />
    <div className="min-h-screen bg-slate-50">
    {/* Hero Editorial Header */}
    <section className="relative w-full min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Sleep guide hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/40 mix-blend-multiply" />
      </div>

      <div className="relative z-10 container px-4 pt-32 pb-20 text-center max-w-4xl mx-auto">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white border border-white/20 font-bold text-xs tracking-widest uppercase mb-8 backdrop-blur-sm">
          <BookOpen className="w-4 h-4" /> Mustafa's Mattress Editorial
        </span>
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-6 leading-[1.1] tracking-tight">
          The Science of <br/> <span className="text-blue-300">Perfect Rest.</span>
        </h1>
        <p className="text-base sm:text-xl md:text-2xl text-white/80 leading-relaxed font-medium max-w-2xl mx-auto">
          Expert advice, clinical insights, and routines to transform your nights and energize your days.
        </p>
      </div>
    </section>

    {/* Featured Story */}
    <section className="py-20 -mt-16 relative z-20">
      <div className="container">
        {blogPosts[0] && (
          <Link to={`/blog/${toSlug(blogPosts[0].title)}`} className="block">
          <div className="bg-white rounded-[32px] overflow-hidden shadow-2xl border border-slate-100 flex flex-col lg:flex-row max-w-6xl mx-auto hover:shadow-3xl transition-shadow duration-300">
            <div className="lg:w-1/2 relative min-h-[400px]">
               <img src={memoryFoamImg} alt="Featured" className="absolute inset-0 w-full h-full object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent lg:hidden" />
               
               <div className="absolute bottom-6 left-6 lg:hidden">
                 <span className="bg-accent text-slate-900 text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow">
                    {blogPosts[0].category}
                  </span>
               </div>
            </div>
            
            <div className="lg:w-1/2 p-6 sm:p-10 lg:p-16 flex flex-col justify-center bg-white relative">
               <div className="hidden lg:flex items-center gap-3 mb-6">
                  <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    {blogPosts[0].category}
                  </span>
                  <span className="text-slate-400 text-sm font-semibold flex items-center gap-1.5">
                    <Clock className="w-4 h-4" /> {blogPosts[0].readTime}
                  </span>
               </div>
               
               <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-slate-900 mb-4 sm:mb-6 leading-[1.15] tracking-tight hover:text-primary transition-colors cursor-pointer">
                  {blogPosts[0].title}
               </h2>
               
               <p className="text-slate-600 text-lg leading-relaxed mb-10 font-medium">
                  {blogPosts[0].excerpt}
               </p>
               
               <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-primary font-black shadow-inner">
                        NK
                     </div>
                     <div>
                        <p className="font-bold text-slate-900">{blogPosts[0].author}</p>
                        <p className="text-sm text-slate-500 font-medium">{blogPosts[0].authorRole}</p>
                     </div>
                  </div>
                  
                  <Button className="rounded-full bg-slate-900 hover:bg-primary text-white h-12 w-12 p-0 flex items-center justify-center transition-all group">
                     <ArrowUpRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </Button>
               </div>
            </div>
          </div>
          </Link>
        )}
      </div>
    </section>

    {/* Latest Feed & Quick Tips Grid */}
    <section className="py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="container max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           
           {/* Left Column: Latest Articles Feed */}
           <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-10">
                 <div className="h-px pt-0.5 bg-slate-900 w-8" />
                 <h3 className="text-2xl font-black text-slate-900 uppercase tracking-widest">Latest Stories</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Article 2 */}
                 {blogPosts[1] && (
                 <Link to={`/blog/${toSlug(blogPosts[1].title)}`} className="block h-[400px]">
                 <div className="group bg-white rounded-3xl p-8 border border-slate-200/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative overflow-hidden h-full">
                    <div className="absolute inset-0 bg-slate-100 opacity-10 group-hover:scale-105 transition-transform duration-700 pointer-events-none" />
                    
                    <div className="flex items-center gap-3 mb-6 relative z-10">
                       <span className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                          <HeartPulse className="w-3 h-3" /> {blogPosts[1].category}
                       </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors relative z-10 leading-snug">
                       {blogPosts[1].title}
                    </h3>
                    
                    <p className="text-slate-600 text-sm line-clamp-3 mb-6 relative z-10 font-medium leading-relaxed">
                       {blogPosts[1].excerpt}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6 relative z-10">
                       <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{blogPosts[1].author}</span>
                       </div>
                       <span className="text-slate-400 text-xs font-medium">{blogPosts[1].readTime}</span>
                    </div>
                 </div>
                 </Link>
                 )}

                 {/* Article 3 */}
                 {blogPosts[2] && (
                 <Link to={`/blog/${toSlug(blogPosts[2].title)}`} className="block h-[400px]">
                 <div className="group bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-6">
                       <span className="inline-flex items-center gap-1.5 bg-white/10 text-blue-200 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                          <Moon className="w-3 h-3" /> {blogPosts[2].category}
                       </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors leading-snug">
                       {blogPosts[2].title}
                    </h3>
                    
                    <p className="text-slate-400 text-sm line-clamp-3 mb-6 font-medium leading-relaxed max-w-[90%]">
                       {blogPosts[2].excerpt}
                    </p>
                    
                    <div className="mt-auto flex items-center justify-between border-t border-slate-800 pt-6">
                       <div className="flex items-center gap-2 text-white">
                          <span className="text-xs font-bold">{blogPosts[2].author}</span>
                       </div>
                       <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-slate-900 transition-colors">
                          <ArrowUpRight className="w-4 h-4" />
                       </div>
                    </div>
                 </div>
                 </Link>
                 )}

                 {/* Article 4 (Spans full width) */}
                 {blogPosts[3] && (
                 <Link to={`/blog/${toSlug(blogPosts[3].title)}`} className="block md:col-span-2">
                 <div className="group bg-gradient-to-br from-white to-slate-50 rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row gap-8 items-center overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-full pointer-events-none" />
                    
                    <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 shadow-inner">
                       <BarChart3 className="w-10 h-10 text-primary" />
                    </div>
                    
                    <div className="flex-1 relative z-10">
                       <div className="flex items-center gap-3 mb-3">
                          <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                             {blogPosts[3].category}
                          </span>
                       </div>
                       <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">
                          {blogPosts[3].title}
                       </h3>
                       <p className="text-slate-600 text-sm line-clamp-2 md:line-clamp-1 font-medium">
                          {blogPosts[3].excerpt}
                       </p>
                    </div>
                 </div>
                 </Link>
                 )}
              </div>
           </div>

           {/* Right Column: Quick Tips Widget */}
           <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-4 mb-10">
                 <div className="h-px pt-0.5 bg-accent w-8" />
                 <h3 className="text-2xl font-black text-slate-900 uppercase tracking-widest">Core Habits</h3>
              </div>
              
              <div className="bg-white rounded-[32px] p-8 border border-slate-200/60 shadow-xl relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-accent" />
                 
                 <div className="space-y-8 relative z-10">
                    {sleepTips.map((tip, i) => (
                      <div key={i} className="group relative">
                         {i !== 0 && <div className="h-px bg-slate-100 w-full mb-8" />}
                         <div className="flex gap-4 items-start">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors border border-slate-100">
                               <tip.icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                            </div>
                            <div>
                               <h4 className="font-bold text-slate-900 mb-1.5 group-hover:text-primary transition-colors">{tip.title}</h4>
                               <p className="text-xs text-slate-500 font-medium leading-relaxed">{tip.desc}</p>
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
           
        </div>
      </div>
    </section>

    {/* Massive Footer CTA */}
    <section className="py-16 sm:py-32 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[100px]" />
      </div>
      
      <div className="container relative z-10 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
          Ready to experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-300">perfect night?</span>
        </h2>
        <p className="text-base sm:text-xl text-white/70 mb-8 sm:mb-12 font-medium leading-relaxed">
          Put our science into practice. Find the exact mattress engineered for your body type and sleep position.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
           <Button size="lg" className="h-14 px-8 rounded-full bg-accent hover:bg-yellow-400 text-slate-900 font-black tracking-wide text-lg w-full sm:w-auto shadow-[0_0_40px_rgba(255,183,3,0.3)]">
             Find Your Mattress
           </Button>
           <Button size="lg" variant="outline" className="h-14 px-8 rounded-full bg-white/5 border-white/20 text-white hover:bg-white hover:text-slate-900 font-bold w-full sm:w-auto transition-colors">
             Take the Sleep Quiz
           </Button>
        </div>
      </div>
    </section>

  </div>
  </>
);

export default Blog;
