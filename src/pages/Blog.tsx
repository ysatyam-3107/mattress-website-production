import { Clock, BookOpen, Moon, Heart, Lightbulb, TrendingUp, CheckCircle2 } from "lucide-react";
import { blogPosts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImg from "@/assets/hero-bedroom.jpg";

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
  <div className="min-h-screen">
    {/* Hero Section */}
    <section className="relative w-full min-h-[500px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Sleep guide hero" className="w-full h-full object-cover" width={1920} height={600} />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 container px-4 py-20 text-center max-w-3xl mx-auto">
        <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30">Sleep Science & Tips</Badge>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Your Complete Sleep Guide
        </h1>
        <p className="text-lg md:text-xl text-white/90 leading-relaxed">
          Expert advice, science-backed tips, and everything you need to know about better sleep and finding the perfect mattress for your needs.
        </p>
      </div>
    </section>

    {/* Sleep Tips Quick View */}
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-primary/10">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Simple Sleep Improvement Tips</h2>
          <p className="text-lg text-muted-foreground">Science-backed strategies to sleep better tonight</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sleepTips.map((tip, i) => (
            <div key={i} className="group bg-white rounded-xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <tip.icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-foreground">{tip.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Featured Article */}
    <section className="py-20 bg-background">
      <div className="container">
        <h2 className="text-3xl font-bold mb-12">Featured Reading</h2>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Featured Content */}
          <div className="space-y-6">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-sm">Buying Guide</Badge>
            <h3 className="text-3xl font-bold leading-tight">
              How to Choose the Right Mattress for Your Sleep Style
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Your sleep position plays a crucial role in determining the best mattress for you. Whether you're a side sleeper, back sleeper, or stomach sleeper, different mattresses offer different levels of support and comfort. Learn the key factors to consider when selecting your perfect mattress.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Know Your Sleep Position</p>
                  <p className="text-sm text-muted-foreground">Side sleepers need more cushioning, back sleepers need balanced support.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Consider Firmness Level</p>
                  <p className="text-sm text-muted-foreground">Firmness affects both comfort and spinal alignment throughout the night.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Test Before Buying</p>
                  <p className="text-sm text-muted-foreground">Our 100-night free trial lets you sleep on it risk-free.</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-4">
              <span>March 15, 2026</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 5 min read</span>
            </div>
            <Button className="bg-primary text-white hover:bg-primary/90 mt-4">
              Read Full Guide
            </Button>
          </div>

          {/* Featured Image */}
          <div className="lg:order-2">
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl aspect-square overflow-hidden group">
              <BookOpen className="w-full h-full text-primary/40 flex items-center justify-center text-8xl" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* More Articles */}
    <section className="py-20 bg-primary/5 border-t border-primary/10">
      <div className="container">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">More Sleep Guides</h2>
            <p className="text-muted-foreground">Explore our comprehensive collection of sleep and mattress resources</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.filter(post => post.id !== "1").map((post) => (
            <article key={post.id} className="bg-white rounded-xl border border-primary/10 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
              {/* Image Container */}
              <div className="h-48 bg-gradient-to-br from-primary/15 to-accent/15 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-primary/20 via-accent/10 to-accent/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <BookOpen className="h-16 w-16 text-primary/40 group-hover:text-primary/60 transition-colors" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="border-primary/30 text-primary/70 hover:bg-primary/5">{post.category}</Badge>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground pt-2">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* Sleep Tips Quiz / CTA */}
    <section className="py-20 bg-gradient-to-br from-primary via-primary to-accent relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
      <div className="container relative z-10 text-center max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-4">Ready to Sleep Better?</h2>
        <p className="text-lg text-white/90 mb-8 leading-relaxed">
          Apply these science-backed sleep tips and find the perfect mattress for your needs. Our expert team is here to help you choose the ideal mattress for your sleep style.
        </p>
        <Button size="lg" variant="secondary" className="text-base px-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 bg-white text-primary hover:bg-white/90">
          Find Your Perfect Mattress
        </Button>
      </div>
    </section>

    {/* Sleep Statistics */}
    <section className="py-20 bg-background border-t border-primary/10">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why Sleep Matters</h2>
          <p className="text-lg text-muted-foreground">The impact of quality sleep on your health</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-primary mb-2">⅓</div>
            <h3 className="font-semibold text-lg mb-2">Of Your Life</h3>
            <p className="text-muted-foreground">You spend about one-third of your life sleeping. Quality matters!</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-primary mb-2">7-9</div>
            <h3 className="font-semibold text-lg mb-2">Hours Needed</h3>
            <p className="text-muted-foreground">Most adults need 7-9 hours of sleep for optimal health and productivity.</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-primary mb-2">90%</div>
            <h3 className="font-semibold text-lg mb-2">Sleep Dependent</h3>
            <p className="text-muted-foreground">Your mattress influences 90% of your sleep comfort experience.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Blog;
