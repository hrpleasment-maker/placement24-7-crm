import React from 'react';
import { ShieldCheck, Award, Users2, Building2, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-slate-950 text-slate-100 border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            About Placement24/7
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-white">
            Your Trusted Financial Advisory & Recruitment Partner
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Placement24/7 is a premier ISO-certified financial advisory and manpower recruitment organization. We bridge the gap between financial institutions and individuals by providing frictionless access to bank accounts, low-interest credit, investments, and employment opportunities across India.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-6 rounded-2xl transition-all">
            <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/30 rounded-xl flex items-center justify-center text-amber-400 mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-serif">Comprehensive Financial Hub</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              From zero balance savings accounts to ₹10 Crore loans against property, we partner with top nationalized banks, private sector leaders, and RBI-registered NBFCs.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-6 rounded-2xl transition-all">
            <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/30 rounded-xl flex items-center justify-center text-amber-400 mb-4">
              <Users2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-serif">Verified Recruitment Network</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              We specialize in telecaller, customer support, and sales recruitment. We match ambitious candidates with verified corporate telecalling job vacancies offering high fixed salaries.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 hover:border-amber-500/40 p-6 rounded-2xl transition-all">
            <div className="w-12 h-12 bg-amber-400/10 border border-amber-400/30 rounded-xl flex items-center justify-center text-amber-400 mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2 font-serif">Transparent & Secure Process</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              No hidden fees, 100% data privacy protection, and dedicated personal telecaller relationship managers who guide you step-by-step from inquiry to sanction.
            </p>
          </div>
        </div>

        {/* Bank Partners Grid */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 text-center">
          <p className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-4">
            Our Key Banking & Financial Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300 font-medium">
            {[
              'HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank',
              'Kotak Mahindra', 'IDFC FIRST Bank', 'Bajaj Finserv', 'IndusInd Bank',
              'Yes Bank', 'Tata Capital', 'PNS Finance', 'Hero Fincorp'
            ].map((bank, i) => (
              <span
                key={i}
                className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700/80 flex items-center gap-1.5 text-slate-200"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                {bank}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
