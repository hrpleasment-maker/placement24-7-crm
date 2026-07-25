import React, { useState } from 'react';
import { Building2, Phone, ShieldCheck, UserCheck, Lock, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenLogin: (role: 'telecaller' | 'admin') => void;
  onApplyClick: () => void;
  activeRole: 'public' | 'telecaller' | 'admin';
  loggedInUser?: string;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onOpenLogin,
  onApplyClick,
  activeRole,
  loggedInUser,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-amber-500/20 text-white shadow-lg backdrop-blur-md">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-amber-300 text-xs py-1.5 px-4 font-medium flex justify-between items-center border-b border-amber-500/10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              RBI Partner Banks & ISO 27001 Certified
            </span>
            <span className="hidden md:inline text-slate-400">|</span>
            <span className="hidden md:inline text-slate-200">
              Instant Approval Banking, Loans & Telecaller Career Helpline
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-1 text-white hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span className="font-semibold">+91 98765 43210</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleNav('hero')}
          className="cursor-pointer flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-0.5 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Building2 className="w-5 h-5 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-white font-serif">
                Placement<span className="text-amber-400">24/7</span>
              </span>
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded tracking-wide">
                CRM
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wider uppercase font-sans">
              Banking & Career Solutions
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => handleNav('hero')}
            className="hover:text-amber-400 transition-colors py-1"
          >
            Home
          </button>
          <button
            onClick={() => handleNav('about')}
            className="hover:text-amber-400 transition-colors py-1"
          >
            About Us
          </button>
          <button
            onClick={() => handleNav('services')}
            className="hover:text-amber-400 transition-colors py-1"
          >
            Our Services
          </button>
          <button
            onClick={() => handleNav('why-us')}
            className="hover:text-amber-400 transition-colors py-1"
          >
            Why Choose Us
          </button>
          <button
            onClick={() => handleNav('contact')}
            className="hover:text-amber-400 transition-colors py-1"
          >
            Contact Us
          </button>
        </nav>

        {/* Action Buttons & Portal Switchers */}
        <div className="hidden lg:flex items-center gap-3">
          {activeRole === 'public' ? (
            <>
              <button
                onClick={() => onOpenLogin('telecaller')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex items-center gap-1.5 transition-all"
              >
                <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                Telecaller Login
              </button>
              <button
                onClick={() => onOpenLogin('admin')}
                className="px-3 py-1.5 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg flex items-center gap-1.5 transition-all"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                Admin Portal
              </button>
              <button
                onClick={onApplyClick}
                className="px-4 py-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-lg shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Apply Now
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-xs text-amber-300 font-semibold bg-slate-800 px-3 py-1.5 rounded-lg border border-amber-500/30 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Logged in as {loggedInUser} ({activeRole.toUpperCase()})
              </span>
              <button
                onClick={onLogout}
                className="px-3 py-1.5 text-xs font-semibold text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/50 rounded-lg transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-slate-300 hover:text-white p-2 rounded-lg bg-slate-800 border border-slate-700"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-t border-slate-800 px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-300">
            <button
              onClick={() => handleNav('hero')}
              className="text-left py-2 px-3 rounded hover:bg-slate-800 hover:text-amber-400"
            >
              Home
            </button>
            <button
              onClick={() => handleNav('about')}
              className="text-left py-2 px-3 rounded hover:bg-slate-800 hover:text-amber-400"
            >
              About Us
            </button>
            <button
              onClick={() => handleNav('services')}
              className="text-left py-2 px-3 rounded hover:bg-slate-800 hover:text-amber-400"
            >
              Our Services
            </button>
            <button
              onClick={() => handleNav('why-us')}
              className="text-left py-2 px-3 rounded hover:bg-slate-800 hover:text-amber-400"
            >
              Why Choose Us
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="text-left py-2 px-3 rounded hover:bg-slate-800 hover:text-amber-400"
            >
              Contact Us
            </button>
          </nav>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            {activeRole === 'public' ? (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin('telecaller');
                  }}
                  className="w-full py-2 text-xs font-semibold text-slate-200 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4 text-amber-400" />
                  Telecaller Portal Login
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin('admin');
                  }}
                  className="w-full py-2 text-xs font-semibold text-slate-200 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-amber-400" />
                  Admin Dashboard Login
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onApplyClick();
                  }}
                  className="w-full py-2.5 text-xs font-bold text-slate-950 bg-amber-400 rounded-lg flex items-center justify-center gap-2"
                >
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-amber-300 font-medium">Logged in: {loggedInUser}</p>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full py-2 text-xs font-bold text-rose-300 bg-rose-950/60 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
