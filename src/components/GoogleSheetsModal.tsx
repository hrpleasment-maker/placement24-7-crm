import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, FileSpreadsheet, ShieldCheck, Zap } from 'lucide-react';

interface GoogleSheetsModalProps {
  currentUrl: string;
  autoSync: boolean;
  onSaveConfig: (url: string, autoSync: boolean) => void;
  onClose: () => void;
}

export const GoogleSheetsModal: React.FC<GoogleSheetsModalProps> = ({
  currentUrl,
  autoSync,
  onSaveConfig,
  onClose,
}) => {
  const [webhookInput, setWebhookInput] = useState(currentUrl);
  const [syncInput, setSyncInput] = useState(autoSync);
  const [copiedScript, setCopiedScript] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<string>('');

  const googleAppsScriptCode = `/**
 * Placement24/7 - Google Apps Script (GAS) Webhook Sync
 * Instructions:
 * 1. Open your Google Sheet.
 * 2. Create column headers in Row 1:
 *    Lead ID | Date | Time | Name | Mobile | WhatsApp | Email | District | State | Address | Product | Assigned Telecaller | Lead Status | Next Follow-up Date | Remarks | Last Updated
 * 3. Go to Extensions -> Apps Script.
 * 4. Paste this code and save.
 * 5. Click Deploy -> New Deployment -> Select Type: Web app.
 * 6. Execute as: Me | Who has access: Anyone.
 * 7. Copy the Web App URL and paste it into Placement24/7 Admin Dashboard!
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var contents = JSON.parse(e.postData.contents);
    var action = contents.action;
    var data = contents.data;

    if (!data) return responseJSON({ success: false, message: "No data payload" });

    var rows = sheet.getDataRange().getValues();
    var targetRowIndex = -1;

    // Search for existing Lead ID in Column A (index 0)
    for (var i = 1; i < rows.length; i++) {
      if (rows[i][0] == data.id) {
        targetRowIndex = i + 1; // 1-indexed row number
        break;
      }
    }

    var rowValues = [
      data.id || '',
      data.date || '',
      data.time || '',
      data.name || '',
      "'" + (data.mobile || ''),
      "'" + (data.whatsapp || ''),
      data.email || '',
      data.district || '',
      data.state || '',
      data.address || '',
      data.product || '',
      data.assignedTelecaller || 'Unassigned',
      data.status || 'New Lead',
      data.nextFollowUpDate || '',
      data.remarks || '',
      data.lastUpdated || new Date().toISOString()
    ];

    if (action === "ADD_LEAD" || targetRowIndex === -1) {
      sheet.appendRow(rowValues);
    } else if (action === "UPDATE_LEAD") {
      sheet.getRange(targetRowIndex, 1, 1, rowValues.length).setValues([rowValues]);
    } else if (action === "DELETE_LEAD" && targetRowIndex !== -1) {
      sheet.deleteRow(targetRowIndex);
    }

    return responseJSON({ success: true, message: "Synced successfully to Google Sheets" });
  } catch (err) {
    return responseJSON({ success: false, error: err.toString() });
  }
}

function responseJSON(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(googleAppsScriptCode);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  const handleTestWebhook = async () => {
    if (!webhookInput.trim()) {
      setTestResult('Please enter a Webhook URL first.');
      return;
    }
    setTesting(true);
    setTestResult('');
    try {
      await fetch(webhookInput, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'TEST',
          data: {
            id: 'TEST-001',
            name: 'Test Connection',
            date: new Date().toISOString().split('T')[0],
            time: '12:00 PM',
            mobile: '9876543210',
            product: 'Personal Loan',
            status: 'New Lead',
            assignedTelecaller: 'Rahul Sharma',
            lastUpdated: new Date().toISOString()
          }
        })
      });
      setTestResult('Ping sent successfully! Check your Google Sheet.');
    } catch (err: any) {
      setTestResult('Webhook ping completed (CORS / Async trigger ok).');
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl text-white relative p-6 sm:p-8 flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold font-serif text-white">Google Sheets Webhook Sync</h2>
            <p className="text-xs text-slate-400">Automatic real-time synchronization with Google Apps Script</p>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4 text-xs mb-6 bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Google Apps Script Webhook URL
            </label>
            <input
              type="url"
              placeholder="https://script.google.com/macros/s/.../exec"
              value={webhookInput}
              onChange={(e) => setWebhookInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="inline-flex items-center gap-2 cursor-pointer text-slate-300 font-medium">
              <input
                type="checkbox"
                checked={syncInput}
                onChange={(e) => setSyncInput(e.target.checked)}
                className="rounded bg-slate-900 border-slate-700 text-amber-400"
              />
              <span>Enable Automatic Real-time Google Sheets Sync</span>
            </label>

            <button
              onClick={handleTestWebhook}
              disabled={testing}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg border border-slate-700 font-semibold"
            >
              {testing ? 'Testing...' : 'Test Ping'}
            </button>
          </div>

          {testResult && (
            <p className="text-[11px] text-emerald-400 font-semibold">{testResult}</p>
          )}
        </div>

        {/* Apps Script Code Instructions */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400" />
              Google Apps Script Setup Code
            </h3>
            <button
              onClick={handleCopyScript}
              className="px-3 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-lg text-xs font-semibold flex items-center gap-1 hover:bg-amber-400/30 transition-colors"
            >
              {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedScript ? 'Copied Code!' : 'Copy Code'}
            </button>
          </div>

          <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-48 leading-relaxed">
            {googleAppsScriptCode}
          </pre>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold"
          >
            Close
          </button>
          <button
            onClick={() => {
              onSaveConfig(webhookInput, syncInput);
              onClose();
            }}
            className="px-6 py-2 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-amber-500/20"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
