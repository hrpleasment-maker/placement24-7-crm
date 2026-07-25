import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { Lead, LeadStatus, TelecallerUser, AppConfig } from './src/types';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory application storage with initial seed data
let appConfig: AppConfig = {
  googleSheetsWebhookUrl: '',
  autoSyncGoogleSheets: true,
  companyName: 'Placement24/7',
  contactPhone: '+91 98765 43210',
  whatsappPhone: '+91 98765 43210',
  email: 'support@placement247.com',
  address: 'Plot 45, Finance Towers, Sector 18, Cyber City, Gurugram, Haryana - 122002',
};

let telecallers: TelecallerUser[] = [
  {
    id: 'tc-1',
    name: 'Rahul Sharma',
    email: 'rahul@placement247.com',
    phone: '+91 98123 45678',
    username: 'rahul',
    password: 'telecaller123',
  },
  {
    id: 'tc-2',
    name: 'Priya Singh',
    email: 'priya@placement247.com',
    phone: '+91 98234 56789',
    username: 'priya',
    password: 'telecaller123',
  },
  {
    id: 'tc-3',
    name: 'Amit Kumar',
    email: 'amit@placement247.com',
    phone: '+91 98345 67890',
    username: 'amit',
    password: 'telecaller123',
  },
];

let leadCounter = 1001;

const todayStr = new Date().toISOString().split('T')[0];
const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];

let leads: Lead[] = [
  {
    id: 'P247-20260724-1001',
    date: todayStr,
    time: '09:30 AM',
    name: 'Vikram Malhotra',
    mobile: '9876512340',
    whatsapp: '9876512340',
    email: 'vikram.m@gmail.com',
    district: 'Gurugram',
    state: 'Haryana',
    address: 'Flat 402, Oakwood Heights, DLF Phase 5',
    product: 'Personal Loan',
    message: 'Need ₹10 Lakh personal loan for medical emergency in family.',
    assignedTelecaller: 'Rahul Sharma',
    assignedTelecallerId: 'tc-1',
    status: 'Interested',
    nextFollowUpDate: '2026-07-26',
    remarks: 'Salary slip verified. Income ₹85,000/month. CIBIL 760. Requested document pick up.',
    lastUpdated: new Date().toISOString(),
    updatedBy: 'Rahul Sharma',
  },
  {
    id: 'P247-20260724-1002',
    date: todayStr,
    time: '10:15 AM',
    name: 'Ananya Deshmukh',
    mobile: '9811223344',
    whatsapp: '9811223344',
    email: 'ananya.d@outlook.com',
    district: 'Mumbai Suburban',
    state: 'Maharashtra',
    address: 'B-12, Green Park Society, Andheri West',
    product: 'Credit Card',
    message: 'Looking for lifetime free credit card with airport lounge benefits.',
    assignedTelecaller: 'Priya Singh',
    assignedTelecallerId: 'tc-2',
    status: 'Documents Received',
    nextFollowUpDate: '2026-07-25',
    remarks: 'Received PAN, Aadhaar and 3 months salary slip. Forwarded to card approval team.',
    lastUpdated: new Date().toISOString(),
    updatedBy: 'Priya Singh',
  },
  {
    id: 'P247-20260724-1003',
    date: todayStr,
    time: '11:00 AM',
    name: 'Rajesh Verma',
    mobile: '9988776655',
    whatsapp: '9988776655',
    email: 'rajesh.traders@yahoo.in',
    district: 'Ahmedabad',
    state: 'Gujarat',
    address: '104, Trade Centre, CG Road',
    product: 'Business Loan',
    message: 'Need working capital loan ₹25 Lakhs for stock expansion.',
    assignedTelecaller: 'Amit Kumar',
    assignedTelecallerId: 'tc-3',
    status: 'Verification Pending',
    nextFollowUpDate: '2026-07-27',
    remarks: 'GST returns and 2 years ITR collected. Business address verification scheduled.',
    lastUpdated: new Date().toISOString(),
    updatedBy: 'Amit Kumar',
  },
  {
    id: 'P247-20260724-1004',
    date: yesterdayStr,
    time: '02:45 PM',
    name: 'Suresh Babu',
    mobile: '9744332211',
    whatsapp: '9744332211',
    email: 'sureshbabu.s@gmail.com',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    address: '56, 4th Cross, Indiranagar',
    product: 'Home Loan',
    message: 'Planning flat purchase in Whitefield. Loan requirement ₹60 Lakhs.',
    assignedTelecaller: 'Rahul Sharma',
    assignedTelecallerId: 'tc-1',
    status: 'Follow-up',
    nextFollowUpDate: '2026-07-25',
    remarks: 'Discussed interest rate (8.4%). Client requested loan EMI calculation breakdown.',
    lastUpdated: new Date().toISOString(),
    updatedBy: 'Rahul Sharma',
  },
  {
    id: 'P247-20260724-1005',
    date: yesterdayStr,
    time: '04:20 PM',
    name: 'Pooja Rani',
    mobile: '9866554433',
    whatsapp: '9866554433',
    email: 'pooja.rani@gmail.com',
    district: 'Patna',
    state: 'Bihar',
    address: 'House No 12, Boring Road',
    product: 'Telecaller Jobs',
    message: 'Graduate candidate searching for work from home telecalling job.',
    assignedTelecaller: 'Priya Singh',
    assignedTelecallerId: 'tc-2',
    status: 'Completed',
    nextFollowUpDate: '',
    remarks: 'Interview cleared. Joining letter issued for Placement24/7 Outbound Team.',
    lastUpdated: new Date().toISOString(),
    updatedBy: 'Priya Singh',
  },
  {
    id: 'P247-20260724-1006',
    date: yesterdayStr,
    time: '05:10 PM',
    name: 'Manoj Reddy',
    mobile: '9123456780',
    whatsapp: '9123456780',
    email: 'manojreddy.tech@gmail.com',
    district: 'Hyderabad',
    state: 'Telangana',
    address: 'Phase 2, HITEC City',
    product: 'Savings Account',
    message: 'Want digital zero balance account with free UPI and debit card.',
    assignedTelecaller: 'Rahul Sharma',
    assignedTelecallerId: 'tc-1',
    status: 'Account Opened',
    nextFollowUpDate: '',
    remarks: 'Video KYC completed successfully. Savings Account active.',
    lastUpdated: new Date().toISOString(),
    updatedBy: 'Rahul Sharma',
  },
  {
    id: 'P247-20260724-1007',
    date: todayStr,
    time: '12:40 PM',
    name: 'Sunil Mehta',
    mobile: '9898989898',
    whatsapp: '9898989898',
    email: 'sunil.m@gmail.com',
    district: 'Jaipur',
    state: 'Rajasthan',
    address: 'C-Scheme, Near Statue Circle',
    product: 'Demat Account',
    message: 'Interested in zero brokerage equity trading demat account.',
    assignedTelecaller: 'Amit Kumar',
    assignedTelecallerId: 'tc-3',
    status: 'New Lead',
    nextFollowUpDate: '2026-07-25',
    remarks: 'Fresh lead submitted via website.',
    lastUpdated: new Date().toISOString(),
    updatedBy: 'System',
  }
];

// Helper to trigger Google Apps Script Webhook
async function triggerGoogleSheetsSync(action: string, payload: any) {
  if (!appConfig.googleSheetsWebhookUrl || !appConfig.autoSyncGoogleSheets) {
    return;
  }
  try {
    // Fire and forget to avoid delaying Express API response
    fetch(appConfig.googleSheetsWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, data: payload, timestamp: new Date().toISOString() }),
    }).catch(err => {
      console.error('Google Sheets Webhook sync error:', err.message);
    });
  } catch (err: any) {
    console.error('Failed to trigger Google Sheets Webhook:', err.message);
  }
}

// REST API ROUTES

// Auth endpoint
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin123') {
    return res.json({
      success: true,
      user: {
        id: 'admin-1',
        name: 'Super Admin',
        email: 'admin@placement247.com',
        role: 'admin',
        username: 'admin',
      }
    });
  }

  const telecaller = telecallers.find(
    t => (t.username.toLowerCase() === username.toLowerCase() || t.email.toLowerCase() === username.toLowerCase()) && t.password === password
  );

  if (telecaller) {
    return res.json({
      success: true,
      user: {
        id: telecaller.id,
        name: telecaller.name,
        email: telecaller.email,
        phone: telecaller.phone,
        role: 'telecaller',
        username: telecaller.username,
      }
    });
  }

  return res.status(401).json({ success: false, message: 'Invalid username or password' });
});

// Config GET & POST
app.get('/api/config/google-sheets', (req, res) => {
  res.json({ success: true, config: appConfig });
});

app.post('/api/config/google-sheets', (req, res) => {
  const { webhookUrl, autoSync } = req.body;
  if (webhookUrl !== undefined) appConfig.googleSheetsWebhookUrl = webhookUrl;
  if (autoSync !== undefined) appConfig.autoSyncGoogleSheets = autoSync;
  res.json({ success: true, config: appConfig });
});

// GET all telecallers
app.get('/api/telecallers', (req, res) => {
  // Enrich with lead counts
  const enriched = telecallers.map(t => {
    const assigned = leads.filter(l => l.assignedTelecaller === t.name || l.assignedTelecallerId === t.id);
    const completed = assigned.filter(l => l.status === 'Completed' || l.status === 'Account Opened' || l.status === 'Credit Card Approved' || l.status === 'Loan Approved');
    return {
      ...t,
      activeLeadsCount: assigned.length,
      completedLeadsCount: completed.length,
    };
  });
  res.json({ success: true, telecallers: enriched });
});

// Add or edit telecaller
app.post('/api/telecallers', (req, res) => {
  const { name, email, phone, username, password } = req.body;
  if (!name || !username) {
    return res.status(400).json({ success: false, message: 'Name and Username are required' });
  }

  const existingIndex = telecallers.findIndex(t => t.username.toLowerCase() === username.toLowerCase());
  if (existingIndex >= 0) {
    telecallers[existingIndex] = {
      ...telecallers[existingIndex],
      name,
      email: email || telecallers[existingIndex].email,
      phone: phone || telecallers[existingIndex].phone,
      password: password || telecallers[existingIndex].password,
    };
    return res.json({ success: true, telecaller: telecallers[existingIndex] });
  } else {
    const newTc: TelecallerUser = {
      id: `tc-${Date.now()}`,
      name,
      email: email || `${username}@placement247.com`,
      phone: phone || '+91 90000 00000',
      username,
      password: password || 'telecaller123',
    };
    telecallers.push(newTc);
    return res.json({ success: true, telecaller: newTc });
  }
});

// GET leads
app.get('/api/leads', (req, res) => {
  const { assignedTo, status, product, search } = req.query;

  let filtered = [...leads];

  if (assignedTo && typeof assignedTo === 'string') {
    filtered = filtered.filter(
      l => l.assignedTelecaller.toLowerCase() === assignedTo.toLowerCase() || l.assignedTelecallerId === assignedTo
    );
  }

  if (status && typeof status === 'string' && status !== 'All') {
    filtered = filtered.filter(l => l.status === status);
  }

  if (product && typeof product === 'string' && product !== 'All') {
    filtered = filtered.filter(l => l.product === product);
  }

  if (search && typeof search === 'string' && search.trim() !== '') {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter(
      l =>
        l.name.toLowerCase().includes(q) ||
        l.mobile.includes(q) ||
        l.id.toLowerCase().includes(q) ||
        l.district.toLowerCase().includes(q) ||
        l.state.toLowerCase().includes(q) ||
        l.product.toLowerCase().includes(q)
    );
  }

  // Sort by date/time descending
  filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());

  res.json({ success: true, leads: filtered, total: filtered.length });
});

// POST new Lead (Public Form)
app.post('/api/leads', (req, res) => {
  const {
    name,
    mobile,
    whatsapp,
    email,
    district,
    state,
    address,
    product,
    leadSource,
    preferredCallTime,
    message,
    allowDuplicate,
  } = req.body;

  if (!name || !mobile || !district || !state || !product) {
    return res.status(400).json({
      success: false,
      message: 'Name, Mobile Number, District, State, and Product Selection are required.',
    });
  }

  const cleanMobile = String(mobile).trim();

  // Duplicate mobile check
  const existingLead = leads.find(l => l.mobile === cleanMobile);
  if (existingLead && !allowDuplicate) {
    return res.status(409).json({
      success: false,
      isDuplicate: true,
      message: `A lead with mobile number ${cleanMobile} already exists (Lead ID: ${existingLead.id}, Status: ${existingLead.status}). Submit anyway as a new inquiry?`,
      existingLead,
    });
  }

  // Extract client IP and Device Info
  const clientIp = (req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || '127.0.0.1').split(',')[0];
  const userAgent = req.headers['user-agent'] || 'Web Browser';
  const isMobile = /mobile|android|iphone|ipad/i.test(userAgent);
  const deviceInfo = isMobile ? 'Mobile Device' : 'Desktop / Laptop';
  const browserInfo = userAgent.substring(0, 80);

  // Generate Lead ID
  leadCounter += 1;
  const dateObj = new Date();
  const yearStr = dateObj.getFullYear();
  const monthStr = String(dateObj.getMonth() + 1).padStart(2, '0');
  const dayStr = String(dateObj.getDate()).padStart(2, '0');
  const leadId = `P247-${yearStr}${monthStr}${dayStr}-${leadCounter}`;

  const dateFormatted = `${yearStr}-${monthStr}-${dayStr}`;
  const timeFormatted = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  // Auto-assign telecaller in round robin
  const assignedTc = telecallers[(leads.length) % telecallers.length];

  const newLead: Lead = {
    id: leadId,
    date: dateFormatted,
    time: timeFormatted,
    name,
    mobile: cleanMobile,
    whatsapp: whatsapp ? String(whatsapp).trim() : cleanMobile,
    email: email || '',
    district,
    state,
    address: address || '',
    product,
    leadSource: leadSource || 'Website Portal',
    preferredCallTime: preferredCallTime || 'Anytime (9 AM - 7 PM)',
    message: message || '',
    assignedTelecaller: assignedTc ? assignedTc.name : 'Unassigned',
    assignedTelecallerId: assignedTc ? assignedTc.id : undefined,
    status: 'New Lead',
    nextFollowUpDate: '',
    remarks: 'New lead submitted via website portal.',
    lastUpdated: new Date().toISOString(),
    updatedBy: 'System (Website Form)',
    ipAddress: clientIp,
    deviceInfo,
    browserInfo,
  };

  leads.unshift(newLead);

  // Trigger Google Sheets sync
  triggerGoogleSheetsSync('ADD_LEAD', newLead);

  res.status(201).json({
    success: true,
    message: 'Lead submitted successfully!',
    lead: newLead,
  });
});

// PUT update lead
app.put('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  const { status, remarks, nextFollowUpDate, assignedTelecaller, updatedBy } = req.body;

  const index = leads.findIndex(l => l.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Lead not found' });
  }

  const existing = leads[index];
  let updatedTcName = existing.assignedTelecaller;
  let updatedTcId = existing.assignedTelecallerId;

  if (assignedTelecaller) {
    const tcObj = telecallers.find(t => t.name === assignedTelecaller || t.id === assignedTelecaller);
    if (tcObj) {
      updatedTcName = tcObj.name;
      updatedTcId = tcObj.id;
    } else {
      updatedTcName = assignedTelecaller;
    }
  }

  const updatedLead: Lead = {
    ...existing,
    status: (status as LeadStatus) || existing.status,
    remarks: remarks !== undefined ? remarks : existing.remarks,
    nextFollowUpDate: nextFollowUpDate !== undefined ? nextFollowUpDate : existing.nextFollowUpDate,
    assignedTelecaller: updatedTcName,
    assignedTelecallerId: updatedTcId,
    lastUpdated: new Date().toISOString(),
    updatedBy: updatedBy || 'Telecaller',
  };

  leads[index] = updatedLead;

  // Trigger Google Sheets sync
  triggerGoogleSheetsSync('UPDATE_LEAD', updatedLead);

  res.json({ success: true, lead: updatedLead });
});

// POST batch reassign
app.post('/api/leads/batch-assign', (req, res) => {
  const { leadIds, telecallerName } = req.body;
  if (!Array.isArray(leadIds) || !telecallerName) {
    return res.status(400).json({ success: false, message: 'leadIds array and telecallerName are required' });
  }

  const tcObj = telecallers.find(t => t.name === telecallerName);

  leadIds.forEach(id => {
    const index = leads.findIndex(l => l.id === id);
    if (index >= 0) {
      leads[index].assignedTelecaller = tcObj ? tcObj.name : telecallerName;
      leads[index].assignedTelecallerId = tcObj ? tcObj.id : undefined;
      leads[index].lastUpdated = new Date().toISOString();
      leads[index].updatedBy = 'Admin (Batch Reassign)';
      triggerGoogleSheetsSync('UPDATE_LEAD', leads[index]);
    }
  });

  res.json({ success: true, count: leadIds.length, message: `Reassigned ${leadIds.length} leads to ${telecallerName}` });
});

// DELETE Lead (Admin)
app.delete('/api/leads/:id', (req, res) => {
  const { id } = req.params;
  const index = leads.findIndex(l => l.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Lead not found' });
  }
  const deleted = leads.splice(index, 1)[0];
  triggerGoogleSheetsSync('DELETE_LEAD', deleted);
  res.json({ success: true, message: 'Lead deleted' });
});

// Start server function
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Placement24/7 Backend & Vite Dev server running on http://localhost:${PORT}`);
  });
}

startServer();
