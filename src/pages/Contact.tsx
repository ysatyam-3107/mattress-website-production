import { useState } from "react";
import { Send, MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqs = [
  { q: "What is the return policy?", a: "We offer a 100-night free trial. If you're not satisfied, we'll pick up the mattress and give you a full refund." },
  { q: "How long does delivery take?", a: "We deliver within 5-7 business days across India. Delivery is completely free." },
  { q: "Do you offer EMI options?", a: "Yes! We offer no-cost EMI starting from ₹999/month through all major banks and payment providers." },
  { q: "What warranty do you provide?", a: "All our mattresses come with a 10-year warranty covering manufacturing defects." },
  { q: "Can I try the mattress before buying?", a: "Yes — our 100-night trial lets you sleep on it at home. That's better than any showroom test!" },
];

const Contact = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <div className="bg-card border-b border-border/50 py-10">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">Get in Touch</h1>
          <p className="text-muted-foreground">We'd love to hear from you</p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-card rounded-xl border border-border/50 p-8 space-y-6">
            <h2 className="text-xl font-semibold">Send us a message</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" placeholder="First Name" className="bg-muted rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
              <input type="text" placeholder="Last Name" className="bg-muted rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <input type="email" placeholder="Email Address" className="w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            <input type="tel" placeholder="Phone Number" className="w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30" />
            <textarea placeholder="Your Message" rows={4} className="w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
            <Button className="w-full" size="lg"><Send className="mr-2 h-4 w-4" /> Send Message</Button>
          </div>

          {/* FAQ */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-card rounded-xl border border-border/50 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left text-sm font-medium hover:bg-muted/50 transition-colors"
                  >
                    {faq.q}
                    <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-sm text-muted-foreground animate-fade-up">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Mock */}
      <div className="fixed bottom-6 right-6 z-40">
        {chatOpen && (
          <div className="mb-4 w-80 bg-card rounded-2xl border border-border shadow-2xl overflow-hidden animate-fade-up">
            <div className="bg-primary p-4">
              <h3 className="text-primary-foreground font-semibold text-sm">SleepWell Support</h3>
              <p className="text-primary-foreground/70 text-xs">We typically reply within minutes</p>
            </div>
            <div className="p-4 h-48 flex items-end">
              <div className="bg-muted rounded-lg px-3 py-2 text-sm max-w-[80%]">
                Hi! 👋 How can we help you find your perfect mattress?
              </div>
            </div>
            <div className="p-3 border-t border-border flex gap-2">
              <input type="text" placeholder="Type a message..." className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm outline-none" />
              <Button size="icon" className="rounded-lg"><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        )}
        <Button onClick={() => setChatOpen(!chatOpen)} size="lg" className="rounded-full h-14 w-14 shadow-lg">
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Contact;
