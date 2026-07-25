import { Product } from '../types';

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'savings-account',
    name: 'Savings Account',
    category: 'Banking',
    tagline: 'Zero balance & high-interest savings accounts with top national banks',
    description: 'Instant online savings account opening with zero minimum balance options, complimentary debit cards, and competitive interest rates up to 7.5% p.a. from top partner banks.',
    benefits: [
      'Instant digital onboarding in under 10 minutes',
      'Zero minimum balance maintenance options available',
      'Free platinum virtual and physical Debit Card',
      'High savings interest rate up to 7.5% per annum',
      'Free unlimited UPI transactions & net banking'
    ],
    eligibility: 'Resident Indian Citizens aged 18 years and above with valid Aadhaar & PAN Card.',
    requiredDocuments: [
      'Aadhaar Card (Mobile linked)',
      'PAN Card',
      'Address Proof (if different from Aadhaar)',
      'Passport size Photograph'
    ],
    iconName: 'Building2',
    badge: 'Popular'
  },
  {
    id: 'current-account',
    name: 'Current Account',
    category: 'Banking',
    tagline: 'Tailored business banking with high transaction limits & POS integration',
    description: 'Designed for proprietors, partnerships, private limited companies, and freelancers needing high daily transaction limits, multi-city banking, and seamless payment gateway integration.',
    benefits: [
      'Unlimited free cash deposit limits at branch network',
      'Complimentary corporate credit card & trade services',
      'Seamless integration with accounting tools & POS machines',
      'Customized cheque books and priority customer desk',
      'Zero balance maintenance options for active businesses'
    ],
    eligibility: 'Sole Proprietorship, Partnership Firm, LLP, Private Limited Company, or Self-Employed Professional.',
    requiredDocuments: [
      'GST Registration Certificate / Udyam Registration',
      'PAN Card of Business / Authorized Signatory',
      'Entity Registration Proof / Partnership Deed',
      'Current Address Proof & Bank Statements (6 months)'
    ],
    iconName: 'Briefcase',
    badge: 'Business'
  },
  {
    id: 'credit-card',
    name: 'Credit Card',
    category: 'Banking',
    tagline: 'Lifetime free credit cards with cashback, lounge access & rewards',
    description: 'Get instant pre-approved credit cards with limits up to ₹5,000,000. Enjoy airport lounge access, fuel surcharge waivers, and up to 10% instant cashback on shopping and travel.',
    benefits: [
      'Lifetime Free cards with no annual fee options',
      'Instant digital approval with video KYC',
      'Up to 10% cashback on Amazon, Flipkart & top brands',
      'Complimentary domestic & international airport lounge visits',
      'Convert purchases into flexible zero-cost EMIs'
    ],
    eligibility: 'Salaried individuals with min income of ₹20,000/month or Self-employed with ITR > ₹3.5 Lakhs.',
    requiredDocuments: [
      'PAN Card & Aadhaar Card',
      'Last 3 Months Salary Slips or Form 16',
      'Latest 6 Months Bank Statement'
    ],
    iconName: 'CreditCard',
    badge: 'High Value'
  },
  {
    id: 'personal-loan',
    name: 'Personal Loan',
    category: 'Loans',
    tagline: 'Instant collateral-free loans up to ₹25 Lakhs at low interest rates',
    description: 'Flexible instant personal loans for marriage, medical emergencies, home renovation, or debt consolidation. Sanction within 24 hours with minimum documentation.',
    benefits: [
      'Collateral-free instant loan up to ₹25,000,000',
      'Low interest rates starting from 10.49% p.a.',
      'Flexible repayment tenure from 12 to 72 months',
      'Quick disbursal directly into your bank account',
      'Zero hidden charges & transparent processing'
    ],
    eligibility: 'Salaried or Self-Employed individuals aged 21 to 60 years with minimum CIBIL score of 700+.',
    requiredDocuments: [
      'PAN Card & Aadhaar Card',
      'Salary Slips (Last 3 Months) or 2 Years ITR',
      'Bank Statement (Last 6 Months)',
      'Current Address Proof'
    ],
    iconName: 'Banknote',
    badge: 'Instant Disbursal'
  },
  {
    id: 'business-loan',
    name: 'Business Loan',
    category: 'Loans',
    tagline: 'Unsecured working capital loans up to ₹1 Crore for MSMEs & startups',
    description: 'Empower your business expansion, inventory purchase, or equipment upgrade with customized business financing. Fast approval without mortgaging property.',
    benefits: [
      'Unsecured financing up to ₹1,00,00,000',
      'Interest rates starting at 12.99% p.a.',
      'Overdraft facility options available',
      'Customized repayment options tailored to cash flow',
      'Quick approval within 48 working hours'
    ],
    eligibility: 'Businesses operating for at least 1.5+ years with minimum annual turnover of ₹15 Lakhs.',
    requiredDocuments: [
      'Business Registration & GST Returns (1 Year)',
      '2 Years Audited Financial Statements & ITR',
      '6 Months Bank Statement of Business Account',
      'Proprietor / Director KYC Documents'
    ],
    iconName: 'Building',
    badge: 'MSME Approved'
  },
  {
    id: 'home-loan',
    name: 'Home Loan',
    category: 'Loans',
    tagline: 'Achieve your dream home with low EMIs & long tenures up to 30 years',
    description: 'Hassle-free housing loans for flat purchase, plot construction, home expansion, or balance transfer with reduced interest rates and PMAY subsidy guidance.',
    benefits: [
      'Financing up to 90% of property cost',
      'Attractive interest rates starting from 8.35% p.a.',
      'Extended tenure up to 30 years for lower monthly EMIs',
      'Doorstep legal & technical property verification assistance',
      'Balance transfer facility with additional top-up loan'
    ],
    eligibility: 'Salaried & Self-Employed applicants aged 21 to 65 years with stable income source.',
    requiredDocuments: [
      'Identity & Address Proof (Aadhaar, PAN, Passport)',
      'Income Proof (Salary Slips / 3 Years ITR)',
      'Property Documents & Approved Construction Plan',
      'Bank Statements for the last 6 months'
    ],
    iconName: 'Home',
    badge: 'Low Rate'
  },
  {
    id: 'loan-against-property',
    name: 'Loan Against Property',
    category: 'Loans',
    tagline: 'Unlock maximum value from your residential or commercial property',
    description: 'High-value mortgage loan against residential, commercial, or industrial property to fund major business expansion, higher education, or commercial investments.',
    benefits: [
      'High loan amounts up to ₹10 Crores',
      'Competitive interest rates starting from 9.25% p.a.',
      'Flexible repayment tenure up to 15 years',
      'Continue utilizing your property normally',
      'Simple & hassle-free documentation process'
    ],
    eligibility: 'Property owners (Salaried or Self-Employed) with clear unencumbered title deeds.',
    requiredDocuments: [
      'Property Title Deeds, Chain Documents & Approved Plan',
      'KYC Documents of Property Owners & Co-applicants',
      'Income Proof & Bank Statements (6 Months)'
    ],
    iconName: 'Landmark',
    badge: 'High Amount'
  },
  {
    id: 'demat-account',
    name: 'Demat Account',
    category: 'Investment',
    tagline: 'Zero account opening fee & low brokerage for Stock & Mutual Fund trading',
    description: 'Open a 2-in-1 Demat & Trading account in under 5 minutes. Invest in Indian Stocks, Mutual Funds, IPOs, Gold Bonds, and F&O with top discount broker platforms.',
    benefits: [
      'Zero account opening charge & ₹0 AMC for 1st Year',
      '₹0 Brokerage on Equity Delivery investments',
      'Advanced charting tools, stock screeners & AI research reports',
      '1-Click instant application for IPOs & Sovereign Gold Bonds',
      'Direct Mutual Fund investment with zero commission'
    ],
    eligibility: 'Any individual aged 18+ with a valid Bank Account, Aadhaar, and PAN Card.',
    requiredDocuments: [
      'PAN Card',
      'Aadhaar Card linked with Mobile',
      'Cancelled Cheque / Bank Statement with IFSC',
      'Signature on white paper'
    ],
    iconName: 'TrendingUp',
    badge: '0% Brokerage'
  },
  {
    id: 'insurance',
    name: 'Insurance',
    category: 'Banking',
    tagline: 'Comprehensive Health, Term Life, Motor & Business Protection Plans',
    description: 'Secure your family\'s future and assets with tailored insurance coverage. Compare quotes from 20+ leading insurers and enjoy cashless hospitalizations nationwide.',
    benefits: [
      'Term Life Insurance cover up to ₹1 Crore starting @ ₹490/month',
      'Health Insurance with cashless treatment in 10,000+ hospitals',
      'No-Claim Bonus up to 100% & zero co-payment options',
      'Tax savings up to ₹75,000 under Section 80C & 80D',
      'Instant motor & commercial policy issuance'
    ],
    eligibility: 'Applicants aged 18 to 65 years.',
    requiredDocuments: [
      'KYC Documents (Aadhaar & PAN)',
      'Medical History Details (for health policies)',
      'Previous policy copy (for motor renewals)'
    ],
    iconName: 'ShieldCheck',
    badge: 'Tax Saving'
  },
  {
    id: 'investment',
    name: 'Investment',
    category: 'Investment',
    tagline: 'High-yield Mutual Funds, Fixed Deposits & Wealth Growth Solutions',
    description: 'Expert financial planning and curated investment portfolios tailored to your risk profile. Grow your wealth through SIPs, High-Yield Corporate FDs, and PMS.',
    benefits: [
      'High returns with top-rated Mutual Fund SIP plans',
      'Guaranteed return Corporate Fixed Deposits up to 9.1% p.a.',
      'Free financial health assessment by certified wealth advisors',
      'Flexible withdrawal and tax-saving ELSS fund recommendations',
      'Real-time portfolio tracking dashboard'
    ],
    eligibility: 'Any individual or corporate looking to invest surplus capital.',
    requiredDocuments: [
      'KYC Compliance (Aadhaar & PAN Card)',
      'Bank Account Details for auto-debit SIP'
    ],
    iconName: 'Coins',
    badge: 'High Yield'
  },
  {
    id: 'recruitment-services',
    name: 'Recruitment Services',
    category: 'Services & Jobs',
    tagline: 'End-to-end talent acquisition & manpower staffing for companies',
    description: 'Placement24/7 offers corporate recruitment solutions, executive search, bulk hiring, and specialized staffing for banking, finance, IT, BPO, and retail sectors.',
    benefits: [
      'Pre-screened & skill-verified candidate pool',
      'Fast turnaround time (TAT) under 48 hours for shortlisting',
      'Replacement guarantee up to 90 days',
      'Pan-India sourcing network across Tier 1, 2, and 3 cities',
      'Flexible permanent, contract, and payroll staffing models'
    ],
    eligibility: 'Corporate employers, startups, and SMBs looking for qualified workforce.',
    requiredDocuments: [
      'Company GST Certificate & Job Description Details',
      'Service Agreement Sign-off'
    ],
    iconName: 'Users',
    badge: 'Corporate Partner'
  },
  {
    id: 'data-verification',
    name: 'Data Verification',
    category: 'Services & Jobs',
    tagline: 'Background check, document verification & field investigation services',
    description: 'Reliable background screening, employee verification, document authenticity checks, address physical verification, and credit check reporting for banks and corporate employers.',
    benefits: [
      'Comprehensive background check reports within 24-48 hours',
      'Address physical verification & field agent visit logs',
      'Court record, criminal background & education verification',
      'Bank statement & employment history authentication',
      '100% compliant with privacy & data security regulations'
    ],
    eligibility: 'Banks, NBFCs, Fintechs, HR Departments & Corporate Employers.',
    requiredDocuments: [
      'Subject Consent Form',
      'Documents to be verified (Aadhaar/Marksheets/Pan/Address)'
    ],
    iconName: 'CheckCircle2',
    badge: '100% Secure'
  },
  {
    id: 'telecaller-jobs',
    name: 'Telecaller Jobs',
    category: 'Services & Jobs',
    tagline: 'Work from Home & Office Telecaller positions with attractive salary + incentive',
    description: 'Join Placement24/7\'s expanding team or top partner companies as a Telecaller / Outbound Sales Executive. Excellent salary package, incentive scheme, and career growth.',
    benefits: [
      'Fixed Monthly Salary ₹15,000 - ₹35,000 + Unlimited Incentives',
      'Full training provided — Freshers & Experienced candidates welcome',
      'Flexible Work From Home (WFH) and Work From Office options',
      'Day shifts with Sunday fixed off',
      'Rapid promotion paths to Team Leader & Quality Analyst'
    ],
    eligibility: 'Passed 12th / Graduate with good Hindi/English/Regional communication skills.',
    requiredDocuments: [
      'Resume / CV',
      'Educational Certificates (10th/12th/Degree)',
      'Aadhaar Card & Bank Account details for salary credit'
    ],
    iconName: 'Headphones',
    badge: 'Immediate Hiring'
  }
];
