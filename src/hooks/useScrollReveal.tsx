import React, { useEffect, useRef } from "react";

/**
 * Hook that observes elements and adds a "revealed" class when they enter the viewport.
 * Use with the `.reveal-section` CSS class defined in index.css.
 */
export const useScrollReveal = (threshold = 0.12) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    // Observe the ref element itself
    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
};

/**
 * Hook that observes ALL children of a container and reveals them with stagger.
 */
export const useStaggerReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = Array.from(container.children) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    children.forEach((child) => {
      child.classList.add("reveal-section");
      observer.observe(child);
    });

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
};

export const RevealSection = ({ children, threshold = 0.12, className = "", id }: { children: React.ReactNode, threshold?: number, className?: string, id?: string }) => {
  const ref = useScrollReveal(threshold);
  return (
    <div id={id} ref={ref} className={`reveal-section ${className}`}>
      {children}
    </div>
  );
};

export const StaggerRevealSection = ({ children, threshold = 0.1, className = "", id }: { children: React.ReactNode, threshold?: number, className?: string, id?: string }) => {
  const ref = useStaggerReveal(threshold);
  return (
    <div id={id} ref={ref} className={`stagger-children ${className}`}>
      {children}
    </div>
  );
};

