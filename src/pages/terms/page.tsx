import { useEffect } from 'react';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';

const TermsPage = () => {
  useEffect(() => {
    document.title = 'Terms & Conditions - Supreme Steam Carpet & Upholstery Cleaning';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Read Supreme Steam\'s terms and conditions for carpet cleaning, upholstery cleaning, and professional cleaning services in Los Angeles County.');
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Terms & Conditions",
      "description": "Supreme Steam terms and conditions for professional cleaning services",
      "url": `${import.meta.env.VITE_SITE_URL || 'https://example.com'}/terms`
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
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#0066CC] to-[#0052A3] text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Terms &amp; Conditions
              </h1>
              <p className="text-xl text-white/90">
                Please read these terms carefully before scheduling our services
              </p>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              
              {/* Introduction */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 mb-8 rounded-r-lg">
                <p className="text-gray-800 leading-relaxed">
                  <strong>By scheduling or authorizing services with Supreme Steam, the customer agrees to the following terms and conditions:</strong>
                </p>
              </div>

              {/* Payment Section */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <i className="ri-bank-card-line text-[#0066CC] mr-3 w-8 h-8 flex items-center justify-center"></i>
                  Payment
                </h2>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <p className="text-gray-700 leading-relaxed">
                    • Payment is due upon completion of services, unless otherwise agreed in writing.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    • Accepted forms of payment include cash, check, credit/debit card, and approved digital payments.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    • Customers who choose to pay by credit or debit card agree to be responsible for all applicable card processing fees.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    • Processing fees will be added to the total invoice and disclosed at the time of payment.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    • Alternative payment methods that do not incur processing fees may be available upon request.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    • Declined or unpaid payments may result in additional fees or refusal of future service.
                  </p>
                </div>
              </div>

              {/* Pre-Existing Conditions */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <i className="ri-alert-line text-[#0066CC] mr-3 w-8 h-8 flex items-center justify-center"></i>
                  Pre-Existing Conditions &amp; Damage
                </h2>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <p className="text-gray-700 leading-relaxed">
                    • Supreme Steam is not responsible for pre-existing damage including, but not limited to, carpet wear, discoloration, permanent staining, upholstery wear, fading, tile cracks, loose grout, or hardwood floor defects.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    • Some stains, odors, or damage may be permanent and results are not guaranteed.
                  </p>
                </div>
              </div>

              {/* Delicate Materials */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <i className="ri-shirt-line text-[#0066CC] mr-3 w-8 h-8 flex items-center justify-center"></i>
                  Delicate &amp; Specialty Materials
                </h2>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <p className="text-gray-700 leading-relaxed">
                    • Customer is responsible for disclosing delicate, specialty, or natural fibers including silk, wool, viscose, jute, or antique materials.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    • Supreme Steam is not liable for damage resulting from undisclosed materials, manufacturing defects, or fiber instability.
                  </p>
                </div>
              </div>

              {/* Slip & Fall Warning */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <i className="ri-error-warning-line text-amber-500 mr-3 w-8 h-8 flex items-center justify-center"></i>
                  Slip &amp; Fall Liability
                </h2>
                <div className="bg-amber-50 border-2 border-amber-500 rounded-lg p-6 space-y-3">
                  <p className="text-gray-900 font-bold leading-relaxed">
                    ⚠️ WARNING: Floors and surfaces may be wet, damp, or slippery during and after cleaning.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    • Supreme Steam, its owners, employees, and contractors are not responsible for slips, falls, or injuries occurring during or after service.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    • Customer agrees to keep all occupants, pets, and visitors off cleaned areas until fully dry.
                  </p>
                </div>
              </div>

              {/* Furniture & Property */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <i className="ri-home-4-line text-[#0066CC] mr-3 w-8 h-8 flex items-center justify-center"></i>
                  Furniture &amp; Personal Property
                </h2>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <p className="text-gray-700 leading-relaxed">
                    • Customer is responsible for removing fragile or valuable items prior to service.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    • Furniture moved at the customer's request is done at the customer's risk.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    • Supreme Steam is not responsible for damage to items with pre-existing wear or weakness.
                  </p>
                </div>
              </div>

              {/* Access & Utilities */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <i className="ri-door-open-line text-[#0066CC] mr-3 w-8 h-8 flex items-center justify-center"></i>
                  Access &amp; Utilities
                </h2>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <p className="text-gray-700 leading-relaxed">
                    • Customer agrees to provide reasonable access to the service area, electricity, and water.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    • Delays caused by lack of access may result in additional charges.
                  </p>
                </div>
              </div>

              {/* Cancellations */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <i className="ri-calendar-close-line text-[#0066CC] mr-3 w-8 h-8 flex items-center justify-center"></i>
                  Cancellations &amp; Rescheduling
                </h2>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <p className="text-gray-700 leading-relaxed">
                    • Same-day cancellations or no-shows may be subject to a fee.
                  </p>
                </div>
              </div>

              {/* Satisfaction */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <i className="ri-star-line text-[#0066CC] mr-3 w-8 h-8 flex items-center justify-center"></i>
                  Satisfaction &amp; Re-Service
                </h2>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <p className="text-gray-700 leading-relaxed">
                    • Any concerns must be reported within 24 hours of service completion.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    • Re-service decisions are at the discretion of Supreme Steam.
                  </p>
                </div>
              </div>

              {/* Limitation of Liability */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <i className="ri-shield-line text-[#0066CC] mr-3 w-8 h-8 flex items-center justify-center"></i>
                  Limitation of Liability
                </h2>
                <div className="bg-gray-50 rounded-lg p-6 space-y-3">
                  <p className="text-gray-700 leading-relaxed">
                    • Supreme Steam's liability, if any, is limited to the amount paid for the specific service performed.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    • Supreme Steam is not liable for indirect, incidental, or consequential damages.
                  </p>
                </div>
              </div>

              {/* Contact Section */}
              <div className="bg-[#0066CC] text-white rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Questions About Our Terms?</h3>
                <p className="mb-6 text-white/90">
                  If you have any questions or concerns about these terms and conditions, please contact us before scheduling your service.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a 
                    href="tel:(626) 608-6470" 
                    className="bg-white text-[#0066CC] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-phone-fill mr-2"></i>
                    Call (626) 608-6470
                  </a>
                  <a 
                    href="/contact" 
                    className="bg-amber-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-mail-line mr-2"></i>
                    Contact Us
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TermsPage;
