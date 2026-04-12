import memoryFoamImg from "@/assets/mattress-memory-foam.jpg";
import orthopedicImg from "@/assets/mattress-orthopedic.jpg";
import latexImg from "@/assets/mattress-latex.jpg";
import hybridImg from "@/assets/mattress-hybrid.jpg";
import pillowtopImg from "@/assets/mattress-pillowtop.jpg";
import boxedImg from "@/assets/mattress-boxed.jpg";
import firmImg from "@/assets/mattress-firm.jpg";
import coolingImg from "@/assets/mattress-cooling.jpg";
import kidsImg from "@/assets/mattress-kids.jpg";
import eurotopImg from "@/assets/mattress-eurotop.jpg";

export interface Product {
  id: string;
  name: string;
  type: "memory-foam" | "orthopedic" | "latex" | "hybrid";
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  sizes: string[];
  firmness: "soft" | "medium" | "firm";
  bestseller?: boolean;
  features: string[];
  description: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "CloudRest Memory Foam",
    type: "memory-foam",
    price: 8999,
    originalPrice: 14999,
    rating: 4.8,
    reviews: 2341,
    image: memoryFoamImg,
    sizes: ["Single", "Double", "Queen", "King"],
    firmness: "medium",
    bestseller: true,
    features: ["Pressure Relief", "Motion Isolation", "Cooling Gel Layer", "CertiPUR-US Certified"],
    description: "Experience cloud-like comfort with our premium memory foam mattress. Engineered with advanced cooling gel technology and body-conforming support.",
  },
  {
    id: "2",
    name: "SpineGuard Orthopedic",
    type: "orthopedic",
    price: 10999,
    originalPrice: 18999,
    rating: 4.9,
    reviews: 1856,
    image: orthopedicImg,
    sizes: ["Single", "Double", "Queen", "King"],
    firmness: "firm",
    bestseller: true,
    features: ["Spinal Alignment", "High-Density Foam", "Anti-Sag Technology", "Doctor Recommended"],
    description: "Designed for optimal spinal support, this orthopedic mattress is recommended by doctors for back pain relief and healthy sleep posture.",
  },
  {
    id: "3",
    name: "NatureSleep Latex",
    type: "latex",
    price: 15999,
    originalPrice: 24999,
    rating: 4.7,
    reviews: 1234,
    image: latexImg,
    sizes: ["Double", "Queen", "King"],
    firmness: "medium",
    features: ["100% Natural Latex", "Hypoallergenic", "Eco-Friendly", "Breathable"],
    description: "Crafted from 100% natural latex, this mattress offers exceptional breathability and eco-friendly comfort for the conscious sleeper.",
  },
  {
    id: "4",
    name: "DreamFusion Hybrid",
    type: "hybrid",
    price: 12999,
    originalPrice: 19999,
    rating: 4.8,
    reviews: 1567,
    image: hybridImg,
    sizes: ["Single", "Double", "Queen", "King"],
    firmness: "medium",
    bestseller: true,
    features: ["Pocketed Springs", "Memory Foam Top", "Edge Support", "Temperature Neutral"],
    description: "The best of both worlds — pocketed spring support with a premium memory foam top for unmatched comfort and durability.",
  },
  {
    id: "5",
    name: "CloudRest Plus",
    type: "memory-foam",
    price: 11999,
    originalPrice: 17999,
    rating: 4.6,
    reviews: 987,
    image: pillowtopImg,
    sizes: ["Queen", "King"],
    firmness: "soft",
    features: ["Extra Plush Top", "Adaptive Foam", "Zero Motion Transfer", "Breathable Cover"],
    description: "Our most luxurious memory foam mattress with an extra plush pillow-top layer for those who love sinking into softness.",
  },
  {
    id: "6",
    name: "SpineGuard Pro",
    type: "orthopedic",
    price: 13999,
    originalPrice: 21999,
    rating: 4.9,
    reviews: 765,
    image: firmImg,
    sizes: ["Single", "Double", "Queen", "King"],
    firmness: "firm",
    features: ["Advanced Lumbar Support", "Reinforced Core", "Pressure Mapping", "10-Year Warranty"],
    description: "Professional-grade orthopedic support with advanced lumbar technology for the most demanding sleepers.",
  },
  {
    id: "7",
    name: "ArcticBreeze Cooling Gel",
    type: "memory-foam",
    price: 13499,
    originalPrice: 20999,
    rating: 4.7,
    reviews: 1102,
    image: coolingImg,
    sizes: ["Double", "Queen", "King"],
    firmness: "medium",
    bestseller: true,
    features: ["Gel-Infused Foam", "Phase-Change Material", "Airflow Channels", "Cool-Touch Cover"],
    description: "Stay cool all night with our advanced cooling gel mattress featuring phase-change technology that actively regulates your body temperature.",
  },
  {
    id: "8",
    name: "EcoBliss Natural Latex",
    type: "latex",
    price: 18999,
    originalPrice: 28999,
    rating: 4.8,
    reviews: 643,
    image: eurotopImg,
    sizes: ["Queen", "King"],
    firmness: "medium",
    features: ["Organic Cotton Cover", "Dunlop Latex Core", "Zero VOC", "GOLS Certified"],
    description: "Our premium euro-top latex mattress with an organic cotton cover and GOLS-certified Dunlop latex for the ultimate in sustainable luxury.",
  },
  {
    id: "9",
    name: "DreamBox Compact",
    type: "hybrid",
    price: 6999,
    originalPrice: 11999,
    rating: 4.5,
    reviews: 2156,
    image: boxedImg,
    sizes: ["Single", "Double", "Queen"],
    firmness: "medium",
    features: ["Bed-in-a-Box", "Easy Setup", "Compact Delivery", "30-Day Trial"],
    description: "Conveniently delivered in a box, this hybrid mattress expands to full size in hours. Perfect for apartments, guest rooms, and easy moving.",
  },
  {
    id: "10",
    name: "LittleDreamer Kids",
    type: "memory-foam",
    price: 4999,
    originalPrice: 7999,
    rating: 4.6,
    reviews: 892,
    image: kidsImg,
    sizes: ["Single"],
    firmness: "medium",
    features: ["Child-Safe Materials", "Anti-Bacterial", "Washable Cover", "Growth-Friendly Support"],
    description: "Designed specifically for growing kids with child-safe, anti-bacterial materials and the right amount of support for developing bodies.",
  },
  {
    id: "11",
    name: "HybridElite Luxury",
    type: "hybrid",
    price: 17999,
    originalPrice: 27999,
    rating: 4.9,
    reviews: 534,
    image: eurotopImg,
    sizes: ["Queen", "King"],
    firmness: "medium",
    bestseller: true,
    features: ["Titanium Coil System", "Cashmere Blend Cover", "Zoned Support", "15-Year Warranty"],
    description: "Our flagship hybrid mattress with a titanium coil system and cashmere-blend cover for hotel-grade luxury in your bedroom.",
  },
  {
    id: "12",
    name: "BackCare Essential",
    type: "orthopedic",
    price: 7999,
    originalPrice: 12999,
    rating: 4.5,
    reviews: 1678,
    image: firmImg,
    sizes: ["Single", "Double", "Queen", "King"],
    firmness: "firm",
    features: ["Coir & Foam Layers", "Budget-Friendly", "Posture Support", "5-Year Warranty"],
    description: "Affordable orthopedic support with natural coir and high-density foam layers. The smart choice for back care on a budget.",
  },
];
export const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The CloudRest Memory Foam changed my sleep completely. I wake up refreshed every morning. Best investment I've made for my health!",
    product: "CloudRest Memory Foam",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Delhi",
    rating: 5,
    text: "My back pain reduced significantly after switching to SpineGuard. The orthopedic support is incredible. Highly recommended!",
    product: "SpineGuard Orthopedic",
  },
  {
    id: 3,
    name: "Ananya Patel",
    location: "Bangalore",
    rating: 5,
    text: "The NatureSleep Latex mattress is so breathable. Perfect for Indian summers. And it's eco-friendly too — love that!",
    product: "NatureSleep Latex",
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Hyderabad",
    rating: 5,
    text: "Tried the DreamFusion Hybrid and it's the perfect balance of firm support and soft comfort. My wife and I both love it.",
    product: "DreamFusion Hybrid",
  },
  {
    id: 5,
    name: "Meera Iyer",
    location: "Chennai",
    rating: 5,
    text: "Finally got a mattress that doesn't trap heat. The ArcticBreeze Cooling is perfect for our weather. Sleeping cool all night!",
    product: "ArcticBreeze Cooling",
  },
  {
    id: 6,
    name: "Aditya Joshi",
    location: "Pune",
    rating: 5,
    text: "Ordered a mattress for my 5-year-old and the quality is exceptional. Firm enough for growing bodies and the anti-allergy feature is a bonus.",
    product: "JuniorNest Kids",
  },
  {
    id: 7,
    name: "Fatima Khan",
    location: "Lucknow",
    rating: 5,
    text: "The 100-night trial gave us confidence to try. Within a week, my husband's snoring reduced — the orthopedic alignment really works!",
    product: "SpineGuard Orthopedic",
  },
  {
    id: 8,
    name: "Suresh Reddy",
    location: "Vijayawada",
    rating: 5,
    text: "EMI option made it easy to buy a premium mattress. Delivery was free and on time. The unboxing experience felt truly premium.",
    product: "CloudRest Memory Foam",
  },
];

export const blogPosts = [
  {
    id: "1",
    title: "How to Choose the Right Mattress for Your Sleep Style",
    excerpt: "Your sleep position plays a crucial role in determining the best mattress for you. Here's a comprehensive guide to finding your perfect match based on science.",
    category: "Buying Guide",
    icon: "ShoppingBag",
    readTime: "5 min read",
    date: "March 15, 2026",
    author: "Dr. Neha Kapoor",
    authorRole: "Sleep Scientist",
  },
  {
    id: "2",
    title: "Best Mattress for Back Pain: A Complete Guide",
    excerpt: "Suffering from back pain? The right mattress can make all the difference. Learn what orthopedic experts recommend and our top-rated picks.",
    category: "Health",
    icon: "HeartPulse",
    readTime: "7 min read",
    date: "March 10, 2026",
    author: "Dr. Arjun Mehta",
    authorRole: "Orthopedic Advisor",
  },
  {
    id: "3",
    title: "10 Science-Backed Tips to Improve Your Sleep Quality",
    excerpt: "From sleep hygiene to room temperature, discover proven strategies that 50,000+ customers used to get deeper, more restful sleep every night.",
    category: "Sleep Tips",
    icon: "Moon",
    readTime: "6 min read",
    date: "March 5, 2026",
    author: "Mustafa's Mattress",
    authorRole: "Editorial Team",
  },
  {
    id: "4",
    title: "Memory Foam vs Latex vs Hybrid: Which Is Best?",
    excerpt: "Understanding the differences between mattress types helps you invest wisely. We break down comfort, durability, and value so you don't have to guess.",
    category: "Comparison",
    icon: "BarChart3",
    readTime: "8 min read",
    date: "February 28, 2026",
    author: "Rahul Verma",
    authorRole: "Product Engineer",
  },
];

export interface MegaMenuLink {
  label: string;
  href: string;
  isNew?: boolean;
}

export interface MegaMenuColumn {
  title: string;
  links: MegaMenuLink[];
}

export const megaMenuCategories: MegaMenuColumn[] = [
  {
    title: "Ortho Memory Foam Series",
    links: [
      { label: "Essential", href: "/products" },
      { label: "Classic", href: "/products" },
      { label: "Infiniti", href: "/products" },
      { label: "Ultra", href: "/products" },
      { label: "Spring", href: "/products" },
    ]
  },
  {
    title: "Dual Comfort Series",
    links: [
      { label: "Classic", href: "/products" },
      { label: "Plus", href: "/products" }
    ]
  },
  {
    title: "EcoLatex Series",
    links: [
      { label: "Essential", href: "/products" },
      { label: "Classic", href: "/products" },
      { label: "Infiniti", href: "/products" },
      { label: "Ultra", href: "/products" },
      { label: "Spring", href: "/products" },
    ]
  },
  {
    title: "XpertGrid Series",
    links: [
      { label: "Essential", href: "/products" },
      { label: "Classic", href: "/products" },
      { label: "Infiniti", href: "/products" },
      { label: "Ultra", href: "/products" },
      { label: "Spring", href: "/products" },
    ]
  },
  {
    title: "Utility Mattresses",
    links: [
      { label: "DreamPod Mattress", href: "/product/9" }, 
      { label: "Baby Mattress", href: "/product/10" },
      { label: "Rollup Mattress", href: "/products" },
      { label: "Flexagon TriFold Mattress", href: "/products" },
    ]
  },
  {
    title: "Mattress By Size",
    links: [
      { label: "King Size", href: "/products" },
      { label: "Queen Size", href: "/products" },
      { label: "Single Bed", href: "/products" },
      { label: "Diwan Size", href: "/products" },
      { label: "Kids Mattress", href: "/product/10" },
    ]
  },
  {
    title: "Mustafa's PureSleep Mattress",
    links: [
      { label: "PostureFlex PureSleep", href: "/products" },
      { label: "DualSwitch PureSleep", href: "/products" },
      { label: "Natura PureSleep Latex", href: "/products" },
      { label: "Ortho Plus ActiveCool", href: "/products" },
      { label: "Spinecore Firm Plus", href: "/products" },
      { label: "Optima Plus Pocket Spring", href: "/products" },
      { label: "IcyBreeze HR Foam", href: "/product/7" },
      { label: "BlissMax Mattress", href: "/product/5" },
    ]
  }
];
