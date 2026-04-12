import { Target, Heart, Award, Users, Lightbulb, BadgeIndianRupee } from "lucide-react";
import { SEO } from "@/components/SEO";

const values = [
  { icon: Lightbulb, title: "Research-Driven Design", desc: "Every mattress is backed by sleep science and extensive R&D." },
  { icon: BadgeIndianRupee, title: "Affordable Pricing", desc: "Premium quality at fair prices by cutting out middlemen." },
  { icon: Award, title: "High-Quality Materials", desc: "CertiPUR-US certified foams and natural materials only." },
  { icon: Users, title: "Customer-First Approach", desc: "100-night trial, free returns, and dedicated sleep experts." },
];

const About = () => (
  <>
    <SEO 
      title="Our Story & Core Values" 
      description="Learn about Mustafa's Mattress's mission to craft the perfect sleep experience. 100% Indian made, transparent pricing, and CertiPUR-US® certified."
    />
    <div className="min-h-screen">
    <div className="bg-primary py-20">
      <div className="container text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary-foreground">Our Story</h1>
        <p className="text-primary-foreground/80 max-w-2xl mx-auto text-lg">
          We started Mustafa's Mattress with a simple mission — to make great sleep affordable and accessible for every Indian home.
        </p>
      </div>
    </div>

    <div className="container py-20">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Improving Sleep, One Mattress at a Time</h2>
          <p className="text-muted-foreground leading-relaxed">
            Founded in 2020, Mustafa's Mattress was born out of frustration with overpriced, low-quality mattresses in India. We believed that everyone deserves a great night's sleep without breaking the bank.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Today, we serve over 50,000 happy customers across India. Our mattresses are designed in-house, rigorously tested, and delivered directly to your doorstep — no showroom markups.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { num: "50K+", label: "Happy Customers" },
            { num: "4.8★", label: "Average Rating" },
            { num: "25+", label: "Cities Served" },
            { num: "100", label: "Night Free Trial" },
          ].map((s) => (
            <div key={s.label} className="bg-accent rounded-xl p-6 text-center">
              <p className="text-2xl font-bold text-primary">{s.num}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="bg-muted/50 py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Why Choose Mustafa's Mattress?</h2>
          <p className="text-muted-foreground">What makes us different from the rest</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-card rounded-xl p-6 border border-border/50 hover-lift text-center space-y-3">
              <div className="mx-auto w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                <v.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-sm">{v.title}</h3>
              <p className="text-xs text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
  </>
);

export default About;
