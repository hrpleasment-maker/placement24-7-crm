import React, { useState } from "react";

interface AdminPortalProps {
  onLogout: () => void;
}

import Dashboard from "./admin/Dashboard";
import Sidebar from "./admin/Sidebar";
import LeadUpload from "./admin/LeadUpload";
import LeadTable from "./admin/LeadTable";
import TelecallerTable from "./admin/TelecallerTable";
import Reports from "./admin/Reports";

const AdminPortal: React.FC<AdminPortalProps> = ({ onLogout }) => {
  const [page, setPage] = useState("dashboard");

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard />;

      case "upload":
        return <LeadUpload />;

      case "leads":
        return <LeadTable />;

      case "telecallers":
        return <TelecallerTable />;

      case "reports":
        return <Reports />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar
        page={page}
        setPage={setPage}
        onLogout={onLogout}
      />

      <div className="flex-1 p-8 overflow-auto">
        {renderPage()}
      </div>
    </div>
  );
};

export default AdminPortal;
