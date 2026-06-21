import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function ServicesSection() {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const services = [
    {
      icon: 'ri-home-4-fill',
      title: 'Carpet Cleaning',
      description: 'Deep steam cleaning that removes dirt, stains, and allergens from your carpets.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20carpet%20steam%20cleaning%20service%20in%20action%20showing%20industrial%20cleaning%20equipment%20removing%20deep%20stains%20from%20light%20colored%20carpet%20in%20modern%20home%20interior%20with%20natural%20lighting%20clean%20white%20background&width=600&height=400&seq=carpet-service-page&orientation=landscape',
      startingPrice: 180,
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
      startingPrice: 150,
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
      startingPrice: 200,
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
      startingPrice: 250,
      process: [
        'Floor assessment and damage inspection',
        'Gentle cleaning with wood-safe products',
        'Buffing and polishing',
        'Scratch repair (if needed)',
        'Protective finish application'
      ]
    },
    {
      icon: 'ri-wind-fill',
      title: 'Air Duct and Dryer Vent Cleaning',
      description: 'Improve indoor air quality and safety with comprehensive duct and dryer vent cleaning for residential and commercial properties.',
      image: 'https://static.readdy.ai/image/7064b84365a85e7f169350013ebfe335/93b013028d428315eba6b83050ae23ab.jpeg',
      startingPrice: 500,
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
      startingPrice: 300,
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
      startingPrice: 0,
      process: [
        'Call Anytime - We answer 24/7 and dispatch immediately',
        'Stop the Source - Water is shut off and damage is assessed',
        'Extract Water - Standing water is removed fast',
        'Dry & Dehumidify - Professional equipment dries affected areas',
        'Monitor & Advise - We track moisture and guide next steps'
      ]
    }
  ];

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Video */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 tracking-wide">AZUSA RIBBON CUTTING CEREMONY</h2>
          <div className="relative w-full rounded-xl overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/-u13w1IbT38"
              title="Supreme Steam Professional Cleaning Services"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Professional <strong>Cleaning Services</strong>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive cleaning solutions for residential and commercial properties with state-of-the-art equipment and eco-friendly products.
          </p>
          <a
            href="https://wisetack.us/#/2qxl7k9/prequalify"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block bg-amber-500 text-white rounded-lg px-6 py-3 hover:bg-amber-600 transition-colors cursor-pointer shadow-lg"
          >
            <p className="text-sm font-semibold">💳 Financing Available</p>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover object-top"
                />
                {service.startingPrice > 0 && (
                  <div className="absolute top-3 right-3 bg-white rounded-lg px-3 py-1 shadow-lg">
                    <p className="text-xs text-gray-600">Starting at</p>
                    <p className="text-lg font-bold text-gray-900">${service.startingPrice}</p>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>

                <button
                  onClick={() => setExpandedService(expandedService === index ? null : index)}
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors inline-flex items-center cursor-pointer mb-4 whitespace-nowrap"
                >
                  {expandedService === index ? 'Hide Process' : 'View Our Process'}
                  <i className={`ri-arrow-${expandedService === index ? 'up' : 'down'}-line ml-2`}></i>
                </button>

                {expandedService === index && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <h4 className="font-bold text-gray-900 mb-3 text-sm">Our Cleaning Process:</h4>
                    <ol className="space-y-2">
                      {service.process.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start text-sm text-gray-700">
                          <span className="bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5 flex-shrink-0">
                            {stepIndex + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                <Link 
                  to={service.startingPrice > 0 ? "/services" : "/quote"}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors inline-flex items-center cursor-pointer whitespace-nowrap w-full justify-center"
                >
                  {service.startingPrice > 0 ? 'View Details & Pay' : 'Build Quote'}
                  <i className="ri-arrow-right-line ml-2"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}