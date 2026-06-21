import { useState, useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import { serviceAreaPrefixes, excludedServiceAreaZips } from '../quote/data';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    service: '',
    message: '',
    zipCode: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [zipError, setZipError] = useState('');

  const contactInfo = [
    {
      icon: 'ri-phone-fill',
      title: 'Phone',
      details: '(626) 608-6470',
      link: 'tel:(626) 608-6470',
      description: 'Available 24/7 for emergencies'
    },
    {
      icon: 'ri-mail-fill',
      title: 'Email',
      details: 'supremesteam84@gmail.com',
      link: 'mailto:supremesteam84@gmail.com',
      description: 'We respond within 2 hours'
    },
    {
      icon: 'ri-map-pin-fill',
      title: 'Location',
      details: 'Azusa, CA 91702',
      link: 'https://maps.google.com/?q=Azusa,CA',
      description: 'Serving LA, Orange, Riverside, SB & Ventura counties'
    },
    {
      icon: 'ri-time-fill',
      title: 'Business Hours',
      details: 'Mon-Sat: 7AM-8PM',
      link: null,
      description: 'Sunday: 8AM-6PM'
    }
  ];

  const serviceAreas = [
    'Azusa', 'Covina', 'Glendora', 'West Covina', 'Baldwin Park',
    'Irwindale', 'Duarte', 'Monrovia', 'Arcadia', 'San Dimas'
  ];

  const validateZipCode = (zip: string) => {
    const cleanZip = zip.replace(/\D/g, '').slice(0, 5);
    
    if (cleanZip.length !== 5) {
      setZipError('Please enter a valid 5-digit ZIP code');
      return false;
    }
    
    const prefix = cleanZip.slice(0, 3);
    if (!serviceAreaPrefixes.includes(prefix) || excludedServiceAreaZips.includes(cleanZip)) {
      setZipError('Sorry, we only serve locations within a 60-mile radius of Azusa, CA.');
      return false;
    }
    
    setZipError('');
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'zipCode') {
      validateZipCode(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate ZIP code before submission
    if (!validateZipCode(formData.zipCode)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await fetch('https://readdy.ai/api/form/d43cgommj2r470qadbt0', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          service: '',
          message: '',
          zipCode: ''
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    document.title = 'Contact Us - Get in Touch for Cleaning Services';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Contact our professional cleaning team. Call us, email us, or fill out our contact form to schedule your cleaning service or ask questions.');
    }

    // Add Schema.org JSON-LD
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Us",
      "description": "Get in touch with our professional cleaning team",
      "url": `${import.meta.env.VITE_SITE_URL || 'https://example.com'}/contact`
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
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-[#0066CC] text-white py-20">
          <div 
            className="absolute inset-0 bg-cover bg-no-repeat opacity-30 bg-center md:bg-[center_-2in]"
            style={{
              backgroundImage: `url('https://static.readdy.ai/image/7064b84365a85e7f169350013ebfe335/ed6c7ec0c5aaa834c57527b060091d6d.jpeg')`
            }}
          ></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="flex justify-center mb-6">
                <img 
                  src="https://static.readdy.ai/image/7064b84365a85e7f169350013ebfe335/9aa34198c9a58b74ae02beb52e6d1dfd.png" 
                  alt="Supreme Steam Logo" 
                  className="h-24 md:h-32 w-auto brightness-0 invert"
                />
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                We're here to answer your questions and provide exceptional service
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              
              {/* Contact CTA */}
              <div className="bg-black rounded-2xl shadow-xl p-8 text-white text-center mb-12">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-calendar-check-line text-5xl"></i>
                </div>
                <h2 className="text-3xl font-bold mb-3">Ready to Book Your Appointment?</h2>
                <p className="text-xl text-white/90">
                  Reach out today and we'll get back to you within 24 hours
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-[#0066CC]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className={`${info.icon} text-[#0066CC] text-3xl`}></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
                    {info.link ? (
                      <a 
                        href={info.link}
                        className="text-[#0066CC] font-semibold hover:underline block mb-1"
                      >
                        {info.details}
                      </a>
                    ) : (
                      <p className="text-gray-900 font-semibold mb-1">{info.details}</p>
                    )}
                    <p className="text-gray-600 text-sm">{info.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Map Section */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12">
                  {/* Contact Form */}
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-6">
                      Send Us a <strong>Message</strong>
                    </h2>

                    {/* Service Area Notice */}
                    <div className="bg-amber-500/20 border-2 border-amber-500 rounded-lg p-4 mb-6">
                      <div className="flex items-start">
                        <i className="ri-map-pin-fill text-amber-500 text-xl mr-3 mt-1"></i>
                        <div>
                          <p className="text-amber-500 font-semibold mb-1">Service Area Notice</p>
                          <p className="text-white text-sm">
                            We serve areas within a 60-mile radius of Azusa, CA. Please enter your ZIP code to verify we service your area.
                          </p>
                        </div>
                      </div>
                    </div>

                    {submitted ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                        <i className="ri-checkbox-circle-fill text-5xl text-green-500 mb-4"></i>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Message Sent Successfully!
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Thank you for contacting us. We'll get back to you within 24 hours.
                        </p>
                        <button
                          onClick={() => setSubmitted(false)}
                          className="bg-[#0066CC] text-white px-6 py-2 rounded-lg hover:bg-[#0052A3] transition-colors whitespace-nowrap"
                        >
                          Send Another Message
                        </button>
                      </div>
                    ) : (
                      <form
                        id="contact-form"
                        data-readdy-form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                      >
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                              Full Name *
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                              placeholder="John Doe"
                            />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              required
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                              placeholder="(626) 608-6470"
                            />
                          </div>
                          <div>
                            <label htmlFor="zipCode" className="block text-sm font-medium text-white mb-2">
                              ZIP Code *
                            </label>
                            <input
                              type="text"
                              id="zipCode"
                              name="zipCode"
                              value={formData.zipCode}
                              onChange={handleInputChange}
                              required
                              maxLength={5}
                              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                                zipError ? 'border-red-500' : 'border-gray-300'
                              }`}
                              placeholder="91702"
                            />
                            {zipError && (
                              <p className="text-red-400 text-xs mt-1 flex items-start">
                                <i className="ri-error-warning-fill mr-1 mt-0.5"></i>
                                {zipError}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label htmlFor="service" className="block text-sm font-medium text-white mb-2">
                            Service Needed *
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          >
                            <option value="">Select a service</option>
                            <option value="carpet">Carpet Cleaning</option>
                            <option value="upholstery">Upholstery Cleaning</option>
                            <option value="tile">Tile & Grout Cleaning</option>
                            <option value="hardwood">Hardwood Floor Cleaning</option>
                            <option value="air-duct">Air Duct Cleaning</option>
                            <option value="water-damage">Water Damage Restoration</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                            Message *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                            maxLength={500}
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none"
                            placeholder="Tell us about your cleaning needs..."
                          />
                          <p className="text-white/70 text-xs mt-1">
                            {formData.message.length}/500 characters
                          </p>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting || !!zipError}
                          className="w-full bg-[#0066CC] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 whitespace-nowrap cursor-pointer"
                        >
                          {isSubmitting ? (
                            <>
                              <i className="ri-loader-4-line animate-spin mr-2"></i>
                              Sending...
                            </>
                          ) : (
                            <>
                              <i className="ri-send-plane-fill mr-2"></i>
                              Send Message
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>

                  {/* Logo Section */}
                  <div className="flex items-center justify-center">
                    <div className="w-full max-w-md">
                      <img 
                        src="https://static.readdy.ai/image/7064b84365a85e7f169350013ebfe335/fcbd48b4c6f59d40350e42a24ae7c53f.png"
                        alt="Supreme Steam Logo"
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Frequently Asked <strong>Questions</strong>
                </h2>
                <p className="text-xl text-gray-600">
                  Quick answers to common questions
                </p>
              </div>

              <div className="space-y-4">
                <details className="bg-white rounded-lg shadow-md overflow-hidden">
                  <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 flex items-center justify-between">
                    <span>What areas do you serve?</span>
                    <i className="ri-arrow-down-s-line text-xl"></i>
                  </summary>
                  <div className="px-6 py-4 bg-gray-50 text-gray-700">
                    We serve Los Angeles, Orange, Riverside, San Bernardino, and Ventura counties within a 60-mile radius of Azusa, CA.
                  </div>
                </details>

                <details className="bg-white rounded-lg shadow-md overflow-hidden">
                  <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 flex items-center justify-between">
                    <span>How quickly can you respond to emergencies?</span>
                    <i className="ri-arrow-down-s-line text-xl"></i>
                  </summary>
                  <div className="px-6 py-4 bg-gray-50 text-gray-700">
                    We offer 24/7 emergency services and can typically arrive within 2-4 hours for urgent situations like water damage or flooding.
                  </div>
                </details>

                <details className="bg-white rounded-lg shadow-md overflow-hidden">
                  <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 flex items-center justify-between">
                    <span>Do you offer free estimates?</span>
                    <i className="ri-arrow-down-s-line text-xl"></i>
                  </summary>
                  <div className="px-6 py-4 bg-gray-50 text-gray-700">
                    Yes! We provide free, no-obligation estimates for all our services. You can request one online or by calling us directly.
                  </div>
                </details>

                <details className="bg-white rounded-lg shadow-md overflow-hidden">
                  <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 flex items-center justify-between">
                    <span>Are your cleaning products safe for pets and children?</span>
                    <i className="ri-arrow-down-s-line text-xl"></i>
                  </summary>
                  <div className="px-6 py-4 bg-gray-50 text-gray-700">
                    Absolutely! We use eco-friendly, non-toxic cleaning solutions that are safe for your entire family, including pets and children.
                  </div>
                </details>

                <details className="bg-white rounded-lg shadow-md overflow-hidden">
                  <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 flex items-center justify-between">
                    <span>What payment methods do you accept?</span>
                    <i className="ri-arrow-down-s-line text-xl"></i>
                  </summary>
                  <div className="px-6 py-4 bg-gray-50 text-gray-700">
                    We accept cash, all major credit cards, debit cards, and checks. Payment is due upon completion of service.
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
