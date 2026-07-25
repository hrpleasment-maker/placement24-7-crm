import React, { useState, useEffect } from 'react';
import { Lead, LeadStatus, LEAD_STATUS_LIST } from '../types';
import {
  Phone, MessageSquare, Search, Filter, Calendar, Edit3, CheckCircle2,
  Clock, ShieldAlert, LogOut, RefreshCw, UserCheck, ChevronRight, FileText, X, ArrowUpRight
} from 'lucide-react';

interface TelecallerPortalProps {
  currentUser: { id: string; name: string; username: string };
  onLogout: () => void;
}

export const TelecallerPortal: React.FC<TelecallerPortalProps> = ({
  currentUser,
  onLogout,
}) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [productFilter, setProductFilter] = useState<string>('All');

  // Lead update modal state
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [statusInput, setStatusInput] = useState<LeadStatus>('New Lead');
  const [remarksInput, setRemarksInput] = useState<string>('');
  const [nextFollowUpInput, setNextFollowUpInput] = useState<string>('');
  const [saving, setSaving] = useState<boolean>(false);
  const [updateSuccessMsg, setUpdateSuccessMsg] = useState<string>('');

  // Fetch assigned leads
  const fetchAssignedLeads = async () => {
    setLoading(true);
    try {
      // Query leads assigned to currentUser
      const res = await fetch(`/api/leads?assignedTo=${encodeURIComponent(currentUser.name)}`);
      const data = await res.json();
      if (data.success && data.leads) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error('Failed to fetch assigned leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignedLeads();
  }, [currentUser]);

  const handleEditClick = (lead: Lead) => {
    setEditingLead(lead);
    setStatusInput(lead.status);
    setRemarksInput(lead.remarks || '');
    setNextFollowUpInput(lead.nextFollowUpDate || '');
    setUpdateSuccessMsg('');
  };

  const handleSaveUpdate = async () => {
    if (!editingLead) return;
    setSaving(true);
    setUpdateSuccessMsg('');

    try {
      const res = await fetch(`/api/leads/${editingLead.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: statusInput,
          remarks: remarksInput,
          nextFollowUpDate: nextFollowUpInput,
          updatedBy: currentUser.name,
        }),
      });

      const data = await res.json();
      if (data.success && data.lead) {
        setUpdateSuccessMsg('Saved & Synced to Google Sheets!');
        // Update local list
        setLeads((prev) =>
          prev.map((l) => (l.id === data.lead.id ? data.lead : l))
        );
        setTimeout(() => {
          setEditingLead(null);
          setUpdateSuccessMsg('');
        }, 1200);
      }
    } catch (err) {
      alert('Failed to save update. Please check server connection.');
    } finally {
      setSaving(false);
    }
  };

  // Filtered leads
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchesProduct = productFilter === 'All' || lead.product === productFilter;
    const matchesQuery =
      searchQuery.trim() === '' ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.mobile.includes(searchQuery) ||
      lead.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.district.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesProduct && matchesQuery;
  });

  // Unique products present in assigned leads
  const availableProducts = Array.from(new Set(leads.map((l) => l.product)));

  const getStatusBadgeClass = (status: LeadStatus) => {
    switch (status) {
      case 'Completed':
      case 'Account Opened':
      case 'Credit Card Approved':
      case 'Loan Approved':
      case 'Verification Completed':
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      case 'Interested':
      case 'Documents Received':
        return 'bg-blue-500/10 text-blue-300 border-blue-500/30';
      case 'Follow-up':
      case 'Callback Later':
        return 'bg-amber-400/10 text-amber-300 border-amber-400/30';
      case 'Called':
      case 'Documents Pending':
      case 'Verification Pending':
        return 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30';
      case 'Not Interested':
      case 'Wrong Number':
        return 'bg-rose-500/10 text-rose-300 border-rose-500/30';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Telecaller Header */}
        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 text-lg font-bold font-serif shadow-inner">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold font-serif text-white">{currentUser.name}</h1>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Assigned Telecaller
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Role-Based Access: Viewing only leads assigned to you.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={fetchAssignedLeads}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh Leads
            </button>

            <button
              onClick={onLogout}
              className="px-4 py-2 bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 rounded-xl border border-rose-800/50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Assigned Leads</div>
            <div className="text-2xl font-bold text-white font-serif mt-1">{leads.length}</div>
          </div>
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Interested / Pending</div>
            <div className="text-2xl font-bold text-amber-400 font-serif mt-1">
              {leads.filter((l) => l.status === 'Interested' || l.status === 'Documents Pending' || l.status === 'Verification Pending' || l.status === 'Follow-up').length}
            </div>
          </div>
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Converted / Completed</div>
            <div className="text-2xl font-bold text-emerald-400 font-serif mt-1">
              {leads.filter((l) => l.status === 'Completed' || l.status === 'Account Opened' || l.status === 'Credit Card Approved' || l.status === 'Loan Approved').length}
            </div>
          </div>
          <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div className="text-xs text-slate-400 font-medium">Follow-up Today</div>
            <div className="text-2xl font-bold text-blue-400 font-serif mt-1">
              {leads.filter((l) => l.nextFollowUpDate === new Date().toISOString().split('T')[0]).length}
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Lead ID, Name, Mobile, District..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400 font-medium">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
              >
                <option value="All" className="bg-slate-900">All Statuses ({leads.length})</option>
                {LEAD_STATUS_LIST.map((st) => (
                  <option key={st} value={st} className="bg-slate-900">
                    {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Filter */}
            <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 font-medium">Product:</span>
              <select
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
                className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
              >
                <option value="All" className="bg-slate-900">All Products</option>
                {availableProducts.map((p) => (
                  <option key={p} value={p} className="bg-slate-900">
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Leads Table / Cards */}
        {loading ? (
          <div className="text-center py-12 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-xs text-slate-400">Loading assigned leads...</p>
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="text-center py-12 bg-slate-900 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-xs">No assigned leads matching your filters.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLeads.map((lead) => (
              <div
                key={lead.id}
                className="bg-slate-900 border border-slate-800 hover:border-amber-500/30 rounded-2xl p-4 transition-all shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Customer Details */}
                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                      {lead.id}
                    </span>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadgeClass(lead.status)}`}>
                      {lead.status}
                    </span>
                    <span className="text-[11px] text-slate-400">{lead.date} | {lead.time}</span>
                  </div>

                  <h3 className="text-base font-bold text-white font-serif">{lead.name}</h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                    <span className="font-semibold text-amber-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      Product: {lead.product}
                    </span>
                    <span>Location: <strong className="text-white">{lead.district}, {lead.state}</strong></span>
                    <span>Mobile: <strong className="text-white">{lead.mobile}</strong></span>
                  </div>

                  {lead.remarks && (
                    <p className="text-xs text-slate-400 bg-slate-950/80 p-2 rounded-lg border border-slate-800/80 italic">
                      Remarks: "{lead.remarks}"
                    </p>
                  )}

                  {lead.nextFollowUpDate && (
                    <div className="text-xs text-amber-300 flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-amber-400" />
                      Next Follow-up Date: {lead.nextFollowUpDate}
                    </div>
                  )}
                </div>

                {/* Telecaller Quick Actions */}
                <div className="flex items-center gap-2 flex-wrap md:flex-nowrap pt-2 md:pt-0 border-t md:border-t-0 border-slate-800">
                  {/* Click to Call */}
                  <a
                    href={`tel:+91${lead.mobile}`}
                    className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                    title="Click to Call"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-200" />
                    <span>Call</span>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/91${lead.whatsapp || lead.mobile}?text=${encodeURIComponent(
                      `Hello ${lead.name},\nThis is ${currentUser.name} from Placement24/7 regarding your application for *${lead.product}* (Lead ID: ${lead.id}).\nHow can I assist you today?`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                    title="WhatsApp Customer"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-200" />
                    <span>WhatsApp</span>
                  </a>

                  {/* Update Status */}
                  <button
                    onClick={() => handleEditClick(lead)}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Update Lead</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Lead Modal */}
      {editingLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 shadow-2xl text-white relative">
            <button
              onClick={() => setEditingLead(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-bold font-serif text-white mb-1">Update Lead Status</h2>
            <p className="text-xs text-slate-400 mb-4">
              Lead ID: <span className="text-amber-400 font-mono font-bold">{editingLead.id}</span> | {editingLead.name} ({editingLead.product})
            </p>

            {updateSuccessMsg && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{updateSuccessMsg}</span>
              </div>
            )}

            <div className="space-y-4 text-xs">
              {/* Status Dropdown */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Lead Status Dropdown <span className="text-amber-400">*</span>
                </label>
                <select
                  value={statusInput}
                  onChange={(e) => setStatusInput(e.target.value as LeadStatus)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  {LEAD_STATUS_LIST.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Next Follow Up Date */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Next Follow-up Date
                </label>
                <input
                  type="date"
                  value={nextFollowUpInput}
                  onChange={(e) => setNextFollowUpInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Remarks */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Call Remarks / Progress Notes
                </label>
                <textarea
                  rows={4}
                  placeholder="e.g., Spoke with customer. Salary slip collected via WhatsApp. Arranging doorstep document verification..."
                  value={remarksInput}
                  onChange={(e) => setRemarksInput(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
                ></textarea>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setEditingLead(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUpdate}
                disabled={saving}
                className="px-6 py-2 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-amber-500/20 flex items-center gap-1.5"
              >
                {saving ? 'Saving...' : 'Save & Sync to Google Sheets'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
