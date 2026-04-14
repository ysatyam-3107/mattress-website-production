export interface GalleryItem {
  id: string;
  image: string;
  userName: string;
  location: string;
  mattressName: string;
  quote: string;
  gridSpan?: "row-span-2" | "col-span-2" | "";
}

export const sleepersGallery: GalleryItem[] = [
  {
    id: "g1",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=800",
    userName: "Aditi G.",
    location: "Bangalore",
    mattressName: "CloudRest Memory Foam",
    quote: "Fits perfectly in my minimalist bedroom. So comfy!",
    gridSpan: "row-span-2",
  },
  {
    id: "g2",
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800",
    userName: "Rahul S.",
    location: "Mumbai",
    mattressName: "DreamFusion Hybrid",
    quote: "The hybrid support is exactly what I needed.",
  },
  {
    id: "g3",
    image: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=800",
    userName: "Meera K.",
    location: "Delhi",
    mattressName: "NatureSleep Latex",
    quote: "All-natural and so breathable. Love it!",
    gridSpan: "col-span-2",
  },
  {
    id: "g4",
    image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&q=80&w=800",
    userName: "Vikram P.",
    location: "Pune",
    mattressName: "ArcticBreeze Cooling",
    quote: "Finally, a mattress that stays cool all night.",
  },
  {
    id: "g5",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800",
    userName: "Sana M.",
    location: "Hyderabad",
    mattressName: "SpineGuard Pro",
    quote: "Best for my back pain. High quality build.",
    gridSpan: "row-span-2",
  },
  {
    id: "g6",
    image: "https://images.unsplash.com/photo-1505693415957-283a9f936e79?auto=format&fit=crop&q=80&w=800",
    userName: "Karan B.",
    location: "Chennai",
    mattressName: "CloudRest Plus",
    quote: "Like sleeping on a cloud. Highly recommend.",
  },
  {
    id: "g7",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800",
    userName: "Ishani T.",
    location: "Jaipur",
    mattressName: "HybridElite Luxury",
    quote: "Luxury hotel feel at home. Phenomenal!",
    gridSpan: "col-span-2",
  },
  {
    id: "g8",
    image: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800",
    userName: "Arjun L.",
    location: "Kochi",
    mattressName: "NatureSleep Latex",
    quote: "Great for eco-conscious sleepers like me.",
  },
];
