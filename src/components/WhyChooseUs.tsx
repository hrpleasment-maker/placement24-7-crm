import React from 'react';
import { ShieldCheck, Zap, UserCheck, Clock, Layers, Award } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: '24-Hour Fast Sanctions',
      desc: 'Instant digital eligibility checks and rapid document processing ensure your loans or account openings are completed in record time.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
      title: '100% Data Confidentiality',
      desc: 'ISO 27001 certified data handling protocols. Your personal KYC documents, phone numbers, and financial details remain 100% secure.',
    },
    {
      icon: <Layers className="w-6 h-6 text-amber-400" />,
      title: '25+ Bank & NBFC Partners',
      desc: 'Compare multiple lender rates simultaneously to get the lowest interest rate, maximum loan tenure, and highest card approval chances.',
    },
    {
      icon: <UserCheck className="w-6 h-6 text-amber-400" />,
      title: 'Dedicated Telecaller Relationship Manager',
      desc: 'Get assigned a personal telecaller advisor who handles your application end-to-end, answers questions, and coordinates bank verification.',
    },
    {
      icon: <Clock className="w-6 h-6 text-amber-400" />,
      title: 'Doorstep Service Assistance',
      desc: 'Free physical document pickup and doorstep KYC assistance available across major districts and states in India.',
    },
    {
      icon: <Award className="w-6 h-6 text-amber-400" />,
      title: 'Zero Hidden Charges',
      desc: 'Complete transparency. We guide you on official bank processing fees without any secret markups or unverified service costs.',
    },
  ];

  return (
    <section id="why-us" className="py-16 bg-slate-950 text-white border-b border-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <Award className="w-4 h-4 text-amber-400" />
            The Placement24/7 Advantage
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-white">
            Why Millions Trust Placement24/7
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            We simplify complex financial approvals and recruitment processes with technology, speed, and dedicated personal telecaller support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800/90 hover:border-amber-500/40 p-6 rounded-2xl transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mb-4">
                {pillar.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-serif">{pillar.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
