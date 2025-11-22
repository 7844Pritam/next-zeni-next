import HeroHello from "./components/Hero";
import Statistics from "./components/Statistics";
import Features from "./components/Features";
import CategoryShowcase from "./components/CategoryShowcase";
import AboutCard from "./components/about/AboutCard";
import HowItWorks from "./components/HowItWorks";
import TestimonialsCarousel from "./components/TestimonialsCarousel";
import ShowBlogs from "./components/blog/ShowBlogs";
import CTASection from "./components/CTASection";

const Home = () => {
  return (
    <>
      {/* Hero Section - First impression with trust indicators */}
      <HeroHello />

      {/* Statistics - Build credibility immediately */}
      <Statistics />

      {/* Features - Show value propositions */}
      <Features />

      {/* Course Categories - Interactive exploration */}
      <CategoryShowcase />

      {/* About/Mission - Deeper connection */}
      <AboutCard />

      {/* How It Works - Clear process */}
      <HowItWorks />

      {/* Testimonials - Social proof */}
      <TestimonialsCarousel />

      {/* Blog Preview - Content showcase */}
      <ShowBlogs />

      {/* Final CTA - Conversion focus */}
      <CTASection />
    </>
  );
};

export default Home;
