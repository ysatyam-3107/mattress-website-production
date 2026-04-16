import { useParams, Link } from "react-router-dom";
import { Clock, ArrowLeft, ArrowRight, User } from "lucide-react";
import { blogPosts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

// Slug generator from title
const toSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// Extended blog content for individual pages
const blogContent: Record<string, string[]> = {
  "1": [
    "Choosing the right mattress is one of the most important decisions you'll make for your health. Your sleep position plays a crucial role in determining the ideal mattress firmness, material, and support system.",
    "Side sleepers need a softer mattress that conforms to the curves of their body, especially at the shoulders and hips. Memory foam and hybrid mattresses work exceptionally well for this sleep style, providing pressure relief where it matters most.",
    "Back sleepers benefit from medium-firm mattresses that maintain proper spinal alignment. Orthopedic and hybrid options provide the right balance of support and comfort, ensuring your spine stays in a neutral position throughout the night.",
    "Stomach sleepers require a firmer surface to prevent their hips from sinking too deep, which can cause lower back pain. A firm orthopedic or high-density foam mattress is ideal for maintaining proper alignment.",
    "If you're a combination sleeper who changes positions throughout the night, a medium-firm hybrid mattress is your best bet. The pocketed coils provide responsive support as you move, while the foam layers offer continuous comfort.",
    "Beyond sleep position, consider factors like body weight, temperature preferences, and any existing pain conditions. Heavier individuals generally need firmer support, while lighter sleepers may prefer softer options.",
  ],
  "2": [
    "Back pain affects millions of Indians, and the wrong mattress is often a significant contributing factor. Understanding the relationship between your mattress and spinal health is crucial for finding relief.",
    "The key principle for back pain relief is maintaining neutral spinal alignment. When your spine is properly aligned during sleep, the muscles and ligaments can fully relax and recover from the day's activities.",
    "For lower back pain, orthopedic mattresses with targeted lumbar support are highly recommended. These mattresses feature zones of varying firmness to support the natural curve of your spine.",
    "Memory foam mattresses can also be excellent for back pain sufferers, as they conform precisely to your body's contours, distributing weight evenly and eliminating pressure points.",
    "If your back pain is related to muscle tension, a medium-firm mattress is typically ideal. Too soft, and your spine sags; too firm, and it creates pressure points that lead to tossing and turning.",
    "Remember that a new mattress may require a 2-4 week adjustment period. If your pain persists beyond this period, consult an orthopedic specialist for personalized advice.",
  ],
  "3": [
    "Quality sleep is the foundation of good health, yet many of us don't prioritize it. Here are ten science-backed strategies that our customers have used to dramatically improve their sleep quality.",
    "1. Maintain a consistent sleep schedule. Going to bed and waking up at the same time every day — even on weekends — helps regulate your circadian rhythm and improves overall sleep quality.",
    "2. Optimize your bedroom temperature. Research shows that 18-20°C (65-68°F) is the ideal temperature for sleep. Consider a cooling mattress if you tend to sleep hot.",
    "3. Limit screen time before bed. The blue light emitted by devices suppresses melatonin production. Try to avoid screens for at least 30 minutes before bedtime.",
    "4. Create a relaxing bedtime routine. Activities like reading, gentle stretching, or meditation signal to your body that it's time to wind down.",
    "5. Invest in quality bedding. Your mattress, pillows, and sheets all contribute to sleep quality. Replace your mattress every 7-10 years for optimal support.",
  ],
  "4": [
    "With so many mattress types available, choosing the right one can feel overwhelming. Let's break down the three most popular options: memory foam, latex, and hybrid mattresses.",
    "Memory foam mattresses are known for their exceptional pressure relief and body-conforming properties. They're ideal for side sleepers and those who want motion isolation — perfect if you share your bed with a partner.",
    "Natural latex mattresses offer superior breathability and eco-friendliness. They're naturally hypoallergenic and resistant to dust mites, making them an excellent choice for allergy sufferers. Latex also tends to be more durable than foam.",
    "Hybrid mattresses combine the best of both worlds — pocketed coils for support and responsive bounce, topped with foam or latex layers for comfort. They're the most versatile option, suitable for most sleep positions and body types.",
    "In terms of durability, latex leads the pack with an average lifespan of 12-15 years, followed by hybrids at 8-10 years, and memory foam at 7-10 years.",
    "Price-wise, memory foam tends to be the most affordable, followed by hybrids, with natural latex being the premium option. However, when you factor in longevity, the cost-per-year can be comparable across all three types.",
  ],
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => toSlug(p.title) === slug);

  if (!post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold mb-4 font-playfair text-[#1E3A8A]">
          Article not found
        </h1>
        <Link to="/blog">
          <Button className="bg-[#3B82F6] hover:bg-blue-600 font-montserrat">
            Back to Sleep Guide
          </Button>
        </Link>
      </div>
    );
  }

  const content = blogContent[post.id] || [];
  const currentIndex = blogPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        type="article"
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          author: {
            "@type": "Person",
            name: post.author,
          },
          publisher: {
            "@type": "Organization",
            name: "Mustafa's Mattress",
          },
          datePublished: post.date,
        })}
      </script>

      <article className="min-h-screen bg-background">
        {/* Hero */}
        <div className="bg-[#1E3A8A] py-16 lg:py-24 relative overflow-hidden">
          <div className="absolute -top-40 right-10 w-[500px] h-[500px] bg-[#3B82F6]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="container relative z-10 max-w-3xl">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-blue-200/70 hover:text-white text-sm font-montserrat mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Sleep Guide
            </Link>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-[#3B82F6] text-white text-xs font-bold px-3 py-1 rounded-lg uppercase tracking-wider font-montserrat">
                {post.category}
              </span>
              <span className="text-blue-200/60 text-sm flex items-center gap-1.5 font-montserrat">
                <Clock className="w-3.5 h-3.5" /> {post.readTime}
              </span>
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold text-white leading-tight font-playfair mb-8">
              {post.title}
            </h1>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#3B82F6]/30 flex items-center justify-center">
                <User className="w-5 h-5 text-blue-200" />
              </div>
              <div>
                <p className="text-white text-sm font-bold font-montserrat">
                  {post.author}
                </p>
                <p className="text-blue-200/50 text-xs font-montserrat">
                  {post.authorRole} · {post.date}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container max-w-3xl py-16">
          <div className="prose prose-lg dark:prose-invert max-w-none font-montserrat">
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-medium border-l-4 border-[#3B82F6] pl-6 mb-10">
              {post.excerpt}
            </p>
            {content.map((paragraph, idx) => (
              <p
                key={idx}
                className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Navigation */}
          <div className="border-t border-border mt-16 pt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevPost ? (
              <Link
                to={`/blog/${toSlug(prevPost.title)}`}
                className="group p-5 rounded-xl border border-border hover:border-[#3B82F6]/30 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all"
              >
                <span className="text-xs text-muted-foreground font-montserrat flex items-center gap-1">
                  <ArrowLeft className="w-3 h-3" /> Previous
                </span>
                <p className="font-bold text-sm mt-2 group-hover:text-[#3B82F6] transition-colors font-playfair line-clamp-1">
                  {prevPost.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {nextPost && (
              <Link
                to={`/blog/${toSlug(nextPost.title)}`}
                className="group p-5 rounded-xl border border-border hover:border-[#3B82F6]/30 hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-all text-right"
              >
                <span className="text-xs text-muted-foreground font-montserrat flex items-center gap-1 justify-end">
                  Next <ArrowRight className="w-3 h-3" />
                </span>
                <p className="font-bold text-sm mt-2 group-hover:text-[#3B82F6] transition-colors font-playfair line-clamp-1">
                  {nextPost.title}
                </p>
              </Link>
            )}
          </div>
        </div>
      </article>
    </>
  );
};

export default BlogPost;
