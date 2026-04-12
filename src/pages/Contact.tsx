import { useState } from "react";
import { Send, MessageCircle, ChevronDown, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";

const faqs = [
  { q: "What is the return policy?", a: "We offer a 100-night free trial. If you're not satisfied, we'll pick up the mattress and give you a full refund." },
  { q: "How long does delivery take?", a: "We deliver within 5-7 business days across India. Delivery is completely free." },
  { q: "Do you offer EMI options?", a: "Yes! We offer no-cost EMI starting from ₹999/month through all major banks and payment providers." },
  { q: "What warranty do you provide?", a: "All our mattresses come with a 10-year warranty covering manufacturing defects." },
  { q: "Can I try the mattress before buying?", a: "Yes — our 100-night trial lets you sleep on it at home. That's better than any showroom test!" },
];

interface FormErrors {
  firstName?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [chatOpen, setChatOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter a message";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // In production, this would POST to an API endpoint
      setSubmitted(true);
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us & Support" 
        description="Have questions about our mattresses? Reach out to our sleep experts or chat with us live. We're here to help."
      />
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
          <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border/50 p-8 space-y-6" noValidate>
            <h2 className="text-xl font-semibold">Send us a message</h2>

            {submitted && (
              <div className="flex items-center gap-3 bg-success/10 text-success p-4 rounded-lg animate-fade-in">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <p className="text-sm font-medium">Thank you! Your message has been received. We'll get back to you within 24 hours.</p>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  className={`w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 ${errors.firstName ? "ring-2 ring-destructive/50" : ""}`}
                  aria-label="First name"
                  required
                />
                {errors.firstName && <p className="text-destructive text-xs mt-1">{errors.firstName}</p>}
              </div>
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="bg-muted rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
                aria-label="Last name"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address *"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 ${errors.email ? "ring-2 ring-destructive/50" : ""}`}
                aria-label="Email address"
                required
              />
              {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              aria-label="Phone number"
            />
            <div>
              <textarea
                placeholder="Your Message *"
                rows={4}
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className={`w-full bg-muted rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 resize-none ${errors.message ? "ring-2 ring-destructive/50" : ""}`}
                aria-label="Your message"
                required
              />
              {errors.message && <p className="text-destructive text-xs mt-1">{errors.message}</p>}
            </div>
            <Button type="submit" className="w-full" size="lg"><Send className="mr-2 h-4 w-4" /> Send Message</Button>
          </form>

          {/* FAQ */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-card rounded-xl border border-border/50 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left text-sm font-medium hover:bg-muted/50 transition-colors"
                    aria-expanded={openFaq === i}
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
            <div className="bg-primary p-4 flex items-center justify-between">
              <div>
                <h3 className="text-primary-foreground font-semibold text-sm">Mustafa's Mattress Support</h3>
                <p className="text-primary-foreground/70 text-xs">We typically reply within minutes</p>
              </div>
              <button onClick={() => setChatOpen(false)} className="text-primary-foreground/70 hover:text-primary-foreground" aria-label="Close chat">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-4 h-48 flex items-end">
              <div className="bg-muted rounded-lg px-3 py-2 text-sm max-w-[80%]">
                Hi! 👋 How can we help you find your perfect mattress?
              </div>
            </div>
            <div className="p-3 border-t border-border flex gap-2">
              <input type="text" placeholder="Type a message..." className="flex-1 bg-muted rounded-lg px-3 py-2 text-sm outline-none" aria-label="Chat message" />
              <Button size="icon" className="rounded-lg" aria-label="Send message"><Send className="h-4 w-4" /></Button>
            </div>
          </div>
        )}
        <Button onClick={() => setChatOpen(!chatOpen)} size="lg" className="rounded-full h-14 w-14 shadow-lg" aria-label={chatOpen ? "Close chat" : "Open support chat"}>
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
    </>
  );
};

export default Contact;
