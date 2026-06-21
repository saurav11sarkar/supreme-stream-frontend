export default function WhyChooseUsSection() {
  const features = [
    {
      icon: 'ri-shield-check-fill',
      title: 'Certified Technicians',
      description: 'Our team is professionally trained and certified in the latest cleaning techniques and safety protocols.'
    },
    {
      icon: 'ri-leaf-fill',
      title: 'Eco-Friendly Solutions',
      description: 'We use environmentally safe cleaning products that are safe for your family and pets.'
    },
    {
      icon: 'ri-time-fill',
      title: '24/7 Emergency Service',
      description: 'Available around the clock for emergency cleaning and water damage restoration.'
    },
    {
      icon: 'ri-money-dollar-circle-fill',
      title: 'Satisfaction Guarantee',
      description: 'We stand behind our work with a 100% satisfaction guarantee on all our services.'
    },
    {
      icon: 'ri-tools-fill',
      title: 'Advanced Equipment',
      description: 'State-of-the-art cleaning equipment ensures deep, thorough cleaning every time.'
    },
    {
      icon: 'ri-star-fill',
      title: '20 Years Experience',
      description: 'Years of experience serving California and surrounding areas with excellence.'
    }
  ];

  return (
    <section className="py-16 bg-[#0066CC]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why Choose <strong>Supreme Steam</strong>?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            We are California's trusted cleaning professionals, committed to delivering exceptional results and outstanding customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <i className={`${feature.icon} text-3xl text-white`}></i>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/80">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
