import React from 'react';
import { Lead } from '../types';
import { CheckCircle2, Copy, MessageSquare, X, Calendar, Clock, UserCheck, ShieldCheck, FileText } from 'lucide-react';

interface SuccessModalProps {
  lead: Lead | null;
  onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({ lead, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!lead) return null;

  const handleCopyLeadId = () => {
    navigator.clipboard.writeText(lead.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppNotify = () => {
    const text = `Hello Placement24/7 Team,\n\nI have submitted my application on your website.\n*Lead ID:* ${lead.id}\n*Name:* ${lead.name}\n*Product:* ${lead.product}\n*Location:* ${lead.district}, ${lead.state}\n\nPlease confirm receipt of my documents.\nThank you!`;
    const url = `https://wa.me/919876543210?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl text-white relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Success Badge */}
        <div className="text-center space-y-3 mb-6">
          <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-500/20">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold font-serif text-white">Application Submitted!</h2>
          <p className="text-xs text-slate-300">
            Your application has been registered & automatically synced to Google Sheets.
          </p>
        </div>

        {/* Generated Lead ID Banner */}
        <div className="bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 border border-amber-400/40 rounded-2xl p-4 mb-6 text-center">
          <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block mb-1">
            Generated Lead ID
          </span>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl font-black tracking-wider text-amber-400 font-mono">
              {lead.id}
            </span>
            <button
              onClick={handleCopyLeadId}
              className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300 hover:bg-amber-400/30 transition-colors"
              title="Copy Lead ID"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
          {copied && <span className="text-[10px] text-emerald-400 font-semibold block mt-1">Copied to clipboard!</span>}
        </div>

        {/* Details Grid */}
        <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2.5 text-xs text-slate-300 mb-6">
          <div className="flex justify-between py-1 border-b border-slate-800/80">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" /> Date & Time:
            </span>
            <span className="font-semibold text-white">{lead.date} | {lead.time}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-800/80">
            <span className="text-slate-400 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-400" /> Applicant Name:
            </span>
            <span className="font-semibold text-white">{lead.name}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-800/80">
            <span className="text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Selected Service:
            </span>
            <span className="font-semibold text-amber-300">{lead.product}</span>
          </div>

          <div className="flex justify-between py-1 border-b border-slate-800/80">
            <span className="text-slate-400 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-amber-400" /> Assigned Telecaller:
            </span>
            <span className="font-semibold text-emerald-300">{lead.assignedTelecaller}</span>
          </div>

          <div className="flex justify-between py-1">
            <span className="text-slate-400">Location:</span>
            <span className="font-semibold text-white">{lead.district}, {lead.state}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleWhatsAppNotify}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 border border-emerald-400/30 transition-all shadow-md"
          >
            <MessageSquare className="w-4 h-4 text-emerald-200" />
            Notify Telecaller on WhatsApp
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition-colors"
          >
            Close & Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};
