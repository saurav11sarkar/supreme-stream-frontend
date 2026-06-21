import { useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Raymond',
      role: 'Founder & CEO',
      image: 'https://static.readdy.ai/image/7064b84365a85e7f169350013ebfe335/c449f9fa21fff5aec1928dcea6466dab.jpeg',
      bio: 'Raymond Noriega is the Founder of Supreme Steam with over 20 years of hands-on experience in carpet, tile, hardwood floors, and upholstery cleaning, building the company on quality workmanship and trust. He is committed to delivering top-tier service to customers across Los Angeles County, Orange County, and the Inland Empire with a focus on results, reliability, and long-term relationships.'
    },
    {
      name: 'Jason',
      role: 'Director of Air Duct Services & Co-Owner',
      image: 'https://static.readdy.ai/image/7064b84365a85e7f169350013ebfe335/b9d6559b5ec51dde73bc2afec0baf143.jpeg',
      bio: 'Jason Bell brings over 15 years of hands-on experience in air duct cleaning and system restoration, leading Supreme Steam’s air duct division with expertise, precision, and integrity. As Co-Owner, he plays a key role in growing the company while setting high standards for service quality, safety, and customer satisfaction.'
    },
    {
      name: 'Salina',
      role: 'Operations Manager',
      image: 'https://static.readdy.ai/image/7064b84365a85e7f169350013ebfe335/acfaddc671ab14bbfd5dbd9e0a90eba1.jpeg',
      bio: 'Salina ensures every customer receives outstanding service and manages our team of certified cleaning professionals.'
    },
    {
      name: 'Jesse',
      role: 'Operations & Field Support',
      image: 'https://static.readdy.ai/image/7064b84365a85e7f169350013ebfe335/14eae88e83eeed514659e1aa0b452a90.jpeg',
      bio: 'Jesse assists with on-site operations as needed, supporting the team to ensure smooth execution and consistent service quality.'
    },
    {
      name: 'Ray & Midas',
      role: 'Future Supreme Steamers',
      image: 'https://static.readdy.ai/image/7064b84365a85e7f169350013ebfe335/cff4ce37f10b0dbd4caa7b49e453b5d4.jpeg',
      bio: 'Ray and Midas are our future and what we do it for. They are leaders of the next generation.'
    }
  ];

  const certifications = [
    {
      icon: 'ri-shield-check-line',
      title: 'IICRC Certified',
      description: 'Institute of Inspection, Cleaning and Restoration Certification'
    },
    {
      icon: 'ri-leaf-line',
      title: 'Eco-Friendly',
      description: 'Green Seal certified cleaning products and methods'
    },
    {
      icon: 'ri-award-line',
      title: 'Industry Awards',
      description: 'Recognized for excellence in customer service and quality'
    },
    {
      icon: 'ri-shield-star-line',
      title: 'Fully Insured',
      description: 'Comprehensive liability and workers compensation coverage'
    }
  ];

  useEffect(() => {
    document.title = 'About Us - Professional Cleaning Experts';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about our professional cleaning company with over 15 years of experience. We provide top-quality carpet, upholstery, and specialized cleaning services.');
    }

    // Add Schema.org JSON-LD
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Us",
      "description": "Learn about our professional cleaning company",
      "url": `${import.meta.env.VITE_SITE_URL || 'https://example.com'}/about`,
      "mainEntity": {
        "@type": "Organization",
        "name": "Professional Cleaning Services",
        "description": "Professional cleaning company with over 15 years of experience"
      }
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-[#0066CC] text-white py-20">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
            style={{
              backgroundImage: `url('https://static.readdy.ai/image/7064b84365a85e7f169350013ebfe335/f5156f144258b9b7ac01492606e6522d.jpeg')`
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-full max-w-2xl mx-auto mb-12">
                <div className="w-full overflow-hidden shadow-xl">
                  <img 
                    src="https://static.readdy.ai/image/7064b84365a85e7f169350013ebfe335/f5156f144258b9b7ac01492606e6522d.jpeg"
                    alt="Supreme Steam team"
                    className="w-full h-auto"
                  />
                </div>
              </div>
              <p className="text-xl md:text-2xl mb-8">
                Your Trusted Family-Owned Cleaning Experts in Azusa
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
                Our <strong>Story</strong>
              </h2>
              <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                <p>
                  At Supreme Steam, we believe that a clean home is the foundation of comfort, health, and happiness. Founded by Ray Noriega five years ago, our journey began as a humble side hustle while working for a leading chain cleaning company. With over 20 years of hands-on experience in the industry, Ray decided it was time to take the reins and create a service that truly reflects his passion for excellence and customer satisfaction.
                </p>
                <p>
                  What started as a one-person operation quickly grew into a thriving family business. Today, Supreme Steam is proudly operated by Ray, his wife, their children, and extended family members—all dedicated to delivering exceptional results with a personal touch. From residential carpet cleaning to commercial tile and grout services, every job is handled with care, precision, and eco-friendly practices.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-[#0066CC]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Our <strong>Mission</strong>
                </h2>
              </div>

              <div className="bg-[#0066CC] rounded-lg p-8 md:p-12 text-center max-w-4xl mx-auto">
                <p className="text-xl text-white leading-relaxed">
                  To provide top-tier steam cleaning services that exceed expectations while fostering trust and long-lasting relationships with our clients. From Beverly Hills homeowners to local businesses, we take pride in serving a diverse clientele who value reliability, affordability, and outstanding results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Our <strong>Values</strong>
                </h2>
                <p className="text-xl text-white max-w-3xl mx-auto">
                  We're committed to delivering exceptional cleaning services while maintaining the highest standards of integrity and professionalism.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg p-8 text-center">
                  <div className="w-16 h-16 bg-[#0066CC]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="ri-user-heart-line text-3xl text-[#0066CC]"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    <strong>Customer First</strong>
                  </h3>
                  <p className="text-gray-700">
                    Your satisfaction is our top priority. We go above and beyond to exceed expectations on every job.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-8 text-center">
                  <div className="w-16 h-16 bg-[#0066CC]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="ri-shield-check-line text-3xl text-[#0066CC]"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    <strong>Quality Guaranteed</strong>
                  </h3>
                  <p className="text-gray-700">
                    We use premium products and proven techniques to deliver outstanding results every time.
                  </p>
                </div>

                <div className="bg-white rounded-lg p-8 text-center">
                  <div className="w-16 h-16 bg-[#0066CC]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="ri-leaf-line text-3xl text-[#0066CC]"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    <strong>Eco-Friendly</strong>
                  </h3>
                  <p className="text-gray-700">
                    We care about your health and the environment, using safe, green cleaning solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Certifications & <strong>Credentials</strong>
                </h2>
                <p className="text-xl text-gray-600">
                  Our team maintains the highest industry certifications and standards
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-[#0066CC]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className={`${cert.icon} text-[#0066CC] text-3xl`}></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.title}</h3>
                    <p className="text-gray-600 text-sm">{cert.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-[#0066CC]">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Meet Our <strong>Team</strong>
                </h2>
                <p className="text-xl text-white/90">
                  Experienced professionals dedicated to exceptional service
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="w-full h-64 rounded-lg overflow-hidden mb-4 shadow-lg">
                      <img 
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-[center_10%]"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-white/90 font-semibold mb-3">{member.role}</p>
                    <p className="text-white/80 text-sm">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">
                Ready to Experience the Supreme Steam Difference?
              </h2>
              <p className="text-xl mb-8 text-gray-700">
                Join thousands of satisfied customers in Los Angeles County and San Bernardino County
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/quote"
                  className="bg-amber-500 text-white px-8 py-4 rounded-lg hover:bg-amber-600 transition-colors font-semibold text-lg whitespace-nowrap cursor-pointer"
                >
                  Get Free Quote
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
