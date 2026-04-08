import { Clock, BookOpen } from "lucide-react";
import { blogPosts } from "@/data/products";

const Blog = () => (
  <div className="min-h-screen">
    <div className="bg-card border-b border-border/50 py-10">
      <div className="container">
        <h1 className="text-3xl font-bold mb-2">Sleep Guide</h1>
        <p className="text-muted-foreground">Expert tips and guides for better sleep</p>
      </div>
    </div>

    <div className="container py-12">
      <div className="grid sm:grid-cols-2 gap-6">
        {blogPosts.map((post) => (
          <article key={post.id} className="bg-card rounded-xl border border-border/50 overflow-hidden hover-lift group cursor-pointer">
            <div className="h-48 bg-gradient-to-br from-primary/10 to-accent flex items-center justify-center">
              <BookOpen className="h-12 w-12 text-primary/40" />
            </div>
            <div className="p-6 space-y-3">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">{post.category}</span>
              <h2 className="font-semibold text-lg group-hover:text-primary transition-colors">{post.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2">
                <span>{post.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </div>
);

export default Blog;
