import React from 'react';
import { Product } from '../types';
import { X, CheckCircle, FileText, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onApply: (productName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onApply,
}) => {
  if (!product) return null;

  const handleWhatsAppForward = () => {
    const text = `Hello Placement24/7 Team,\n\nI am interested in your service: *${product.name}*.\nPlease share complete details and eligibility criteria with me.\n\nThank you!`;
    const url = `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-amber-500/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-white relative flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-start justify-between sticky top-0 bg-slate-900/95 z-10 backdrop-blur-md">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wide text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/20">
                {product.category}
              </span>
              {product.badge && (
                <span className="text-xs font-bold uppercase tracking-wide text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                  {product.badge}
                </span>
              )}
            </div>
            <h2 className="text-2xl font-bold font-serif text-white">{product.name}</h2>
            <p className="text-xs text-slate-300">{product.tagline}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-sm text-slate-300 overflow-y-auto">
          {/* Description */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Service Overview
            </h3>
            <p className="text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              {product.description}
            </p>
          </div>

          {/* Key Benefits */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              Key Features & Benefits
            </h3>
            <ul className="grid sm:grid-cols-1 gap-2">
              {product.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2.5 bg-slate-800/50 p-2.5 rounded-lg border border-slate-800">
                  <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-200 text-xs font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Eligibility */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Eligibility Criteria
            </h3>
            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-200">
              {product.eligibility}
            </div>
          </div>

          {/* Required Documents */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-amber-400" />
              Required Documents
            </h3>
            <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
              <ul className="space-y-1.5 text-xs text-slate-200">
                {product.requiredDocuments.map((doc, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row items-center justify-end gap-3 sticky bottom-0 rounded-b-2xl">
          <button
            onClick={handleWhatsAppForward}
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors border border-emerald-500/40"
          >
            <MessageSquare className="w-4 h-4 text-emerald-200" />
            Forward to WhatsApp
          </button>

          <button
            onClick={() => {
              onClose();
              onApply(product.name);
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            Apply for {product.name}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
