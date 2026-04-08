import { Clock, BookOpen, Moon, Heart, Lightbulb, TrendingUp, CheckCircle2, ArrowRight } from "lucide-react";
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
    <section className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Sleep guide hero" className="w-full h-full object-cover" width={1920} height={600} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/45" />
      </div>

      <div className="relative z-10 container px-4 py-20 text-center max-w-4xl mx-auto">
        <div className="space-y-8">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border-white/20">Sleep Science & Tips</Badge>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            Your Complete Sleep Guide
          </h1>
          <p className="text-xl md:text-2xl text-white/95 leading-relaxed drop-shadow">
            Expert advice, science-backed tips, and everything you need to know about better sleep and finding the perfect mattress for your needs.
          </p>
        </div>
      </div>
    </section>

    {/* Sleep Tips Quick View */}
    <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b border-primary/10">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple Sleep Improvement Tips</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Science-backed strategies to sleep better tonight</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sleepTips.map((tip, i) => (
            <div key={i} className="group bg-white rounded-2xl p-7 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:from-primary group-hover:to-accent group-hover:text-white transition-all duration-300">
                <tip.icon className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-lg mb-3 text-foreground group-hover:text-primary transition-colors">{tip.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Featured Article */}
    <section className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary">Featured Article</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Expert Sleep Insights</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Deep dive into mattress selection and sleep science</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Featured Content */}
          <div className="space-y-8">
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-sm">Buying Guide</Badge>
            <h3 className="text-3xl md:text-4xl font-bold leading-tight">
              How to Choose the Right Mattress for Your Sleep Style
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Your sleep position plays a crucial role in determining the best mattress for you. Whether you're a side sleeper, back sleeper, or stomach sleeper, different mattresses offer different levels of support and comfort. Learn the key factors to consider when selecting your perfect mattress.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-primary/5 transition-colors">
                <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Know Your Sleep Position</p>
                  <p className="text-sm text-muted-foreground mt-1">Side sleepers need more cushioning, back sleepers need balanced support.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-primary/5 transition-colors">
                <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Consider Firmness Level</p>
                  <p className="text-sm text-muted-foreground mt-1">Firmness affects both comfort and spinal alignment throughout the night.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-primary/5 transition-colors">
                <CheckCircle2 className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Test Before Buying</p>
                  <p className="text-sm text-muted-foreground mt-1">Our 100-night free trial lets you sleep on it risk-free.</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground pt-4">
              <span>March 15, 2026</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> 5 min read</span>
            </div>
            <Button className="bg-primary text-white hover:bg-primary/90 px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium">
              Read Full Guide <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {/* Featured Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl aspect-square flex items-center justify-center overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 group-hover:from-primary/40 group-hover:to-accent/40 transition-all duration-300"></div>
              <BookOpen className="h-24 w-24 text-primary/60 relative z-10 group-hover:text-primary/80 transition-colors group-hover:scale-110" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* More Articles */}
    <section className="py-24 bg-primary/5 border-t border-primary/10">
      <div className="container">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">More Sleep Guides</h2>
            <p className="text-muted-foreground">Explore our comprehensive collection of sleep and mattress resources</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.filter(post => post.id !== "1").map((post) => (
            <article key={post.id} className="bg-white rounded-2xl border border-primary/10 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer group">
              {/* Image Container */}
              <div className="h-56 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent group-hover:from-primary/20 transition-all duration-300"></div>
                <BookOpen className="h-20 w-20 text-primary/50 group-hover:text-primary/70 group-hover:scale-110 transition-all relative z-10" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">{post.category}</Badge>
                  <span className="text-xs text-muted-foreground font-medium">{post.date}</span>
                </div>
                <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* Sleep Tips Quiz / CTA */}
    <section className="py-24 bg-gradient-to-br from-primary via-primary to-accent relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-24 h-24 bg-white/15 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '0.5s' }} />
      </div>
      <div className="container relative z-10 text-center max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">Ready to Sleep Better?</h2>
        <p className="text-lg text-white/95 mb-10 leading-relaxed drop-shadow">
          Apply these science-backed sleep tips and find the perfect mattress for your needs. Our expert team is here to help you choose the ideal mattress for your sleep style.
        </p>
        <Button size="lg" className="bg-white text-primary hover:bg-white/95 text-base px-10 py-7 rounded-full shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 font-semibold">
          Find Your Perfect Mattress <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>

    {/* Sleep Statistics */}
    <section className="py-24 bg-background border-t border-primary/10">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Sleep Matters</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">The impact of quality sleep on your health and wellbeing</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-8 bg-white rounded-2xl border border-primary/10 hover:border-primary/20 transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="text-5xl font-bold text-primary mb-3">⅓</div>
            <h3 className="text-xl font-bold text-foreground mb-2">Of Your Life</h3>
            <p className="text-muted-foreground">You spend about one-third of your life sleeping. Quality mattress matters!</p>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl border border-primary/10 hover:border-primary/20 transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="text-5xl font-bold text-primary mb-3">7-9</div>
            <h3 className="text-xl font-bold text-foreground mb-2">Hours Needed</h3>
            <p className="text-muted-foreground">Most adults need 7-9 hours of sleep for optimal health and productivity.</p>
          </div>
          <div className="text-center p-8 bg-white rounded-2xl border border-primary/10 hover:border-primary/20 transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="text-5xl font-bold text-primary mb-3">90%</div>
            <h3 className="text-xl font-bold text-foreground mb-2">Sleep Dependent</h3>
            <p className="text-muted-foreground">Your mattress influences 90% of your sleep comfort experience.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default Blog;
