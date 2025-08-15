import { useEffect } from "react";

export function usePageInteractions(options?: {
  smoothScroll?: boolean;
  parallaxSelector?: string;
  parallaxSpeed?: number;
  burgerId?: string;
  navLinksId?: string;
}) {
  const {
    parallaxSelector = ".absolute.inset-0",
    parallaxSpeed = 0.5,
    burgerId = "burger",
    navLinksId = "nav-links",
  } = options || {};

  // Parallax effect
  useEffect(() => {
    if (!parallaxSelector) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelector(parallaxSelector) as HTMLElement;
      if (parallax) {
        parallax.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [parallaxSelector, parallaxSpeed]);

  // Burger menu toggle
  useEffect(() => {
    if (!burgerId || !navLinksId) return;

    const burger = document.getElementById(burgerId);
    const navLinks = document.getElementById(navLinksId);
    if (!burger || !navLinks) return;

    const toggleNav = () => {
      navLinks.classList.toggle("hidden");
    };

    burger.addEventListener("click", toggleNav);
    return () => {
      burger.removeEventListener("click", toggleNav);
    };
  }, [burgerId, navLinksId]);
}
