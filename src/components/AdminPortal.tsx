import React, { useEffect, useState } from 'react';
import {
  Users,
  FileSpreadsheet,
  FileText,
  LogOut,
  RefreshCw,
  Lock,
  Plus,
  UserPlus,
  Search,
  Trash2,
  Settings,
  BarChart3,
  Briefcase,
  UserCheck,
  Award,
  Printer,
} from 'lucide-react';

import { Lead, LEAD_STATUS_LIST, TelecallerUser } from '../types';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import { GoogleSheetsModal } from './GoogleSheetsModal';

interface AdminPortalProps {
  onLogout: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onLogout }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [telecallers, setTelecallers] = useState<TelecallerUser[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'all-leads'
    | 'telecallers'
    | 'hr'
    | 'recruitment'
    | 'reports'
    | 'settings'
  >('overview');

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedTelecallerFilter, setSelectedTelecallerFilter] =
    useState('All');

  const [selectedLeadIds, setSelectedLeadIds] = useState<string[]>([]);
  const [batchAssignTelecaller, setBatchAssignTelecaller] = useState('');

  const [showGoogleSheetsModal, setShowGoogleSheetsModal] = useState(false);
  const [showAddTelecallerModal, setShowAddTelecallerModal] = useState(false);

  const [newTcData, setNewTcData] = useState({
    name: '',
    username: '',
    phone: '',
    email: '',
    password: '',
  });

  const [addingTelecaller, setAddingTelecaller] = useState(false);

  const [employees] = useState([
    {
      id: 'EMP-101',
      name: 'Rahul Sharma',
      role: 'Senior Telecaller',
      department: 'Outbound Banking',
      salary: '₹28,000/mo',
      attendance: '96%',
      status: 'Active',
    },
    {
      id: 'EMP-102',
      name: 'Priya Singh',
      role: 'Telecaller Executive',
      department: 'Credit Cards',
      salary: '₹25,000/mo',
      attendance: '98%',
      status: 'Active',
    },
    {
      id: 'EMP-103',
      name: 'Amit Kumar',
      role: 'Loan Sanction Executive',
      department: 'Personal Loans',
      salary: '₹32,000/mo',
      attendance: '94%',
      status: 'Active',
    },
    {
      id: 'EMP-104',
      name: 'Neha Gupta',
      role: 'HR Manager',
      department: 'Human Resources',
      salary: '₹45,000/mo',
      attendance: '99%',
      status: 'Active',
    },
  ]);

  const [candidates] = useState([
    {
      id: 'CAND-501',
      name: 'Pooja Rani',
      post: 'Telecaller Work From Home',
      mobile: '9866554433',
      status: 'Selected',
      experience: '2 Years',
      interviewDate: '2026-07-24',
    },
    {
      id: 'CAND-502',
      name: 'Rohan Mehra',
      post: 'Data Verification Staff',
      mobile: '9811002233',
      status: 'Interview Scheduled',
      experience: '1 Year',
      interviewDate: '2026-07-26',
    },
    {
      id: 'CAND-503',
      name: 'Kavita Das',
      post: 'Banking Field Executive',
      mobile: '9822334455',
      status: 'Offer Letter Sent',
      experience: '3 Years',
      interviewDate: '2026-07-22',
    },
  ]);

  const [offerModalCandidate, setOfferModalCandidate] = useState<any>(null);

  const [config, setConfig] = useState({
    googleSheetsWebhookUrl: '',
    autoSyncGoogleSheets: true,
    companyName: 'Placement24/7',
    contactPhone: '',
    whatsappPhone: '',
    email: '',
    address: '',
  });

  // =========================================================
  // LOAD ADMIN DATA
  // =========================================================

  const fetchData = async () => {
    setLoading(true);

    try {
      const [leadsRes, tcRes, configRes] = await Promise.all([
        fetch('/api/leads', {
          method: 'GET',
          cache: 'no-store',
        }),

        fetch(`/api/telecallers?t=${Date.now()}`, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            Accept: 'application/json',
            'Cache-Control': 'no-cache',
          },
        }),

        fetch('/api/config/google-sheets', {
          method: 'GET',
          cache: 'no-store',
        }),
      ]);

      // -------------------------
      // LEADS
      // -------------------------

      try {
        const leadsData = await leadsRes.json();

        if (
          leadsData?.success &&
          Array.isArray(leadsData.leads)
        ) {
          setLeads(leadsData.leads);
        }
      } catch {
        console.warn('Could not load leads.');
      }

      // -------------------------
      // TELECALLERS
      // -------------------------

      try {
        const tcData = await tcRes.json();

        console.log('GET /api/telecallers response:', tcData);

        if (
          tcData?.success &&
          Array.isArray(tcData.telecallers)
        ) {
          setTelecallers(tcData.telecallers);
        } else {
          console.warn(
            'Telecaller API did not return a valid telecaller list.'
          );
        }
      } catch (error) {
        console.warn(
          'Could not load telecallers.',
          error
        );
      }

      // -------------------------
      // GOOGLE SHEETS CONFIG
      // -------------------------

      try {
        const confData = await configRes.json();

        if (
          confData?.success &&
          confData.config
        ) {
          setConfig((prev) => ({
            ...prev,
            ...confData.config,
          }));
        }
      } catch {
        console.warn(
          'Could not load Google Sheets config.'
        );
      }
    } catch (error) {
      console.error(
        'Admin data loading error:',
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // =========================================================
  // ADD TELECALLER
  // =========================================================

  const handleAddTelecaller = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const name = newTcData.name.trim();

    const username = newTcData.username
      .trim()
      .toLowerCase();

    const password =
      newTcData.password.trim() ||
      'telecaller123';

    if (!name) {
      alert('Full Name is required.');
      return;
    }

    if (!username) {
      alert('Username is required.');
      return;
    }

    if (password.length < 4) {
      alert(
        'Password must be at least 4 characters.'
      );
      return;
    }

    setAddingTelecaller(true);

    try {
      const response = await fetch(
        '/api/telecallers',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Cache-Control': 'no-cache',
          },
          cache: 'no-store',
          body: JSON.stringify({
            name,
            username,
            phone: newTcData.phone.trim(),
            email: newTcData.email.trim(),
            password,
          }),
        }
      );

      const rawText = await response.text();

      let data: any = null;

      try {
        data = rawText
          ? JSON.parse(rawText)
          : null;
      } catch {
        console.error(
          'API returned non-JSON:',
          rawText
        );
      }

      console.log(
        'POST /api/telecallers response:',
        {
          status: response.status,
          ok: response.ok,
          data,
          rawText,
        }
      );

      // -------------------------
      // SERVER ERROR
      // -------------------------

      if (!response.ok) {
        const message =
          data?.message ||
          `Server error (${response.status}). Please try again.`;

        alert(
          `Failed to add telecaller.\n\n${message}`
        );

        return;
      }

      // -------------------------
      // API FAILED
      // -------------------------

      if (!data?.success) {
        alert(
          `Failed to add telecaller.\n\n${
            data?.message ||
            'Server did not confirm creation.'
          }`
        );

        return;
      }

      // =====================================================
      // IMPORTANT:
      // ADD NEW TELECALLER DIRECTLY TO CURRENT SCREEN
      // =====================================================

      const serverTelecaller =
        data?.telecaller ||
        data?.user ||
        data?.createdTelecaller ||
        null;

      const newTelecaller =
        serverTelecaller ||
        ({
          id:
            data?.id ||
            data?.telecallerId ||
            `TC-${Date.now()}`,
          name,
          username,
          phone: newTcData.phone.trim(),
          email: newTcData.email.trim(),
        } as TelecallerUser);

      setTelecallers((prev) => {
        const alreadyExists = prev.some(
          (tc) =>
            tc.username?.toLowerCase() ===
            username
        );

        if (alreadyExists) {
          return prev;
        }

        return [
          ...prev,
          newTelecaller,
        ];
      });

      alert(
        `Telecaller "${name}" added successfully!`
      );

      setShowAddTelecallerModal(false);

      setNewTcData({
        name: '',
        username: '',
        phone: '',
        email: '',
        password: '',
      });

      // Refresh API data after a short delay.
      // The newly created telecaller is already shown above.
      setTimeout(() => {
        fetchData();
      }, 500);
    } catch (error) {
      console.error(
        'Add telecaller error:',
        error
      );

      alert(
        'Failed to add telecaller.\n\n' +
          'The server/API could not be reached.'
      );
    } finally {
      setAddingTelecaller(false);
    }
  };

  // =========================================================
  // GOOGLE SHEETS
  // =========================================================

  const handleSaveGoogleSheetsConfig = async (
    webhookUrl: string,
    autoSync: boolean
  ) => {
    try {
      const response = await fetch(
        '/api/config/google-sheets',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            webhookUrl,
            autoSync,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data?.success) {
        alert(
          data?.message ||
            'Failed to save configuration.'
        );
        return;
      }

      setConfig((prev) => ({
        ...prev,
        googleSheetsWebhookUrl: webhookUrl,
        autoSyncGoogleSheets: autoSync,
      }));

      alert(
        'Google Sheets configuration saved successfully.'
      );

      setShowGoogleSheetsModal(false);
    } catch (error) {
      console.error(error);
      alert('Failed to save configuration.');
    }
  };

  // =========================================================
  // DELETE LEAD
  // =========================================================

  const handleDeleteLead = async (
    id: string
  ) => {
    if (
      !confirm(
        `Are you sure you want to delete lead ${id}?`
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `/api/leads/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        alert('Failed to delete lead.');
        return;
      }

      setLeads((prev) =>
        prev.filter(
          (lead) => lead.id !== id
        )
      );
    } catch {
      alert('Failed to delete lead.');
    }
  };

  // =========================================================
  // BATCH ASSIGN
  // =========================================================

  const handleBatchReassign = async () => {
    if (selectedLeadIds.length === 0) {
      alert(
        'Please select at least one lead.'
      );
      return;
    }

    if (!batchAssignTelecaller) {
      alert(
        'Please select a telecaller.'
      );
      return;
    }

    try {
      const response = await fetch(
        '/api/leads/batch-assign',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            leadIds: selectedLeadIds,
            telecallerName:
              batchAssignTelecaller,
          }),
        }
      );

      const data = await response.json();

      if (
        !response.ok ||
        !data?.success
      ) {
        alert(
          data?.message ||
            'Failed to reassign leads.'
        );
        return;
      }

      alert(
        data.message ||
          'Leads reassigned successfully.'
      );

      setSelectedLeadIds([]);
      setBatchAssignTelecaller('');

      await fetchData();
    } catch {
      alert('Failed to reassign leads.');
    }
  };

  // =========================================================
  // EXPORT EXCEL
  // =========================================================

  const handleExportExcel = () => {
    if (leads.length === 0) {
      alert(
        'There are no leads to export.'
      );
      return;
    }

    const formattedData = leads.map(
      (l) => ({
        'Lead ID': l.id,
        Date: l.date,
        Time: l.time,
        Name: l.name,
        Mobile: l.mobile,
        WhatsApp: l.whatsapp,
        Email: l.email || '',
        District: l.district,
        State: l.state,
        Address: l.address || '',
        Product: l.product,
        'Assigned Telecaller':
          l.assignedTelecaller,
        'Lead Status': l.status,
        'Next Follow-up Date':
          l.nextFollowUpDate || '',
        Remarks: l.remarks || '',
        'Last Updated': l.lastUpdated,
      })
    );

    const worksheet =
      XLSX.utils.json_to_sheet(
        formattedData
      );

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Placement247_Leads'
    );

    XLSX.writeFile(
      workbook,
      `Placement247_CRM_Leads_${
        new Date()
          .toISOString()
          .split('T')[0]
      }.xlsx`
    );
  };

  // =========================================================
  // EXPORT PDF
  // =========================================================

  const handleExportPDF = () => {
    if (leads.length === 0) {
      alert(
        'There are no leads to export.'
      );
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(16);

    doc.text(
      'Placement24/7 - Lead Management Report',
      14,
      20
    );

    doc.setFontSize(10);

    doc.text(
      `Generated: ${new Date().toLocaleDateString()} | Total Leads: ${leads.length}`,
      14,
      28
    );

    let y = 38;

    doc.setFontSize(8);

    doc.text(
      'Lead ID | Date | Name | Product | Telecaller | Status',
      14,
      y
    );

    doc.line(
      14,
      y + 2,
      196,
      y + 2
    );

    y += 8;

    leads.slice(0, 50).forEach(
      (lead) => {
        if (y > 280) {
          doc.addPage();
          y = 20;
        }

        const line = `${lead.id} | ${lead.date} | ${lead.name.substring(
          0,
          15
        )} | ${lead.product} | ${lead.assignedTelecaller} | ${lead.status}`;

        doc.text(line, 14, y);

        y += 6;
      }
    );

    doc.save(
      `Placement247_Leads_Report_${
        new Date()
          .toISOString()
          .split('T')[0]
      }.pdf`
    );
  };

  // =========================================================
  // METRICS
  // =========================================================

  const todayStr =
    new Date()
      .toISOString()
      .split('T')[0];

  const totalLeads = leads.length;

  const todayLeads = leads.filter(
    (lead) =>
      lead.date === todayStr
  ).length;

  const interestedLeads =
    leads.filter(
      (lead) =>
        lead.status ===
          'Interested' ||
        lead.status ===
          'Documents Received'
    ).length;

  const followUpPending =
    leads.filter(
      (lead) =>
        lead.status ===
          'Follow-up' ||
        lead.status ===
          'Callback Later' ||
        lead.status ===
          'Verification Pending'
    ).length;

  const convertedLeads =
    leads.filter(
      (lead) =>
        lead.status ===
          'Completed' ||
        lead.status ===
          'Account Opened' ||
        lead.status ===
          'Credit Card Approved' ||
        lead.status ===
          'Loan Approved'
    ).length;

  const notInterestedLeads =
    leads.filter(
      (lead) =>
        lead.status ===
          'Not Interested' ||
        lead.status ===
          'Wrong Number'
    ).length;

  // =========================================================
  // FILTER
  // =========================================================

  const filteredLeads =
    leads.filter((lead) => {
      const matchesStatus =
        statusFilter === 'All' ||
        lead.status === statusFilter;

      const matchesTelecaller =
        selectedTelecallerFilter ===
          'All' ||
        lead.assignedTelecaller ===
          selectedTelecallerFilter;

      const query =
        searchQuery
          .trim()
          .toLowerCase();

      const matchesQuery =
        query === '' ||
        lead.name
          .toLowerCase()
          .includes(query) ||
        lead.mobile.includes(query) ||
        lead.id
          .toLowerCase()
          .includes(query) ||
        lead.district
          .toLowerCase()
          .includes(query) ||
        lead.state
          .toLowerCase()
          .includes(query);

      return (
        matchesStatus &&
        matchesTelecaller &&
        matchesQuery
      );
    });

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}

        <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 rounded-2xl bg-amber-400 flex items-center justify-center">
              <Lock className="w-6 h-6 text-slate-950" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">

                <h1 className="text-xl font-bold font-serif">
                  Placement24/7 Admin Control Panel
                </h1>

                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Full Access
                </span>

              </div>

              <p className="text-xs text-slate-400 mt-1">
                Master CRM, Telecaller Assignment & Google Sheets Sync Management
              </p>
            </div>

          </div>

          <div className="flex flex-wrap gap-2">

            <button
              onClick={() =>
                setShowGoogleSheetsModal(true)
              }
              className="px-3 py-2 bg-slate-800 text-emerald-300 rounded-xl border border-slate-700 text-xs font-semibold flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Google Sheets Sync
            </button>

            <button
              onClick={fetchData}
              className="p-2 bg-slate-800 text-slate-300 rounded-xl border border-slate-700"
              title="Refresh"
            >
              <RefreshCw
                className={`w-4 h-4 ${
                  loading
                    ? 'animate-spin'
                    : ''
                }`}
              />
            </button>

            <button
              onClick={onLogout}
              className="px-4 py-2 bg-rose-950/60 text-rose-300 rounded-xl border border-rose-800/50 text-xs font-semibold flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>

          </div>

        </div>

        {/* NAVIGATION */}

        <div className="flex gap-2 border-b border-slate-800 pb-2 overflow-x-auto">

          {[
            {
              id: 'overview',
              label: 'Executive Dashboard',
              icon: BarChart3,
            },
            {
              id: 'all-leads',
              label: `All Leads Master (${leads.length})`,
              icon: Users,
            },
            {
              id: 'telecallers',
              label: `Telecallers (${telecallers.length})`,
              icon: UserPlus,
            },
            {
              id: 'hr',
              label: `HR & Staff (${employees.length})`,
              icon: Briefcase,
            },
            {
              id: 'recruitment',
              label: `Recruitment (${candidates.length})`,
              icon: UserCheck,
            },
            {
              id: 'reports',
              label: 'Reports & Analytics',
              icon: FileText,
            },
            {
              id: 'settings',
              label: 'System Settings',
              icon: Settings,
            },
          ].map((tab) => {

            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id as any
                  )
                }
                className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-amber-400 text-slate-950'
                    : 'bg-slate-900 text-slate-300 border border-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}

        </div>

        {/* ================================================= */}
        {/* OVERVIEW */}
        {/* ================================================= */}

        {activeTab === 'overview' && (
          <div className="space-y-6">

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

              {[
                [
                  'Total Leads',
                  totalLeads,
                  '100% Captured',
                  'text-white',
                ],
                [
                  "Today's Leads",
                  todayLeads,
                  'New Submissions',
                  'text-amber-400',
                ],
                [
                  'Interested Leads',
                  interestedLeads,
                  'In Progress',
                  'text-blue-400',
                ],
                [
                  'Follow-up Pending',
                  followUpPending,
                  'Scheduled Calls',
                  'text-purple-400',
                ],
                [
                  'Converted Leads',
                  convertedLeads,
                  'Sanctioned / Opened',
                  'text-emerald-400',
                ],
                [
                  'Not Interested',
                  notInterestedLeads,
                  'Closed / Dropped',
                  'text-rose-400',
                ],
              ].map(
                ([
                  title,
                  value,
                  subtitle,
                  color,
                ]) => (

                  <div
                    key={String(title)}
                    className="bg-slate-900 p-4 rounded-2xl border border-slate-800"
                  >
                    <span className="text-[11px] text-slate-400">
                      {title}
                    </span>

                    <div
                      className={`text-2xl font-black font-serif ${color}`}
                    >
                      {value}
                    </div>

                    <span className="text-[10px] text-slate-400">
                      {subtitle}
                    </span>
                  </div>

                )
              )}

            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row justify-between gap-4">

              <div>
                <h3 className="font-bold font-serif">
                  Quick Reports Export
                </h3>

                <p className="text-xs text-slate-400">
                  Export complete master lead records.
                </p>
              </div>

              <div className="flex gap-3">

                <button
                  onClick={handleExportExcel}
                  className="px-4 py-2 bg-emerald-600 rounded-xl text-xs font-bold flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  Export Excel
                </button>

                <button
                  onClick={handleExportPDF}
                  className="px-4 py-2 bg-rose-700 rounded-xl text-xs font-bold flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Export PDF
                </button>

              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

              <div className="flex justify-between mb-4">

                <h3 className="font-bold font-serif">
                  Recent Lead Registrations
                </h3>

                <button
                  onClick={() =>
                    setActiveTab(
                      'all-leads'
                    )
                  }
                  className="text-xs text-amber-400"
                >
                  View All Leads →
                </button>

              </div>

              <div className="overflow-x-auto">

                <table className="w-full text-left text-xs">

                  <thead className="bg-slate-950 text-slate-400">
                    <tr>
                      <th className="p-3">
                        Lead ID
                      </th>
                      <th className="p-3">
                        Date
                      </th>
                      <th className="p-3">
                        Name
                      </th>
                      <th className="p-3">
                        Mobile
                      </th>
                      <th className="p-3">
                        Product
                      </th>
                      <th className="p-3">
                        Telecaller
                      </th>
                      <th className="p-3">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>

                    {leads
                      .slice(0, 5)
                      .map((lead) => (

                        <tr
                          key={lead.id}
                          className="border-t border-slate-800"
                        >
                          <td className="p-3 text-amber-400">
                            {lead.id}
                          </td>

                          <td className="p-3">
                            {lead.date}{' '}
                            {lead.time}
                          </td>

                          <td className="p-3 font-semibold">
                            {lead.name}
                          </td>

                          <td className="p-3">
                            {lead.mobile}
                          </td>

                          <td className="p-3 text-amber-300">
                            {lead.product}
                          </td>

                          <td className="p-3">
                            {lead.assignedTelecaller}
                          </td>

                          <td className="p-3">
                            {lead.status}
                          </td>
                        </tr>

                      ))}

                  </tbody>

                </table>

              </div>
            </div>

          </div>
        )}

        {/* ================================================= */}
        {/* ALL LEADS */}
        {/* ================================================= */}

        {activeTab === 'all-leads' && (
          <div className="space-y-4">

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col lg:flex-row gap-4">

              <div className="relative flex-1">

                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />

                <input
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(
                      e.target.value
                    )
                  }
                  placeholder="Search Lead ID, Name, Mobile, District..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs"
                />

              </div>

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs"
              >
                <option value="All">
                  All Statuses
                </option>

                {LEAD_STATUS_LIST.map(
                  (status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  )
                )}

              </select>

              <select
                value={
                  selectedTelecallerFilter
                }
                onChange={(e) =>
                  setSelectedTelecallerFilter(
                    e.target.value
                  )
                }
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs"
              >
                <option value="All">
                  All Telecallers
                </option>

                {telecallers.map(
                  (tc) => (
                    <option
                      key={tc.id}
                      value={tc.name}
                    >
                      {tc.name}
                    </option>
                  )
                )}

              </select>

            </div>

            <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 justify-between">

              <span className="text-xs">
                Selected:{' '}
                <strong className="text-amber-400">
                  {selectedLeadIds.length}
                </strong>
              </span>

              <div className="flex gap-2">

                <select
                  value={
                    batchAssignTelecaller
                  }
                  onChange={(e) =>
                    setBatchAssignTelecaller(
                      e.target.value
                    )
                  }
                  className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs"
                >
                  <option value="">
                    -- Select Telecaller --
                  </option>

                  {telecallers.map(
                    (tc) => (
                      <option
                        key={tc.id}
                        value={tc.name}
                      >
                        {tc.name}
                      </option>
                    )
                  )}

                </select>

                <button
                  onClick={
                    handleBatchReassign
                  }
                  className="px-4 py-2 bg-amber-400 text-slate-950 rounded-xl text-xs font-bold"
                >
                  Reassign
                </button>

              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

              <div className="overflow-x-auto">

                <table className="w-full text-left text-xs">

                  <thead className="bg-slate-950 text-slate-400">

                    <tr>
                      <th className="p-3">
                        ✓
                      </th>
                      <th className="p-3">
                        Lead ID
                      </th>
                      <th className="p-3">
                        Date
                      </th>
                      <th className="p-3">
                        Name
                      </th>
                      <th className="p-3">
                        Mobile
                      </th>
                      <th className="p-3">
                        Product
                      </th>
                      <th className="p-3">
                        Location
                      </th>
                      <th className="p-3">
                        Telecaller
                      </th>
                      <th className="p-3">
                        Status
                      </th>
                      <th className="p-3">
                        Action
                      </th>
                    </tr>

                  </thead>

                  <tbody>

                    {filteredLeads.map(
                      (lead) => (

                        <tr
                          key={lead.id}
                          className="border-t border-slate-800"
                        >

                          <td className="p-3">

                            <input
                              type="checkbox"
                              checked={selectedLeadIds.includes(
                                lead.id
                              )}
                              onChange={(e) => {

                                if (
                                  e.target
                                    .checked
                                ) {
                                  setSelectedLeadIds(
                                    (prev) => [
                                      ...prev,
                                      lead.id,
                                    ]
                                  );
                                } else {
                                  setSelectedLeadIds(
                                    (prev) =>
                                      prev.filter(
                                        (id) =>
                                          id !==
                                          lead.id
                                      )
                                  );
                                }

                              }}
                            />

                          </td>

                          <td className="p-3 text-amber-400">
                            {lead.id}
                          </td>

                          <td className="p-3">
                            {lead.date}
                          </td>

                          <td className="p-3 font-semibold">
                            {lead.name}
                          </td>

                          <td className="p-3">
                            {lead.mobile}
                          </td>

                          <td className="p-3 text-amber-300">
                            {lead.product}
                          </td>

                          <td className="p-3">
                            {lead.district},{' '}
                            {lead.state}
                          </td>

                          <td className="p-3">
                            {lead.assignedTelecaller}
                          </td>

                          <td className="p-3">
                            {lead.status}
                          </td>

                          <td className="p-3">

                            <button
                              onClick={() =>
                                handleDeleteLead(
                                  lead.id
                                )
                              }
                              className="p-2 text-rose-400 bg-rose-950/40 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

                {filteredLeads.length ===
                  0 && (
                  <div className="p-10 text-center text-slate-500 text-sm">
                    No leads found.
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

        {/* ================================================= */}
        {/* TELECALLERS */}
        {/* ================================================= */}

        {activeTab === 'telecallers' && (
          <div className="space-y-6">

            <div className="flex flex-col sm:flex-row justify-between gap-3">

              <div>

                <h3 className="text-base font-bold font-serif">
                  Telecaller Performance & Staff Management
                </h3>

                <p className="text-xs text-slate-400">
                  Manage telecaller accounts and lead performance.
                </p>

              </div>

              <button
                onClick={() =>
                  setShowAddTelecallerModal(
                    true
                  )
                }
                className="px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add New Telecaller
              </button>

            </div>

            {telecallers.length ===
            0 ? (

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">

                <UserPlus className="w-10 h-10 mx-auto text-slate-600 mb-3" />

                <p className="text-slate-400 text-sm">
                  No telecallers found.
                </p>

                <button
                  onClick={() =>
                    setShowAddTelecallerModal(
                      true
                    )
                  }
                  className="mt-4 px-4 py-2 bg-amber-400 text-slate-950 rounded-xl text-xs font-bold"
                >
                  Add First Telecaller
                </button>

              </div>

            ) : (

              <div className="grid md:grid-cols-3 gap-6">

                {telecallers.map(
                  (tc) => {

                    const assigned =
                      leads.filter(
                        (lead) =>
                          lead.assignedTelecaller ===
                          tc.name
                      );

                    const completed =
                      assigned.filter(
                        (lead) =>
                          lead.status ===
                            'Completed' ||
                          lead.status ===
                            'Account Opened' ||
                          lead.status ===
                            'Credit Card Approved' ||
                          lead.status ===
                            'Loan Approved'
                      );

                    const rate =
                      assigned.length >
                      0
                        ? Math.round(
                            (completed.length /
                              assigned.length) *
                              100
                          )
                        : 0;

                    return (

                      <div
                        key={tc.id}
                        className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
                      >

                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold">
                            {tc.name?.charAt(
                              0
                            ) || 'T'}
                          </div>

                          <div>

                            <h4 className="font-bold">
                              {tc.name}
                            </h4>

                            <p className="text-[11px] text-slate-400">
                              Username:{' '}
                              {tc.username}
                            </p>

                          </div>

                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-4 bg-slate-950 p-3 rounded-xl text-center">

                          <div>
                            <span className="text-[10px] text-slate-500">
                              Assigned
                            </span>

                            <div className="font-bold">
                              {assigned.length}
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] text-slate-500">
                              Converted
                            </span>

                            <div className="font-bold text-emerald-400">
                              {completed.length}
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] text-slate-500">
                              Rate
                            </span>

                            <div className="font-bold text-amber-400">
                              {rate}%
                            </div>
                          </div>

                        </div>

                      </div>

                    );
                  }
                )}

              </div>

            )}

          </div>
        )}

        {/* ================================================= */}
        {/* HR */}
        {/* ================================================= */}

        {activeTab === 'hr' && (

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto">

            <div className="p-5">

              <h3 className="font-bold font-serif">
                HR Management & Employee Directory
              </h3>

            </div>

            <table className="w-full text-left text-xs">

              <thead className="bg-slate-950 text-slate-400">

                <tr>
                  <th className="p-3">
                    Emp ID
                  </th>
                  <th className="p-3">
                    Name
                  </th>
                  <th className="p-3">
                    Role
                  </th>
                  <th className="p-3">
                    Department
                  </th>
                  <th className="p-3">
                    Salary
                  </th>
                  <th className="p-3">
                    Attendance
                  </th>
                  <th className="p-3">
                    Status
                  </th>
                </tr>

              </thead>

              <tbody>

                {employees.map(
                  (employee) => (

                    <tr
                      key={employee.id}
                      className="border-t border-slate-800"
                    >

                      <td className="p-3 text-amber-400">
                        {employee.id}
                      </td>

                      <td className="p-3 font-semibold">
                        {employee.name}
                      </td>

                      <td className="p-3">
                        {employee.role}
                      </td>

                      <td className="p-3">
                        {employee.department}
                      </td>

                      <td className="p-3 text-emerald-400">
                        {employee.salary}
                      </td>

                      <td className="p-3">
                        {employee.attendance}
                      </td>

                      <td className="p-3 text-emerald-400">
                        {employee.status}
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

        {/* ================================================= */}
        {/* RECRUITMENT */}
        {/* ================================================= */}

        {activeTab === 'recruitment' && (

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto">

            <div className="p-5">

              <h3 className="font-bold font-serif">
                Recruitment & Candidate Portal
              </h3>

            </div>

            <table className="w-full text-left text-xs">

              <thead className="bg-slate-950 text-slate-400">

                <tr>
                  <th className="p-3">
                    Candidate ID
                  </th>
                  <th className="p-3">
                    Name
                  </th>
                  <th className="p-3">
                    Position
                  </th>
                  <th className="p-3">
                    Mobile
                  </th>
                  <th className="p-3">
                    Status
                  </th>
                  <th className="p-3">
                    Action
                  </th>
                </tr>

              </thead>

              <tbody>

                {candidates.map(
                  (candidate) => (

                    <tr
                      key={candidate.id}
                      className="border-t border-slate-800"
                    >

                      <td className="p-3 text-amber-400">
                        {candidate.id}
                      </td>

                      <td className="p-3 font-semibold">
                        {candidate.name}
                      </td>

                      <td className="p-3 text-amber-300">
                        {candidate.post}
                      </td>

                      <td className="p-3">
                        {candidate.mobile}
                      </td>

                      <td className="p-3">
                        {candidate.status}
                      </td>

                      <td className="p-3">

                        <button
                          onClick={() =>
                            setOfferModalCandidate(
                              candidate
                            )
                          }
                          className="px-3 py-2 bg-amber-400 text-slate-950 rounded-lg text-[11px] font-bold flex items-center gap-1"
                        >
                          <FileText className="w-3 h-3" />
                          Offer Letter
                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

        {/* ================================================= */}
        {/* REPORTS */}
        {/* ================================================= */}

        {activeTab === 'reports' && (

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h3 className="text-lg font-bold font-serif mb-5">
              Reports & Analytics
            </h3>

            <div className="grid md:grid-cols-3 gap-5">

              <div className="bg-slate-950 p-5 rounded-xl">

                <span className="text-xs text-amber-400">
                  Daily Report
                </span>

                <div className="text-2xl font-bold mt-2">
                  {todayLeads}
                </div>

                <p className="text-xs text-slate-400">
                  New leads today
                </p>

              </div>

              <div className="bg-slate-950 p-5 rounded-xl">

                <span className="text-xs text-amber-400">
                  Total Registered
                </span>

                <div className="text-2xl font-bold mt-2">
                  {totalLeads}
                </div>

                <p className="text-xs text-slate-400">
                  Total CRM leads
                </p>

              </div>

              <div className="bg-slate-950 p-5 rounded-xl">

                <span className="text-xs text-amber-400">
                  Converted
                </span>

                <div className="text-2xl font-bold text-emerald-400 mt-2">
                  {convertedLeads}
                </div>

                <p className="text-xs text-slate-400">
                  Approved / opened
                </p>

              </div>

            </div>

          </div>

        )}

        {/* ================================================= */}
        {/* SETTINGS */}
        {/* ================================================= */}

        {activeTab === 'settings' && (

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">

            <div>

              <h3 className="font-bold font-serif">
                System & Company Configuration
              </h3>

              <p className="text-xs text-slate-400">
                Manage company information and integrations.
              </p>

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <div>

                <label className="text-xs text-slate-300">
                  Company Name
                </label>

                <input
                  value={config.companyName}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      companyName:
                        e.target.value,
                    })
                  }
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm"
                />

              </div>

              <div>

                <label className="text-xs text-slate-300">
                  Support Phone
                </label>

                <input
                  value={
                    config.contactPhone
                  }
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      contactPhone:
                        e.target.value,
                    })
                  }
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm"
                />

              </div>

              <div>

                <label className="text-xs text-slate-300">
                  WhatsApp
                </label>

                <input
                  value={
                    config.whatsappPhone
                  }
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      whatsappPhone:
                        e.target.value,
                    })
                  }
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm"
                />

              </div>

              <div>

                <label className="text-xs text-slate-300">
                  Email
                </label>

                <input
                  value={config.email}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      email: e.target.value,
                    })
                  }
                  className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm"
                />

              </div>

            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800">

              <button
                onClick={() =>
                  setShowGoogleSheetsModal(
                    true
                  )
                }
                className="px-4 py-2 bg-emerald-600 rounded-xl text-xs font-bold flex items-center gap-2"
              >
                <FileSpreadsheet className="w-4 h-4" />
                Google Sheets
              </button>

              <button
                onClick={() =>
                  alert(
                    'Settings updated successfully!'
                  )
                }
                className="px-5 py-2 bg-amber-400 text-slate-950 rounded-xl text-xs font-bold"
              >
                Save Settings
              </button>

            </div>

          </div>

        )}

      </div>

      {/* ===================================================== */}
      {/* ADD TELECALLER MODAL */}
      {/* ===================================================== */}

      {showAddTelecallerModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">

          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-md w-full p-6 shadow-2xl">

            <div className="flex items-center justify-between mb-5">

              <div>

                <h3 className="text-lg font-bold font-serif">
                  Add Telecaller Account
                </h3>

                <p className="text-[11px] text-slate-400 mt-1">
                  Create a new telecaller login account.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowAddTelecallerModal(
                    false
                  )
                }
                className="text-slate-400 hover:text-white text-xl"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={
                handleAddTelecaller
              }
              className="space-y-4"
            >

              {/* NAME */}

              <div>

                <label className="block text-xs text-slate-300 mb-1">
                  Full Name *
                </label>

                <input
                  type="text"
                  required
                  value={newTcData.name}
                  onChange={(e) =>
                    setNewTcData({
                      ...newTcData,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. Vikram Joshi"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-amber-400"
                />

              </div>

              {/* USERNAME */}

              <div>

                <label className="block text-xs text-slate-300 mb-1">
                  Username *
                </label>

                <input
                  type="text"
                  required
                  value={
                    newTcData.username
                  }
                  onChange={(e) =>
                    setNewTcData({
                      ...newTcData,
                      username:
                        e.target.value
                          .toLowerCase()
                          .replace(
                            /\s/g,
                            ''
                          ),
                    })
                  }
                  placeholder="e.g. vikram"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-amber-400"
                />

              </div>

              {/* PASSWORD */}

              <div>

                <label className="block text-xs text-slate-300 mb-1">
                  Password *
                </label>

                <input
                  type="password"
                  value={
                    newTcData.password
                  }
                  onChange={(e) =>
                    setNewTcData({
                      ...newTcData,
                      password:
                        e.target.value,
                    })
                  }
                  placeholder="Default: telecaller123"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-amber-400"
                />

                <p className="text-[10px] text-slate-500 mt-1">
                  Leave empty to use:
                  telecaller123
                </p>

              </div>

              {/* PHONE */}

              <div>

                <label className="block text-xs text-slate-300 mb-1">
                  Phone
                </label>

                <input
                  type="text"
                  value={newTcData.phone}
                  onChange={(e) =>
                    setNewTcData({
                      ...newTcData,
                      phone: e.target.value,
                    })
                  }
                  placeholder="Optional"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-amber-400"
                />

              </div>

              {/* EMAIL */}

              <div>

                <label className="block text-xs text-slate-300 mb-1">
                  Email
                </label>

                <input
                  type="email"
                  value={newTcData.email}
                  onChange={(e) =>
                    setNewTcData({
                      ...newTcData,
                      email: e.target.value,
                    })
                  }
                  placeholder="Optional"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-amber-400"
                />

              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-2 pt-3">

                <button
                  type="button"
                  onClick={() =>
                    setShowAddTelecallerModal(
                      false
                    )
                  }
                  disabled={
                    addingTelecaller
                  }
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={
                    addingTelecaller
                  }
                  className="px-5 py-2 bg-amber-400 text-slate-950 font-bold rounded-xl text-xs disabled:opacity-50"
                >
                  {addingTelecaller
                    ? 'Creating...'
                    : 'Create Telecaller'}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* ===================================================== */}
      {/* OFFER LETTER */}
      {/* ===================================================== */}

      {offerModalCandidate && (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90">

          <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-lg w-full p-6">

            <div className="flex justify-between border-b border-slate-800 pb-3">

              <h3 className="font-bold font-serif flex items-center gap-2">

                <Award className="w-5 h-5 text-amber-400" />

                Offer Letter

              </h3>

              <button
                onClick={() =>
                  setOfferModalCandidate(
                    null
                  )
                }
                className="text-slate-400"
              >
                ×
              </button>

            </div>

            <div className="bg-slate-950 p-5 rounded-xl mt-4 text-sm leading-7">

              <p className="font-bold text-amber-300">
                PLACEMENT24/7
              </p>

              <p className="text-slate-400 text-xs">
                Date:{' '}
                {new Date().toLocaleDateString()}
              </p>

              <p className="mt-4">
                Dear{' '}
                <strong>
                  {
                    offerModalCandidate.name
                  }
                </strong>
                ,
              </p>

              <p className="mt-2">
                We are pleased to offer you
                the position of{' '}
                <strong>
                  {
                    offerModalCandidate.post
                  }
                </strong>
                .
              </p>

              <p className="mt-3">
                Monthly Compensation:
                ₹22,000 - ₹28,000 +
                Performance Incentives
              </p>

            </div>

            <div className="flex justify-end mt-4">

              <button
                onClick={() => {

                  alert(
                    `Offer letter prepared for ${offerModalCandidate.name}.`
                  );

                  setOfferModalCandidate(
                    null
                  );

                }}
                className="px-5 py-2 bg-amber-400 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                Issue Offer Letter
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ===================================================== */}
      {/* GOOGLE SHEETS */}
      {/* ===================================================== */}

      {showGoogleSheetsModal && (

        <GoogleSheetsModal
          currentUrl={
            config.googleSheetsWebhookUrl
          }
          autoSync={
            config.autoSyncGoogleSheets
          }
          onSaveConfig={
            handleSaveGoogleSheetsConfig
          }
          onClose={() =>
            setShowGoogleSheetsModal(
              false
            )
          }
        />

      )}

    </div>
  );
};

export default AdminPortal;
