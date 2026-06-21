import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

export default function ServicesPage() {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const services = [
    {
      icon: 'ri-home-4-fill',
      title: 'Carpet Cleaning',
      description: 'Deep steam cleaning that removes dirt, stains, and allergens from your carpets.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20carpet%20steam%20cleaning%20service%20in%20action%20showing%20industrial%20cleaning%20equipment%20removing%20deep%20stains%20from%20light%20colored%20carpet%20in%20modern%20home%20interior%20with%20natural%20lighting%20clean%20white%20background&width=600&height=400&seq=carpet-service-page&orientation=landscape',
      detailedDescription: 'Our professional carpet cleaning service uses state-of-the-art hot water extraction technology to deep clean your carpets. We remove embedded dirt, stubborn stains, allergens, and bacteria that regular vacuuming can\'t reach. Our eco-friendly cleaning solutions are safe for children and pets while being tough on dirt and odors.',
      estimatedPrice: 180,
      benefits: [
        'Removes 99% of allergens and bacteria',
        'Extends carpet life by up to 50%',
        'Eliminates odors at the source',
        'Fast drying time (4-6 hours)',
        'Safe for children and pets',
        'Improves indoor air quality'
      ],
      process: [
        'Pre-inspection and furniture moving',
        'Pre-treatment of stains and high-traffic areas',
        'Hot water extraction (steam cleaning)',
        'Grooming and speed drying',
        'Post-cleaning inspection'
      ]
    },
    {
      icon: 'ri-sofa-fill',
      title: 'Upholstery Cleaning',
      description: 'Specialized cleaning for furniture, chairs, and fabric surfaces.',
      image: 'https://static.readdy.ai/image/7064b84365a85e7f169350013ebfe335/f9d1f3ea53df80b576b25fcfaa83e564.jpeg',
      detailedDescription: 'Your furniture is an investment that deserves professional care. Our upholstery cleaning service restores the beauty and freshness of your sofas, chairs, and other fabric furniture. We use specialized techniques tailored to each fabric type, ensuring safe and effective cleaning without damage.',
      estimatedPrice: 150,
      benefits: [
        'Removes stains and odors',
        'Restores original colors and texture',
        'Extends furniture lifespan',
        'Eliminates dust mites and allergens',
        'Fabric-specific cleaning methods',
        'Optional fabric protection available'
      ],
      process: [
        'Fabric identification and testing',
        'Vacuuming to remove loose debris',
        'Pre-treatment of stains',
        'Deep cleaning with appropriate method',
        'Fabric protection application (optional)'
      ]
    },
    {
      icon: 'ri-grid-fill',
      title: 'Tile & Grout Cleaning',
      description: 'Restore the original beauty of your tile floors and grout lines.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20tile%20and%20grout%20cleaning%20service%20showing%20before%20and%20after%20results%20of%20white%20ceramic%20bathroom%20tiles%20being%20cleaned%20with%20industrial%20equipment%20bright%20lighting%20clean%20background&width=600&height=400&seq=tile-service-page&orientation=landscape',
      detailedDescription: 'Over time, tile and grout accumulate dirt, grime, and stains that regular mopping can\'t remove. Our professional tile and grout cleaning service uses high-pressure steam and specialized cleaning solutions to restore your floors to their original beauty. We clean all types of tile including ceramic, porcelain, and natural stone.',
      estimatedPrice: 200,
      benefits: [
        'Removes years of built-up grime',
        'Restores grout to original color',
        'Eliminates mold and mildew',
        'Sanitizes and disinfects surfaces',
        'Optional sealing for long-term protection',
        'Works on all tile types'
      ],
      process: [
        'Surface preparation and debris removal',
        'Application of specialized cleaning solution',
        'High-pressure steam cleaning',
        'Grout line scrubbing and extraction',
        'Optional sealing for long-term protection'
      ]
    },
    {
      icon: 'ri-leaf-fill',
      title: 'Hardwood Floor Care',
      description: 'Professional cleaning and restoration for hardwood floors.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20hardwood%20floor%20cleaning%20and%20polishing%20service%20showing%20gleaming%20oak%20floors%20in%20modern%20home%20interior%20with%20professional%20equipment%20natural%20lighting%20clean%20background&width=600&height=400&seq=hardwood-service-page&orientation=landscape',
      detailedDescription: 'Hardwood floors add elegance and value to your home, but they require special care to maintain their beauty. Our hardwood floor cleaning service uses gentle, wood-safe products and techniques to clean, restore, and protect your floors without causing damage. We handle all types of hardwood including oak, maple, cherry, and exotic woods.',
      estimatedPrice: 250,
      benefits: [
        'Gentle cleaning that won\'t damage wood',
        'Removes scratches and scuff marks',
        'Restores natural shine and luster',
        'Protective finish application',
        'Extends floor lifespan',
        'Enhances wood grain appearance'
      ],
      process: [
        'Floor assessment and damage inspection',
        'Gentle cleaning with wood-safe products',
        'Buffing and polishing',
        'Scratch repair (if needed)',
        'Protective finish application'
      ]
    },
    {
      icon: 'ri-windy-fill',
      title: 'Air Duct and Dryer Vent Cleaning',
      description: 'Improve indoor air quality and safety with comprehensive duct and dryer vent cleaning for residential and commercial properties.',
      image: 'https://static.readdy.ai/image/7064b84365a85e7f169350013ebfe335/93b013028d428315eba6b83050ae23ab.jpeg',
      detailedDescription: 'Your home and business air ducts and dryer vents circulate air throughout your spaces, but they also accumulate dust, allergens, lint, and contaminants over time. Our professional air duct and dryer vent cleaning service removes these pollutants, improving your indoor air quality, HVAC system efficiency, and preventing fire hazards. This service is especially beneficial for allergy sufferers, homes with pets, and commercial properties.',
      estimatedPrice: 500,
      benefits: [
        'Improves indoor air quality',
        'Reduces allergens and irritants',
        'Increases HVAC efficiency',
        'Eliminates musty odors',
        'Reduces dust in your space',
        'Extends HVAC system life'
      ],
      process: [
        'System inspection and access point creation',
        'Negative pressure setup',
        'Agitation and debris removal',
        'Sanitization and deodorization',
        'Final inspection and system testing'
      ]
    },
    {
      icon: 'ri-contrast-drop-2-fill',
      title: 'Power Washing',
      description: 'High-pressure cleaning for driveways, patios, siding, and exterior surfaces.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20power%20washing%20service%20technician%20cleaning%20concrete%20driveway%20with%20high%20pressure%20washer%20showing%20dramatic%20before%20and%20after%20cleaning%20results%20in%20residential%20setting%20with%20clean%20white%20background%20bright%20natural%20lighting&width=600&height=400&seq=powerwash-service-page&orientation=landscape',
      detailedDescription: 'Transform the exterior of your property with our professional power washing service. We use commercial-grade equipment to remove dirt, grime, mold, mildew, and stains from driveways, patios, decks, siding, fences, and more. Our experienced technicians adjust pressure levels based on surface type to ensure effective cleaning without damage.',
      estimatedPrice: 300,
      benefits: [
        'Removes years of built-up dirt and grime',
        'Eliminates mold and mildew',
        'Increases curb appeal and property value',
        'Prevents surface deterioration',
        'Eco-friendly cleaning solutions',
        'Safe for all exterior surfaces'
      ],
      process: [
        'Surface assessment and preparation',
        'Pre-treatment of stubborn stains',
        'High-pressure washing with appropriate PSI',
        'Detailed cleaning of edges and corners',
        'Final rinse and inspection'
      ]
    },
    {
      icon: 'ri-alarm-warning-fill',
      title: '24-Hour Emergency Water Damage',
      description: 'Fast response emergency water damage restoration available 24/7 to minimize damage and restore your property.',
      image: 'https://static.readdy.ai/image/7064b84365a85e7f169350013ebfe335/c719fad2e439f9ad3fedc0e989bd3ac3.jpeg',
      detailedDescription: 'Water damage emergencies require immediate attention to prevent further damage and costly repairs. Our 24-hour emergency water damage restoration service provides rapid response to floods, burst pipes, sewage backups, and other water emergencies. We use advanced extraction equipment and drying technology to quickly remove water, dry affected areas, and restore your property to pre-loss condition.',
      estimatedPrice: 0,
      benefits: [
        'Available 24/7 for emergencies',
        'Rapid response within 2 hours',
        'Advanced water extraction equipment',
        'Prevents mold and structural damage',
        'Insurance claim assistance',
        'Complete restoration services'
      ],
      process: [
        'Call Anytime - We answer 24/7 and dispatch immediately',
        'Stop the Source - Water is shut off and damage is assessed',
        'Extract Water - Standing water is removed fast',
        'Dry & Dehumidify - Professional equipment dries affected areas',
        'Monitor & Advise - We track moisture and guide next steps'
      ]
    }
  ];

  useEffect(() => {
    document.title = 'Our Services - Professional Cleaning Solutions';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore our comprehensive cleaning services including carpet cleaning, upholstery cleaning, tile & grout cleaning, hardwood floor cleaning, and air duct cleaning.');
    }

    // Add Schema.org JSON-LD
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Cleaning Services",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Professional Cleaning Services"
      },
      "areaServed": {
        "@type": "State",
        "name": "United States"
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
              "description": "Deep steam cleaning removes dirt, stains, and allergens from your carpets"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Upholstery Cleaning",
              "description": "Gentle yet effective cleaning for all types of furniture and fabrics"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Tile & Grout Cleaning",
              "description": "Restore the original beauty of your tile floors and grout lines"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Hardwood Floor Cleaning",
              "description": "Safe cleaning methods that protect and enhance your hardwood floors"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Air Duct Cleaning",
              "description": "Improve air quality and HVAC efficiency with professional duct cleaning"
            }
          }
        ]
      }
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-[#0066CC] text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Our Professional <strong>Cleaning Services</strong>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-50">
                Comprehensive cleaning solutions for residential and commercial properties in Los Angeles County and San Bernardino County. We use state-of-the-art equipment and eco-friendly products to deliver exceptional results.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/quote" 
                  className="bg-amber-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-amber-600 transition-colors inline-block whitespace-nowrap cursor-pointer"
                >
                  Build Quote
                </Link>
                <a 
                  href="tel:(626) 608-6470" 
                  className="bg-black border-2 border-black text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-900 transition-colors inline-block whitespace-nowrap cursor-pointer"
                >
                  Call (626) 608-6470
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-xl shadow-lg"
                  src="https://www.youtube.com/embed/-u13w1IbT38"
                  title="Supreme Steam Professional Cleaning Services"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="space-y-16">
              {services.map((service, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image */}
                    <div className={`relative h-80 md:h-auto ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full object-cover object-top"
                        style={{ objectPosition: index === 1 ? 'calc(50% - 1.5in) top' : (index === 0 ? 'center top' : (index === 2 ? 'calc(50% + 0in) top' : (index === 4 ? 'calc(50% + 0.5in) top' : 'center top'))) }}
                      />
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-10">
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        {service.title}
                      </h2>
                      <p className="text-lg text-gray-600 mb-6">
                        {service.detailedDescription}
                      </p>

                      {/* Benefits */}
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Key Benefits</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {service.benefits.map((benefit, benefitIndex) => (
                            <div key={benefitIndex} className="flex items-start">
                              <i className="ri-check-line text-green-500 text-xl mr-2 mt-0.5 flex-shrink-0"></i>
                              <span className="text-gray-700 text-sm">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Process Toggle */}
                      <button
                        onClick={() => setExpandedService(expandedService === index ? null : index)}
                        className="text-[#0066CC] font-semibold hover:text-blue-700 transition-colors inline-flex items-center cursor-pointer mb-4 whitespace-nowrap"
                      >
                        {expandedService === index ? 'Hide Our Process' : 'View Our Process'}
                        {expandedService === index ? (
                          <i className="ri-arrow-up-line ml-2"></i>
                        ) : (
                          <i className="ri-arrow-down-line ml-2"></i>
                        )}
                      </button>

                      {expandedService === index && (
                        <div className="bg-blue-50 rounded-lg p-6 mb-6">
                          <h4 className="font-bold text-gray-900 mb-4">Our Cleaning Process:</h4>
                          <ol className="space-y-3">
                            {service.process.map((step, stepIndex) => (
                              <li key={stepIndex} className="flex items-start">
                                <span className="bg-[#0066CC] text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                                  {stepIndex + 1}
                                </span>
                                <span className="text-gray-700">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {service.estimatedPrice > 0 && (
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600">Starting from</p>
                              <p className="text-2xl font-bold text-gray-900">${service.estimatedPrice}</p>
                              <p className="text-xs text-gray-500 mt-1">💳 Financing Available</p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-3">
                        {service.estimatedPrice > 0 ? (
                          <>
                            <Link 
                              to="/quote" 
                              className="bg-[#0066CC] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center cursor-pointer whitespace-nowrap"
                              onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                            >
                              Get Custom Quote
                              <i className="ri-arrow-right-line ml-2"></i>
                            </Link>
                          </>
                        ) : (
                          <>
                            <a 
                              href="tel:(626) 608-6470" 
                              className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors inline-flex items-center cursor-pointer whitespace-nowrap"
                            >
                              <i className="ri-phone-line mr-2"></i>
                              Call for Emergency Service
                            </a>
                            <Link 
                              to="/quote" 
                              className="bg-[#0066CC] text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center cursor-pointer whitespace-nowrap"
                            >
                              Build Quote
                              <i className="ri-arrow-right-line ml-2"></i>
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose <strong>Supreme Steam</strong>?
              </h2>
              <p className="text-xl text-gray-600">
                Family-owned and operated with over 20 years of experience serving Azusa, Los Angeles County, and San Bernardino County.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#0066CC] rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-shield-check-line text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Licensed & Insured</h3>
                <p className="text-gray-600">
                  Fully licensed, bonded, and insured for your peace of mind and protection.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#0066CC] rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-leaf-line text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Eco-Friendly Products</h3>
                <p className="text-gray-600">
                  Safe, non-toxic cleaning solutions that are gentle on your family and pets.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-[#0066CC] rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-star-line text-white text-2xl"></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">100% Satisfaction</h3>
                <p className="text-gray-600">
                  We stand behind our work with a complete satisfaction guarantee.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-[#0066CC] to-blue-700 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Experience the <strong>Supreme Steam</strong> Difference?
              </h2>
              <p className="text-xl mb-8 text-blue-50">
                Get your custom quote with no-obligation today. We serve Los Angeles County and San Bernardino County.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/quote" 
                  className="bg-amber-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-600 transition-colors inline-block whitespace-nowrap cursor-pointer"
                >
                  Build Your Quote
                </Link>
                <a 
                  href="tel:(626) 608-6470" 
                  className="bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors inline-flex items-center whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-phone-line mr-2"></i>
                  (626) 608-6470
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