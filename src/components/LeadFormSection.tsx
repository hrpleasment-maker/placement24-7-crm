import React, { useState } from 'react';
import { Lead } from '../types';
import {
  Send,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

interface LeadFormSectionProps {
  preselectedProduct?: string;
  onLeadSubmitted: (newLead: Lead) => void;
}

const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbz5C7ejuQ6TGLKNyUeTSpuoxLG3mHO0lhkHd57iCDL8kLDBtEX50pvfBQaAu2FogOyUcQ/exec';

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra & Nagar Haveli and Daman & Diu',
  'Delhi NCR',
  'Jammu & Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
];

const PRODUCTS_LIST = [
  'Savings Account',
  'Current Account',
  'Credit Card',
  'Personal Loan',
  'Business Loan',
  'Home Loan',
  'Loan Against Property',
  'Demat Account',
  'Insurance',
  'Investment',
  'Recruitment Services',
  'Data Verification',
  'Telecaller Jobs',
];

export const LeadFormSection: React.FC<LeadFormSectionProps> = ({
  preselectedProduct,
  onLeadSubmitted,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    whatsapp: '',
    sameAsMobile: true,
    email: '',
    state: 'West Bengal',
    district: '',
    address: '',
    product: preselectedProduct || 'Personal Loan',
    leadSource: 'Website Direct',
    preferredCallTime: 'Anytime (9 AM - 7 PM)',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  React.useEffect(() => {
    if (preselectedProduct) {
      setFormData((prev) => ({
        ...prev,
        product: preselectedProduct,
      }));
    }
  }, [preselectedProduct]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const next = {
        ...prev,
        [name]: value,
      };

      if (name === 'mobile' && prev.sameAsMobile) {
        next.whatsapp = value;
      }

      return next;
    });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    setFormData((prev) => ({
      ...prev,
      sameAsMobile: checked,
      whatsapp: checked ? prev.mobile : prev.whatsapp,
    }));
  };

  const submitLead = async () => {
    setErrorMessage('');
    setSuccessMessage('');

    const mobile = formData.mobile.replace(/\D/g, '');
    const whatsapp = formData.whatsapp.replace(/\D/g, '');

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your Full Name.');
      return;
    }

    if (mobile.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit Mobile Number.');
      return;
    }

    if (!formData.district.trim()) {
      setErrorMessage('Please enter your District name.');
      return;
    }

    if (!formData.state) {
      setErrorMessage('Please select your State.');
      return;
    }

    setLoading(true);

    const payload = {
      name: formData.name.trim(),
      mobile: mobile,
      whatsapp: formData.sameAsMobile
        ? mobile
        : whatsapp || mobile,
      email: formData.email.trim(),
      district: formData.district.trim(),
      state: formData.state,
      address: formData.address.trim(),
      product: formData.product,
      leadSource: formData.leadSource,
      preferredCallTime: formData.preferredCallTime,
      message: formData.message.trim(),
    };

    try {
      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      const newLead = {
        id: `TEMP-${Date.now()}`,
        name: payload.name,
        mobile: payload.mobile,
        whatsapp: payload.whatsapp,
        email: payload.email,
        district: payload.district,
        state: payload.state,
        address: payload.address,
        product: payload.product,
        leadSource: payload.leadSource,
        preferredCallTime: payload.preferredCallTime,
        message: payload.message,
        status: 'New',
      } as unknown as Lead;

      onLeadSubmitted(newLead);

      setSuccessMessage(
        'Application submitted successfully. Your Lead ID is being generated.'
      );

      setFormData({
        name: '',
        mobile: '',
        whatsapp: '',
        sameAsMobile: true,
        email: '',
        state: 'West Bengal',
        district: '',
        address: '',
        product: preselectedProduct || 'Personal Loan',
        leadSource: 'Website Direct',
        preferredCallTime: 'Anytime (9 AM - 7 PM)',
        message: '',
      });
    } catch (error) {
      console.error('Lead submission error:', error);

      setErrorMessage(
        'Unable to submit application. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitLead();
  };

  return (
    <section
      id="apply-form"
      className="py-16 bg-slate-900 text-white border-b border-slate-800"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-slate-950 border border-amber-500/30 rounded-3xl shadow-2xl p-6 sm:p-10 relative overflow-hidden">

          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500"></div>

          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              100% Free & Confidential Application
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              Apply Now For Instant Approval
            </h2>

            <p className="text-xs sm:text-sm text-slate-300">
              Fill in your details below. An official Placement24/7
              telecaller manager will generate your Lead ID and connect
              with you within 30 minutes.
            </p>
          </div>

          {errorMessage && (
            <div className="mb-6 p-4 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-200 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid md:grid-cols-2 gap-5">

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Name <span className="text-amber-400">*</span>
                </label>

                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700/90 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Select Product / Service <span className="text-amber-400">*</span>
                </label>

                <select
                  name="product"
                  value={formData.product}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700/90 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                >
                  {PRODUCTS_LIST.map((prod) => (
                    <option key={prod} value={prod}>
                      {prod}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Mobile Number <span className="text-amber-400">*</span>
                </label>

                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-semibold">
                    +91
                  </span>

                  <input
                    type="tel"
                    name="mobile"
                    required
                    maxLength={10}
                    inputMode="numeric"
                    placeholder="10 digit mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700/90 rounded-xl pl-12 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">

                  <label className="text-xs font-semibold text-slate-300">
                    WhatsApp Number <span className="text-amber-400">*</span>
                  </label>

                  <label className="inline-flex items-center gap-1.5 cursor-pointer text-[11px] text-slate-400">
                    <input
                      type="checkbox"
                      checked={formData.sameAsMobile}
                      onChange={handleCheckbox}
                      className="rounded bg-slate-800 border-slate-700 text-amber-400 focus:ring-0"
                    />
                    <span>Same as Mobile</span>
                  </label>
                </div>

                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-emerald-400 font-semibold">
                    +91
                  </span>

                  <input
                    type="tel"
                    name="whatsapp"
                    disabled={formData.sameAsMobile}
                    placeholder="WhatsApp number"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700/90 rounded-xl pl-12 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 disabled:opacity-60 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Email Address <span className="text-slate-500">(Optional)</span>
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="e.g. name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700/90 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Lead Source
                </label>

                <select
                  name="leadSource"
                  value={formData.leadSource}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700/90 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                >
                  <option value="Website Direct">Website Direct</option>
                  <option value="Google Search">Google Search</option>
                  <option value="WhatsApp Channel">WhatsApp Channel</option>
                  <option value="Facebook / Instagram">
                    Facebook / Instagram
                  </option>
                  <option value="Friend Referral">
                    Friend / Relative Referral
                  </option>
                  <option value="Direct Call">Direct Phone Call</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Preferred Call Time
                </label>

                <select
                  name="preferredCallTime"
                  value={formData.preferredCallTime}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700/90 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                >
                  <option value="Anytime (9 AM - 7 PM)">
                    Anytime (9 AM - 7 PM)
                  </option>
                  <option value="Morning (9 AM - 12 PM)">
                    Morning (9 AM - 12 PM)
                  </option>
                  <option value="Afternoon (12 PM - 4 PM)">
                    Afternoon (12 PM - 4 PM)
                  </option>
                  <option value="Evening (4 PM - 7 PM)">
                    Evening (4 PM - 7 PM)
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  State <span className="text-amber-400">*</span>
                </label>

                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700/90 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                >
                  {INDIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  District <span className="text-amber-400">*</span>
                </label>

                <input
                  type="text"
                  name="district"
                  required
                  placeholder="e.g. Murshidabad"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700/90 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Complete Address
                </label>

                <input
                  type="text"
                  name="address"
                  placeholder="House/Street/Locality"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700/90 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Message / Loan Amount / Requirements
              </label>

              <textarea
                name="message"
                rows={3}
                placeholder="Specify required loan amount, preferred bank, monthly salary, or specific inquiry details..."
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700/90 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                    <span>Saving Lead...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Application & Generate Lead ID</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              Your data will be automatically synced to Google Sheets.
            </p>

          </form>
        </div>
      </div>
    </section>
  );
};
