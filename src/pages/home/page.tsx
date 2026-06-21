
import { useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';

const HomePage = () => {
  useEffect(() => {
    document.title = 'Professional Cleaning Services - Carpet, Upholstery & More';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Professional carpet cleaning, upholstery cleaning, tile & grout cleaning, and air duct cleaning services. Get instant quotes and schedule your service today.');
    }

    // Add Schema.org JSON-LD
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Professional Cleaning Services",
      "description": "Professional carpet cleaning, upholstery cleaning, tile & grout cleaning, and air duct cleaning services",
      "url": `${import.meta.env.VITE_SITE_URL || 'https://example.com'}/`,
      "priceRange": "$$",
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 0,
          "longitude": 0
        },
        "geoRadius": "50"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Cleaning Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Carpet Cleaning",
              "description": "Deep steam cleaning for carpets and rugs"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Upholstery Cleaning",
              "description": "Professional furniture and upholstery cleaning"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Tile & Grout Cleaning",
              "description": "Restore your tile and grout to like-new condition"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Air Duct Cleaning",
              "description": "Complete HVAC system cleaning and sanitization"
            }
          }
        ]
      }
    });
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
