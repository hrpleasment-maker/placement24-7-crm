import React, { useState, useEffect } from 'react';
import { Lead, LeadStatus, LEAD_STATUS_LIST, TelecallerUser } from '../types';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import {
  Users, TrendingUp, Calendar, FileSpreadsheet, FileText, CheckCircle2,
  Clock, ShieldAlert, LogOut, RefreshCw, Lock, Plus, UserPlus, Filter,
  Search, Edit3, Trash2, Settings, ExternalLink, ArrowUpRight, BarChart3,
  Briefcase, UserCheck, DollarSign, Award, Sliders, Mail, Globe, Printer
} from 'lucide-react';
import { GoogleSheetsModal } from './GoogleSheetsModal';

interface AdminPortalProps {
  onLogout: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onLogout }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [telecallers, setTelecallers] = useState<TelecallerUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'all-leads' | 'telecallers' | 'hr' | 'recruitment' | 'reports' | 'settings'>('overview');

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [productFilter, setProductFilter] = useState<string>('All');
  const [selectedTelecallerFilter, setSelectedTelecallerFilter] = useState<string>('All');

  // Batch reassign
  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [batchAssignTelecaller, setBatchAssignTelecaller] = useState<string>('');

  // Modals
  const [showGoogleSheetsModal, setShowGoogleSheetsModal] = useState<boolean>(false);
  const [showAddTelecallerModal, setShowAddTelecallerModal] = useState<boolean>(false);
  const [newTcData, setNewTcData] = useState({ name: '', username: '', phone: '', email: '', password: '' });

  // HR & Employee State
  const [employees, setEmployees] = useState([
    { id: 'EMP-101', name: 'Rahul Sharma', role: 'Senior Telecaller', department: 'Outbound Banking', salary: '₹28,000/mo', attendance: '96%', status: 'Active' },
    { id: 'EMP-102', name: 'Priya Singh', role: 'Telecaller Executive', department: 'Credit Cards', salary: '₹25,000/mo', attendance: '98%', status: 'Active' },
    { id: 'EMP-103', name: 'Amit Kumar', role: 'Loan Sanction Executive', department: 'Personal Loans', salary: '₹32,000/mo', attendance: '94%', status: 'Active' },
    { id: 'EMP-104', name: 'Neha Gupta', role: 'HR Manager', department: 'Human Resources', salary: '₹45,000/mo', attendance: '99%', status: 'Active' },
  ]);

  // Recruitment Applications
  const [candidates, setCandidates] = useState([
    { id: 'CAND-501', name: 'Pooja Rani', post: 'Telecaller Work From Home', mobile: '9866554433', status: 'Selected', experience: '2 Years', interviewDate: '2026-07-24' },
    { id: 'CAND-502', name: 'Rohan Mehra', post: 'Data Verification Staff', mobile: '9811002233', status: 'Interview Scheduled', experience: '1 Year', interviewDate: '2026-07-26' },
    { id: 'CAND-503', name: 'Kavita Das', post: 'Banking Field Executive', mobile: '9822334455', status: 'Offer Letter Sent', experience: '3 Years', interviewDate: '2026-07-22' },
  ]);

  // Offer Letter Modal preview
  const [offerModalCandidate, setOfferModalCandidate] = useState<any>(null);

  // App Config
  const [config, setConfig] = useState({
    googleSheetsWebhookUrl: '',
    autoSyncGoogleSheets: true,
    companyName: 'Placement24/7',
    contactPhone: '+91 98765 43210',
    whatsappPhone: '+91 98765 43210',
    email: 'support@placement247.com',
    address: 'Plot 45, Finance Towers, Sector 18, Cyber City, Gurugram, Haryana - 122002',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [leadsRes, tcRes, configRes] = await Promise.all([
        fetch('/api/leads'),
        fetch('/api/telecallers'),
        fetch('/api/config/google-sheets'),
      ]);

      const leadsData = await leadsRes.json();
      const tcData = await tcRes.json();
      const confData = await configRes.json();

      if (leadsData.success) setLeads(leadsData.leads);
      if (tcData.success) setTelecallers(tcData.telecallers);
      if (confData.success) setConfig(confData.config);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Save Google Sheets config
  const handleSaveGoogleSheetsConfig = async (webhookUrl: string, autoSync: boolean) => {
    try {
      await fetch('/api/config/google-sheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ webhookUrl, autoSync }),
      });
      setConfig({ googleSheetsWebhookUrl: webhookUrl, autoSyncGoogleSheets: autoSync });
      alert('Google Sheets Webhook configuration saved successfully!');
    } catch (err) {
      alert('Failed to save configuration.');
    }
  };

  // Add Telecaller
  const handleAddTelecaller = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTcData.name || !newTcData.username) return;

    try {
      const res = await fetch('/api/telecallers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTcData),
      });
      const data = await res.json();
      if (data.success) {
        alert(`Telecaller ${newTcData.name} added successfully!`);
        setShowAddTelecallerModal(false);
        setNewTcData({ name: '', username: '', phone: '', email: '', password: '' });
        fetchData();
      }
    } catch (err) {
      alert('Failed to add telecaller.');
    }
  };

  // Batch Reassign Leads
  const handleBatchReassign = async () => {
    if (selectedLeadIds.length === 0 || !batchAssignTelecaller) {
      alert('Please select leads and pick a telecaller.');
      return;
    }

    try {
      const res = await fetch('/api/leads/batch-assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadIds: selectedLeadIds, telecallerName: batchAssignTelecaller }),
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        setSelectedLeadIds([]);
        fetchData();
      }
    } catch (err) {
      alert('Failed to reassign leads.');
    }
  };

  // Single Lead Delete
  const handleDeleteLead = async (id: string) => {
    if (!confirm(`Are you sure you want to delete lead ${id}?`)) return;
    try {
      await fetch(`/api/leads/${id}`, { method: 'DELETE' });
      setLeads((prev) => prev.filter((l) => l.id !== id));
    } catch (err) {
      alert('Failed to delete lead.');
    }
  };

  // Export to Excel (.xlsx)
  const handleExportExcel = () => {
    if (leads.length === 0) return;

    const formattedData = leads.map((l) => ({
      'Lead ID': l.id,
      'Date': l.date,
      'Time': l.time,
      'Name': l.name,
      'Mobile': l.mobile,
      'WhatsApp': l.whatsapp,
      'Email': l.email || '',
      'District': l.district,
      'State': l.state,
      'Address': l.address || '',
      'Product': l.product,
      'Assigned Telecaller': l.assignedTelecaller,
      'Lead Status': l.status,
      'Next Follow-up Date': l.nextFollowUpDate || '',
      'Remarks': l.remarks || '',
      'Last Updated': l.lastUpdated,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Placement247_Leads');
    XLSX.writeFile(workbook, `Placement247_CRM_Leads_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  // Export to PDF (.pdf)
  const handleExportPDF = () => {
    if (leads.length === 0) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Placement24/7 - Lead Management Executive Report', 14, 20);
    doc.setFontSize(10);
    doc.text(`Generated Date: ${new Date().toLocaleDateString()} | Total Leads: ${leads.length}`, 14, 28);

    let y = 38;
    doc.setFontSize(8);

    doc.text('Lead ID | Date | Name | Product | Telecaller | Status', 14, y);
    doc.line(14, y + 2, 196, y + 2);
    y += 8;

    leads.slice(0, 30).forEach((l) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      const lineStr = `${l.id} | ${l.date} | ${l.name.substring(0, 15)} | ${l.product} | ${l.assignedTelecaller} | ${l.status}`;
      doc.text(lineStr, 14, y);
      y += 6;
    });

    doc.save(`Placement247_Leads_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  // Metrics calculation
  const todayStr = new Date().toISOString().split('T')[0];
  const totalLeads = leads.length;
  const todayLeads = leads.filter((l) => l.date === todayStr).length;
  const interestedLeads = leads.filter((l) => l.status === 'Interested' || l.status === 'Documents Received').length;
  const followUpPending = leads.filter((l) => l.status === 'Follow-up' || l.status === 'Callback Later' || l.status === 'Verification Pending').length;
  const convertedLeads = leads.filter((l) => l.status === 'Completed' || l.status === 'Account Opened' || l.status === 'Credit Card Approved' || l.status === 'Loan Approved').length;
  const notInterestedLeads = leads.filter((l) => l.status === 'Not Interested' || l.status === 'Wrong Number').length;

  // Filtered Leads list
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    const matchesProduct = productFilter === 'All' || lead.product === productFilter;
    const matchesTelecaller = selectedTelecallerFilter === 'All' || lead.assignedTelecaller === selectedTelecallerFilter;
    const matchesQuery =
      searchQuery.trim() === '' ||
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.mobile.includes(searchQuery) ||
      lead.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.state.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesProduct && matchesTelecaller && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Admin Header */}
        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-amber-400">
                <Lock className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold font-serif text-white">Placement24/7 Admin Control Panel</h1>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Full Access
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Master CRM, Telecaller Assignment & Google Sheets Sync Management
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <button
              onClick={() => setShowGoogleSheetsModal(true)}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-xl border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span>Google Sheets Sync</span>
            </button>

            <button
              onClick={fetchData}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 text-xs transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>

            <button
              onClick={onLogout}
              className="px-4 py-2 bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 rounded-xl border border-rose-800/50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
          {[
            { id: 'overview', label: 'Executive Dashboard', icon: BarChart3 },
            { id: 'all-leads', label: `All Leads Master (${leads.length})`, icon: Users },
            { id: 'telecallers', label: `Telecallers (${telecallers.length})`, icon: UserPlus },
            { id: 'hr', label: `HR & Staff (${employees.length})`, icon: Briefcase },
            { id: 'recruitment', label: `Recruitment (${candidates.length})`, icon: UserCheck },
            { id: 'reports', label: 'Reports & Analytics', icon: FileText },
            { id: 'settings', label: 'System Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: EXECUTIVE DASHBOARD */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-medium text-slate-400">Total Leads</span>
                <div className="text-2xl font-black text-white font-serif">{totalLeads}</div>
                <span className="text-[10px] text-emerald-400 font-semibold">100% Captured</span>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-medium text-slate-400">Today's Leads</span>
                <div className="text-2xl font-black text-amber-400 font-serif">{todayLeads}</div>
                <span className="text-[10px] text-amber-300 font-semibold">New Submissions</span>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-medium text-slate-400">Interested Leads</span>
                <div className="text-2xl font-black text-blue-400 font-serif">{interestedLeads}</div>
                <span className="text-[10px] text-blue-300 font-semibold">In Progress</span>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-medium text-slate-400">Follow-up Pending</span>
                <div className="text-2xl font-black text-purple-400 font-serif">{followUpPending}</div>
                <span className="text-[10px] text-purple-300 font-semibold">Scheduled Calls</span>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-medium text-slate-400">Converted Leads</span>
                <div className="text-2xl font-black text-emerald-400 font-serif">{convertedLeads}</div>
                <span className="text-[10px] text-emerald-300 font-semibold">Sanctioned / Opened</span>
              </div>

              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-[11px] font-medium text-slate-400">Not Interested</span>
                <div className="text-2xl font-black text-rose-400 font-serif">{notInterestedLeads}</div>
                <span className="text-[10px] text-rose-300 font-semibold">Closed / Dropped</span>
              </div>
            </div>

            {/* Quick Export & Actions Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white font-serif">Quick Reports Export</h3>
                <p className="text-xs text-slate-400">Download complete master lead records formatted matching Google Sheets</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleExportExcel}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md transition-all border border-emerald-500/30"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
                  Export to Excel (.xlsx)
                </button>

                <button
                  onClick={handleExportPDF}
                  className="px-4 py-2.5 bg-rose-700 hover:bg-rose-600 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-md transition-all border border-rose-600/30"
                >
                  <FileText className="w-4 h-4 text-rose-200" />
                  Export to PDF (.pdf)
                </button>
              </div>
            </div>

            {/* Recent Leads Preview Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white font-serif">Recent Lead Registrations</h3>
                <button
                  onClick={() => setActiveTab('all-leads')}
                  className="text-xs text-amber-400 font-semibold hover:underline flex items-center gap-1"
                >
                  View All Leads Master →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="p-3">Lead ID</th>
                      <th className="p-3">Date & Time</th>
                      <th className="p-3">Name</th>
                      <th className="p-3">Mobile</th>
                      <th className="p-3">Product</th>
                      <th className="p-3">Assigned Telecaller</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {leads.slice(0, 5).map((l) => (
                      <tr key={l.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3 font-mono font-bold text-amber-400">{l.id}</td>
                        <td className="p-3">{l.date} {l.time}</td>
                        <td className="p-3 font-semibold text-white">{l.name}</td>
                        <td className="p-3">{l.mobile}</td>
                        <td className="p-3 text-amber-300">{l.product}</td>
                        <td className="p-3 text-slate-200">{l.assignedTelecaller}</td>
                        <td className="p-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 border border-slate-700 text-white">
                            {l.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ALL LEADS MASTER */}
        {activeTab === 'all-leads' && (
          <div className="space-y-4">
            {/* Search & Filters */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="relative w-full lg:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search Lead ID, Name, Mobile, District..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  {LEAD_STATUS_LIST.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>

                <select
                  value={selectedTelecallerFilter}
                  onChange={(e) => setSelectedTelecallerFilter(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="All">All Telecallers</option>
                  {telecallers.map((t) => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Batch Reassign Bar */}
            <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-3 px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-300 font-medium">
                Selected: <strong className="text-amber-400">{selectedLeadIds.length}</strong> leads
              </span>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <select
                  value={batchAssignTelecaller}
                  onChange={(e) => setBatchAssignTelecaller(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                >
                  <option value="">-- Select Telecaller --</option>
                  {telecallers.map((t) => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                  ))}
                </select>

                <button
                  onClick={handleBatchReassign}
                  className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs whitespace-nowrap"
                >
                  Reassign Selected
                </button>
              </div>
            </div>

            {/* Master Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3.5 w-8">
                        <input
                          type="checkbox"
                          checked={selectedLeadIds.length === filteredLeads.length && filteredLeads.length > 0}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedLeadIds(filteredLeads.map((l) => l.id));
                            } else {
                              setSelectedLeadIds([]);
                            }
                          }}
                          className="rounded bg-slate-800 border-slate-700 text-amber-400"
                        />
                      </th>
                      <th className="p-3.5">Lead ID</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Name & Contact</th>
                      <th className="p-3.5">Product</th>
                      <th className="p-3.5">Location</th>
                      <th className="p-3.5">Telecaller</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5">
                          <input
                            type="checkbox"
                            checked={selectedLeadIds.includes(lead.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedLeadIds((prev) => [...prev, lead.id]);
                              } else {
                                setSelectedLeadIds((prev) => prev.filter((id) => id !== lead.id));
                              }
                            }}
                            className="rounded bg-slate-800 border-slate-700 text-amber-400"
                          />
                        </td>
                        <td className="p-3.5 font-mono font-bold text-amber-400">{lead.id}</td>
                        <td className="p-3.5 text-slate-400">{lead.date}</td>
                        <td className="p-3.5">
                          <div className="font-semibold text-white">{lead.name}</div>
                          <div className="text-[11px] text-slate-400">{lead.mobile}</div>
                        </td>
                        <td className="p-3.5 text-amber-300 font-medium">{lead.product}</td>
                        <td className="p-3.5 text-slate-300">{lead.district}, {lead.state}</td>
                        <td className="p-3.5 text-slate-200 font-medium">{lead.assignedTelecaller}</td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 border border-slate-700 text-white">
                            {lead.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="p-1.5 text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 rounded-lg border border-rose-800/40"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TELECALLER PERFORMANCE */}
        {activeTab === 'telecallers' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-serif">Telecaller Performance & Staff Management</h3>
                <p className="text-xs text-slate-400">View active lead counts, conversions, and add new telecallers</p>
              </div>

              <button
                onClick={() => setShowAddTelecallerModal(true)}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
              >
                <Plus className="w-4 h-4" />
                Add New Telecaller
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {telecallers.map((tc) => {
                const assigned = leads.filter((l) => l.assignedTelecaller === tc.name);
                const completed = assigned.filter((l) => l.status === 'Completed' || l.status === 'Account Opened' || l.status === 'Credit Card Approved' || l.status === 'Loan Approved');
                const convRate = assigned.length > 0 ? Math.round((completed.length / assigned.length) * 100) : 0;

                return (
                  <div key={tc.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-base font-serif border border-amber-400/30">
                        {tc.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-white font-serif">{tc.name}</h4>
                        <span className="text-[11px] text-slate-400">Username: {tc.username} | {tc.phone}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Assigned</span>
                        <span className="font-bold text-white text-base">{assigned.length}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Converted</span>
                        <span className="font-bold text-emerald-400 text-base">{completed.length}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Conv. Rate</span>
                        <span className="font-bold text-amber-400 text-base">{convRate}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: REPORTS */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-lg font-bold text-white font-serif">Daily, Weekly & Monthly Conversion Summary</h3>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Daily Report</h4>
                  <p className="text-2xl font-bold text-white font-serif">{todayLeads} New Leads Today</p>
                  <p className="text-xs text-slate-400">Active telecallers handling live callbacks.</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Weekly Summary</h4>
                  <p className="text-2xl font-bold text-white font-serif">{leads.length} Total Registered</p>
                  <p className="text-xs text-slate-400">Over 85% first contact completion rate.</p>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">Monthly Sanctions</h4>
                  <p className="text-2xl font-bold text-emerald-400 font-serif">{convertedLeads} Approved / Opened</p>
                  <p className="text-xs text-slate-400">High banking approval efficiency.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: HR & STAFF MANAGEMENT */}
        {activeTab === 'hr' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-serif">HR Management & Employee Directory</h3>
                <p className="text-xs text-slate-400">Manage employee IDs, monthly payroll, attendance, and generate official offer letters</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Emp ID</th>
                    <th className="p-3.5">Employee Name</th>
                    <th className="p-3.5">Role / Designation</th>
                    <th className="p-3.5">Department</th>
                    <th className="p-3.5">Salary</th>
                    <th className="p-3.5">Attendance</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {employees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-amber-400">{emp.id}</td>
                      <td className="p-3.5 font-semibold text-white">{emp.name}</td>
                      <td className="p-3.5 text-slate-300">{emp.role}</td>
                      <td className="p-3.5 text-slate-400">{emp.department}</td>
                      <td className="p-3.5 text-emerald-400 font-bold">{emp.salary}</td>
                      <td className="p-3.5 text-blue-300 font-medium">{emp.attendance}</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          {emp.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: RECRUITMENT MODULE */}
        {activeTab === 'recruitment' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-serif">Recruitment & Candidate Portal</h3>
                <p className="text-xs text-slate-400">Track job applicants for Telecaller, Data Verification & Field Executives</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950 text-slate-400 text-[11px] uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Cand ID</th>
                    <th className="p-3.5">Applicant Name</th>
                    <th className="p-3.5">Applied Position</th>
                    <th className="p-3.5">Contact</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {candidates.map((cand) => (
                    <tr key={cand.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-amber-400">{cand.id}</td>
                      <td className="p-3.5 font-semibold text-white">{cand.name}</td>
                      <td className="p-3.5 text-amber-300">{cand.post}</td>
                      <td className="p-3.5 text-slate-300">{cand.mobile}</td>
                      <td className="p-3.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          {cand.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => setOfferModalCandidate(cand)}
                          className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-[11px] inline-flex items-center gap-1 shadow"
                        >
                          <FileText className="w-3 h-3" />
                          Generate Offer Letter
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 7: SETTINGS PANEL */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="text-base font-bold text-white font-serif">System & Company Configuration</h3>
                <p className="text-xs text-slate-400">Configure global helpline, email address, corporate office address, and integrations</p>
              </div>

              <div className="grid md:grid-cols-2 gap-5 text-xs">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Company Brand Name</label>
                  <input
                    type="text"
                    value={config.companyName}
                    onChange={(e) => setConfig({ ...config, companyName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Support Phone Helpline</label>
                  <input
                    type="text"
                    value={config.contactPhone}
                    onChange={(e) => setConfig({ ...config, contactPhone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">WhatsApp Helpline Number</label>
                  <input
                    type="text"
                    value={config.whatsappPhone}
                    onChange={(e) => setConfig({ ...config, whatsappPhone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Official Support Email</label>
                  <input
                    type="text"
                    value={config.email}
                    onChange={(e) => setConfig({ ...config, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => setShowGoogleSheetsModal(true)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl flex items-center gap-2 text-xs"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Configure Google Sheets Webhook
                </button>

                <button
                  onClick={() => alert('Settings updated successfully!')}
                  className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Save All System Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Offer Letter Generator Modal */}
      {offerModalCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6 shadow-2xl text-white relative space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white font-serif">Official Offer Letter Generator</h3>
              </div>
              <button
                onClick={() => setOfferModalCandidate(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs leading-relaxed text-slate-300 font-sans">
              <p className="font-bold text-amber-300 text-sm">PLACEMENT24/7 RECRUITMENT SERVICES</p>
              <p className="text-[11px] text-slate-400">Date: {new Date().toLocaleDateString()}</p>
              <p>Dear <strong>{offerModalCandidate.name}</strong>,</p>
              <p>
                We are pleased to offer you the position of <strong>{offerModalCandidate.post}</strong> at Placement24/7 Enterprise Services.
              </p>
              <p>
                <strong>Designation:</strong> {offerModalCandidate.post}<br />
                <strong>Monthly Compensation:</strong> ₹22,000 - ₹28,000 + Performance Incentives<br />
                <strong>Joining Location:</strong> Sector 18, Cyber City, Gurugram / Work From Home
              </p>
              <p className="text-slate-400 text-[11px]">
                Please sign and return the copy within 3 days.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  alert(`Offer letter sent to ${offerModalCandidate.name} via Email & WhatsApp!`);
                  setOfferModalCandidate(null);
                }}
                className="px-5 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                Download / Issue Offer Letter
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Google Sheets Config Modal */}
      {showGoogleSheetsModal && (
        <GoogleSheetsModal
          currentUrl={config.googleSheetsWebhookUrl}
          autoSync={config.autoSyncGoogleSheets}
          onSaveConfig={handleSaveGoogleSheetsConfig}
          onClose={() => setShowGoogleSheetsModal(false)}
        />
      )}

      {/* Add Telecaller Modal */}
      {showAddTelecallerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-md w-full p-6 shadow-2xl text-white relative">
            <h3 className="text-lg font-bold font-serif text-white mb-4">Add Telecaller Account</h3>
            <form onSubmit={handleAddTelecaller} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Joshi"
                  value={newTcData.name}
                  onChange={(e) => setNewTcData({ ...newTcData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Username (for login)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. vikram"
                  value={newTcData.username}
                  onChange={(e) => setNewTcData({ ...newTcData, username: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Default: telecaller123"
                  value={newTcData.password}
                  onChange={(e) => setNewTcData({ ...newTcData, password: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTelecallerModal(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 text-slate-950 font-bold rounded-xl"
                >
                  Create Telecaller
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
