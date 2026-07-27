import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { AboutSection } from './components/AboutSection';
import { ServicesGrid } from './components/ServicesGrid';
import { WhyChooseUs } from './components/WhyChooseUs';
import { NewLeadFormSection as LeadFormSection } from './components/NewLeadFormSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SuccessModal } from './components/SuccessModal';
import { LoginModal } from './components/LoginModal';
import { TelecallerPortal } from './components/TelecallerPortal';
import { AdminPortal } from './components/AdminPortal';
import { Product, Lead } from './types';

export default function App() {
  const [activeRole, setActiveRole] = useState<'public' | 'telecaller' | 'admin'>('public');
  const [loggedInUser, setLoggedInUser] = useState<any>(null);

  // Modals state
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginRoleTarget, setLoginRoleTarget] = useState<'telecaller' | 'admin'>('telecaller');

  const [selectedProductDetails, setSelectedProductDetails] = useState<Product | null>(null);
  const [preselectedProductForForm, setPreselectedProductForForm] = useState<string>('Personal Loan');
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);

  // Navigation scroll helper
  const handleNavigate = (sectionId: string) => {
    if (activeRole !== 'public') {
      setActiveRole('public');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLogin = (targetRole: 'telecaller' | 'admin') => {
    setLoginRoleTarget(targetRole);
    setLoginModalOpen(true);
  };

  const handleLoginSuccess = (role: 'telecaller' | 'admin', userObj: any) => {
    setLoggedInUser(userObj);
    setActiveRole(role);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setActiveRole('public');
  };

  const handleApplyProduct = (productName: string) => {
    setPreselectedProductForForm(productName);
    handleNavigate('apply-form');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        onNavigate={handleNavigate}
        onOpenLogin={handleOpenLogin}
        onApplyClick={() => handleNavigate('apply-form')}
        activeRole={activeRole}
        loggedInUser={loggedInUser ? loggedInUser.name : undefined}
        onLogout={handleLogout}
      />

      {/* Main Role Content Views */}
      {activeRole === 'telecaller' && loggedInUser ? (
        <TelecallerPortal currentUser={loggedInUser} onLogout={handleLogout} />
      ) : activeRole === 'admin' ? (
        <AdminPortal onLogout={handleLogout} />
      ) : (
        /* Public Landing Page View */
        <main>
          {/* Hero Banner */}
          <HeroBanner
            onApplyNow={() => handleNavigate('apply-form')}
            onExploreServices={() => handleNavigate('services')}
            onSelectProduct={(pName) => setPreselectedProductForForm(pName)}
          />

          {/* About Section */}
          <AboutSection />

          {/* Our Services Section (13 Services) */}
          <ServicesGrid
            onSelectProductDetails={(product) => setSelectedProductDetails(product)}
            onApplyProduct={handleApplyProduct}
          />

          {/* Why Choose Us */}
          <WhyChooseUs />

          {/* Lead Form Section */}
          <LeadFormSection
            preselectedProduct={preselectedProductForForm}
            onLeadSubmitted={(newLead) => setSubmittedLead(newLead)}
          />

          {/* Contact Section */}
          <ContactSection />
        </main>
      )}

      {/* Footer */}
      <Footer onNavigate={handleNavigate} onOpenLogin={handleOpenLogin} />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductDetails}
        onClose={() => setSelectedProductDetails(null)}
        onApply={handleApplyProduct}
      />

      {/* Success Modal after Lead Submission */}
      <SuccessModal
        lead={submittedLead}
        onClose={() => setSubmittedLead(null)}
      />

      {/* Login Modal */}
      {loginModalOpen && (
        <LoginModal
          initialRole={loginRoleTarget}
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setLoginModalOpen(false)}
        />
      )}
    </div>
  );
}
