import React from 'react';
import { Building2, ShieldCheck, Phone, Mail, MessageSquare, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenLogin: (role: 'telecaller' | 'admin') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenLogin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 relative">
      {/* Main Footer Links */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950 font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-lg font-black font-serif text-white">
                Placement<span className="text-amber-400">24/7</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              India's trusted banking loan aggregator, insurance partner, and telecaller placement consultant. Fast digital approvals & 100% verified process.
            </p>
            <div className="text-[11px] text-amber-300 flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              ISO 27001 Certified & RBI Partner Network
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-serif mb-3">
              Banking & Loans
            </h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('services')} className="hover:text-amber-400">Savings & Current Accounts</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-amber-400">Pre-approved Credit Cards</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-amber-400">Instant Personal Loans</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-amber-400">MSME Business Loans</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-amber-400">Home Loans & LAP</button></li>
            </ul>
          </div>

          {/* Col 3: Career & Portal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-serif mb-3">
              Portal & Jobs
            </h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate('services')} className="hover:text-amber-400">Telecaller Work From Home Jobs</button></li>
              <li><button onClick={() => onOpenLogin('telecaller')} className="hover:text-amber-400 font-semibold text-amber-300">Telecaller Portal Login</button></li>
              <li><button onClick={() => onOpenLogin('admin')} className="hover:text-amber-400 font-semibold text-amber-300">Admin Dashboard Login</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-amber-400">Data Verification Services</button></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-serif mb-3">
              Contact & Support
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-amber-400" /> +91 98765 43210</li>
              <li className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-amber-400" /> support@placement247.com</li>
              <li className="text-slate-400 mt-2">Cyber City, Sector 18, Gurugram, Haryana</li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Placement24/7 Financial & Recruitment Services. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={scrollToTop} className="hover:text-amber-400 flex items-center gap-1">
              Back to Top <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Quick Trigger Button */}
      <a
        href="https://wa.me/919876543210?text=Hello%20Placement24/7,%20I%20need%20assistance%20with%20Banking%20and%20Loans."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-400 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 border-2 border-white/20 group"
        aria-label="Contact on WhatsApp"
      >
        <MessageSquare className="w-6 h-6 fill-current" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-xs font-bold px-0 group-hover:px-2">
          WhatsApp Us
        </span>
      </a>
    </footer>
  );
};
