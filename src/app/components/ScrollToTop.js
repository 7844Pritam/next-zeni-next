import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Smooth scroll to top with a slight delay for better UX
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100); // 100ms delay for smoothness

    return () => clearTimeout(timer);  // Cleanup on unmount
  }, [pathname]);

  return null;
};

export default ScrollToTop;
