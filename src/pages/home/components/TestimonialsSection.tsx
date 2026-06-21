
export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      location: 'Los Angeles, CA',
      rating: 5,
      text: 'Amazing service! They completely transformed our carpets after a water leak. The technicians were professional, punctual, and the results exceeded our expectations. Highly recommend Supreme Steam!',
      service: 'Water Damage Restoration'
    },
    {
      name: 'Michael Chen',
      location: 'San Bernardino, CA',
      rating: 5,
      text: 'We use Supreme Steam for our office carpet cleaning quarterly. They always do an excellent job and work around our schedule. Professional team and great customer service.',
      service: 'Commercial Carpet Cleaning'
    },
    {
      name: 'Jennifer Martinez',
      location: 'Pasadena, CA',
      rating: 5,
      text: 'The upholstery cleaning service was fantastic! Our old sofa looks brand new again. The cleaning technician explained everything and was very careful with our furniture.',
      service: 'Upholstery Cleaning'
    },
    {
      name: 'David Thompson',
      location: 'Riverside, CA',
      rating: 5,
      text: 'Quick response for emergency carpet cleaning after our basement flooded. They arrived within 2 hours and worked late into the evening to get everything cleaned up. Exceptional service!',
      service: 'Emergency Cleaning'
    },
    {
      name: 'Lisa Wang',
      location: 'Fontana, CA',
      rating: 5,
      text: 'Been using Supreme Steam for 3 years now. Consistent quality, fair pricing, and they always leave our home spotless. The tile and grout cleaning service is particularly impressive.',
      service: 'Tile & Grout Cleaning'
    },
    {
      name: 'Robert Davis',
      location: 'Rancho Cucamonga, CA',
      rating: 5,
      text: 'Professional air duct cleaning service that really improved our indoor air quality. The technician was knowledgeable and showed us before/after photos. Great experience overall.',
      service: 'Air Duct Cleaning'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our <strong>Customers Say</strong>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. See why thousands of California residents and businesses trust Supreme Steam for their cleaning needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <i key={i} className="ri-star-fill"></i>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">({testimonial.rating}.0)</span>
              </div>
              
              <p className="text-gray-700 mb-4 italic">
                "{testimonial.text}"
              </p>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs bg-[#0066CC]/10 text-[#0066CC] px-2 py-1 rounded-full">
                      {testimonial.service}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-8 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0066CC]">5.0</div>
                <div className="flex text-yellow-400 justify-center mb-1">
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                </div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0066CC]">2,500+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#0066CC]">20</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
            <p className="text-gray-700">
              <strong>Trusted by California families and businesses since 2019.</strong> Join our satisfied customers and experience the Supreme Steam difference today!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
