import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/data/products";

interface ProductCarouselProps {
    products: Product[];
    title?: string;
    subtitle?: string;
}

const ProductCarousel = ({ products, title, subtitle }: ProductCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerSlide(1);
            } else if (window.innerWidth < 1024) {
                setItemsPerSlide(2);
            } else {
                setItemsPerSlide(3);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const maxIndex = Math.max(0, products.length - itemsPerSlide);

    const next = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerSlide);

    return (
        <div className="w-full">
            {(title || subtitle) && (
                <div className="text-center mb-12">
                    {title && <h2 className="text-4xl md:text-5xl font-bold mb-3 text-foreground">{title}</h2>}
                    {subtitle && <p className="text-lg text-muted-foreground">{subtitle}</p>}
                </div>
            )}

            <div className="relative">
                {/* Carousel Container */}
                <div className="overflow-hidden">
                    <div className="flex gap-6">
                        {visibleProducts.map((product) => (
                            <div key={product.id} className="flex-1 min-w-0">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons */}
                {products.length > itemsPerSlide && (
                    <>
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover-scale z-10"
                            onClick={prev}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover-scale z-10"
                            onClick={next}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </Button>
                    </>
                )}

                {/* Carousel Indicators */}
                {products.length > itemsPerSlide && (
                    <div className="flex justify-center gap-2 mt-8">
                        {Array.from({ length: Math.ceil(products.length / itemsPerSlide) }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(Math.min(index * itemsPerSlide, maxIndex))}
                                className={`h-2.5 rounded-full transition-all duration-300 ${index === Math.floor(currentIndex / itemsPerSlide) || (currentIndex >= maxIndex && index === Math.ceil(products.length / itemsPerSlide) - 1)
                                        ? "bg-primary w-8"
                                        : "bg-primary/30 w-2.5"
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCarousel;
