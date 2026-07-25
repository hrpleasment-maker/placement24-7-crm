import React from 'react';
import { Shield, Zap, Award, CheckCircle2, ArrowRight, MessageSquare, Clock, Users, Building } from 'lucide-react';

interface HeroBannerProps {
  onApplyNow: () => void;
  onExploreServices: () => void;
  onSelectProduct: (productName: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onApplyNow,
  onExploreServices,
  onSelectProduct,
}) => {
  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden py-12 lg:py-20 border-b border-amber-500/20">
      {/* Background Decorative Gold Radial Blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Hero Text & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wide">
              <Award className="w-4 h-4 text-amber-400" />
              <span>India's Leading Financial & Placement Advisory Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-serif">
              Instant Banking, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500">Lowest Interest Loans</span> & Verified Telecaller Jobs
            </h1>

            {/* Subheadline */}
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Get hassle-free Savings & Current Accounts, Credit Cards, Personal/Business Loans, Insurance, and Telecaller Career Opportunities with 100% digital processing in 24 hours.
            </p>

            {/* Feature Bullets */}
            <div className="grid sm:grid-cols-3 gap-3 pt-2 text-xs font-medium text-slate-200 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center justify-center lg:justify-start gap-2 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>25+ Bank Partners</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>Zero Hidden Fees</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 bg-slate-800/80 p-2.5 rounded-lg border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>100% Paperless</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onApplyNow}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
              >
                <span>Instant Application</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="https://wa.me/919876543210?text=Hello%20Placement24/7,%20I%20want%20information%20regarding%20Banking%20and%20Loan%20Services."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm rounded-xl border border-emerald-500/50 flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageSquare className="w-4 h-4 text-emerald-200" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Floating Card / Quick Selector */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/90 border border-amber-500/30 rounded-2xl p-6 shadow-2xl backdrop-blur-xl relative">
              <div className="absolute -top-3 right-6 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-md">
                Fast Sanction
              </div>

              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2 font-serif">
                <Zap className="w-5 h-5 text-amber-400" />
                Quick Service Assistant
              </h2>
              <p className="text-xs text-slate-300 mb-5">
                Select your service requirement below to instantly launch application pre-fill:
              </p>

              <div className="space-y-2.5">
                {[
                  { name: 'Personal Loan', desc: 'Up to ₹25 Lakhs @ 10.49% p.a.', badge: 'Popular' },
                  { name: 'Credit Card', desc: 'Lifetime Free Cards & Cashback', badge: 'Pre-Approved' },
                  { name: 'Business Loan', desc: 'Unsecured working capital up to ₹1 Cr', badge: 'MSME' },
                  { name: 'Savings Account', desc: 'Zero balance & instant digital opening', badge: '0 Min Bal' },
                  { name: 'Telecaller Jobs', desc: 'WFH / Office with ₹15K-₹35K Salary', badge: 'Hiring' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectProduct(item.name);
                      onApplyNow();
                    }}
                    className="w-full text-left p-3 rounded-xl bg-slate-900/80 hover:bg-slate-700/80 border border-slate-700/80 hover:border-amber-400/50 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                        {item.name}
                      </div>
                      <div className="text-[11px] text-slate-400">{item.desc}</div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30 whitespace-nowrap">
                      {item.badge}
                    </span>
                  </button>
                ))}
              </div>

              <button
                onClick={onExploreServices}
                className="w-full mt-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-950 rounded-xl border border-slate-700 text-center block transition-colors"
              >
                View All 13 Available Services & Jobs →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Metrics Ribbon */}
        <div className="mt-12 pt-8 border-t border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800">
            <div className="text-2xl lg:text-3xl font-black text-amber-400 font-serif">50,000+</div>
            <div className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              Satisfied Clients
            </div>
          </div>
          <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800">
            <div className="text-2xl lg:text-3xl font-black text-amber-400 font-serif">₹500 Cr+</div>
            <div className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              Loans Disbursed
            </div>
          </div>
          <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800">
            <div className="text-2xl lg:text-3xl font-black text-amber-400 font-serif">25+</div>
            <div className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1">
              <Building className="w-3.5 h-3.5 text-amber-400" />
              Partner Banks & NBFCs
            </div>
          </div>
          <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-800">
            <div className="text-2xl lg:text-3xl font-black text-amber-400 font-serif">24 Hours</div>
            <div className="text-xs text-slate-400 mt-1 flex items-center justify-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              Average Sanction Time
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
