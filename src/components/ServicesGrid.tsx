import React, { useState } from 'react';
import { PRODUCTS_DATA } from '../data/products';
import { Product } from '../types';
import {
  Building2, Briefcase, CreditCard, Banknote, Building, Home, Landmark,
  TrendingUp, ShieldCheck, Coins, Users, CheckCircle2, Headphones,
  ArrowRight, Search, Eye, Sparkles
} from 'lucide-react';

interface ServicesGridProps {
  onSelectProductDetails: (product: Product) => void;
  onApplyProduct: (productName: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  onSelectProductDetails,
  onApplyProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Banking', 'Loans', 'Investment', 'Services & Jobs'];

  // Map icon strings to Lucide icon components
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-5 h-5 text-amber-400" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-amber-400" />;
      case 'CreditCard': return <CreditCard className="w-5 h-5 text-amber-400" />;
      case 'Banknote': return <Banknote className="w-5 h-5 text-amber-400" />;
      case 'Building': return <Building className="w-5 h-5 text-amber-400" />;
      case 'Home': return <Home className="w-5 h-5 text-amber-400" />;
      case 'Landmark': return <Landmark className="w-5 h-5 text-amber-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-amber-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-amber-400" />;
      case 'Coins': return <Coins className="w-5 h-5 text-amber-400" />;
      case 'Users': return <Users className="w-5 h-5 text-amber-400" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-amber-400" />;
      case 'Headphones': return <Headphones className="w-5 h-5 text-amber-400" />;
      default: return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  const filteredProducts = PRODUCTS_DATA.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services" className="py-16 bg-slate-900 text-slate-100 border-b border-slate-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Full Financial & Employment Portfolio
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-white">
            Our 13 Specialized Services & Solutions
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm">
            Explore our end-to-end banking accounts, quick loan approvals, wealth investments, corporate background verification, and telecaller career opportunities.
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search service e.g., Loan, Job..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-slate-950 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-5 flex flex-col justify-between group transition-all hover:shadow-xl hover:shadow-amber-500/5 relative overflow-hidden"
            >
              {/* Product Badge */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 border border-amber-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getIcon(product.iconName)}
                </div>

                {product.badge && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/30">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 font-serif transition-colors mb-1">
                  {product.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Benefits Highlights */}
              <div className="space-y-1.5 mb-5 pt-3 border-t border-slate-800/80">
                {product.benefits.slice(0, 2).map((benefit, i) => (
                  <div key={i} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-amber-400"></span>
                    <span className="truncate">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => onSelectProductDetails(product)}
                  className="py-2 px-3 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-xl flex items-center justify-center gap-1 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  Details
                </button>

                <button
                  onClick={() => onApplyProduct(product.name)}
                  className="py-2 px-3 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl flex items-center justify-center gap-1 transition-all shadow-md shadow-amber-500/10"
                >
                  Apply
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 bg-slate-950/40 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">No services matching "{searchQuery}" found.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-3 text-xs text-amber-400 underline font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
