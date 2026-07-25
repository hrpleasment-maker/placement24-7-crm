import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Building2, Send } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-16 bg-slate-950 text-white border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            24/7 Customer & Telecaller Support
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-white">
            Get In Touch With Placement24/7
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Have questions regarding bank loan sanction, credit card eligibility, or telecaller job opportunities? Reach our team directly.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-12">
          {/* Phone & WhatsApp */}
          <div className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-6 rounded-2xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-serif mb-1">Phone & WhatsApp Helpline</h3>
              <p className="text-xs text-slate-400 mb-3">Direct line to senior banking advisors & recruitment officers</p>
              <a
                href="tel:+919876543210"
                className="text-amber-400 font-bold text-base hover:underline block"
              >
                +91 98765 43210
              </a>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-semibold mt-2 hover:underline"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Chat with Advisor on WhatsApp
              </a>
            </div>
          </div>

          {/* Email Support */}
          <div className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-6 rounded-2xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-serif mb-1">Email Support</h3>
              <p className="text-xs text-slate-400 mb-3">For document submission, corporate partnerships & candidate resumes</p>
              <a
                href="mailto:support@placement247.com"
                className="text-amber-400 font-bold text-sm hover:underline block"
              >
                support@placement247.com
              </a>
              <a
                href="mailto:hrpleasment@gmail.com"
                className="text-slate-300 text-xs hover:underline block mt-1"
              >
                hrpleasment@gmail.com
              </a>
            </div>
          </div>

          {/* Head Office Address */}
          <div className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-6 rounded-2xl space-y-4">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-serif mb-1">Corporate Head Office</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Plot 45, Finance Towers, Sector 18, Cyber City, Gurugram, Haryana - 122002
              </p>
              <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Working Hours: Mon - Sat (9:00 AM - 7:00 PM)
              </div>
            </div>
          </div>
        </div>

        {/* Google Map Section */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white font-serif">Placement24/7 Corporate Location</h3>
            </div>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              Cyber City, Sector 18, Gurugram
            </span>
          </div>
          <div className="w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-slate-800 relative bg-slate-950">
            <iframe
              title="Placement24/7 Head Office Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.03478952345!2d77.08540031507853!3d28.48900098247402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1912f20d5b79%3A0x62957f86db5f55!2sDLF%20Cyber%20City%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale contrast-125 opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};
