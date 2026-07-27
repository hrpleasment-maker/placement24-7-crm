import React from "react";

interface AdminPortalProps {
  onLogout: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  onLogout,
}) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">

        <div className="bg-slate-900 border border-amber-500 rounded-2xl p-8">

          <h1 className="text-3xl font-bold text-amber-400">
            Placement24/7 Admin Portal
          </h1>

          <p className="mt-3 text-slate-300">
            Admin Panel Successfully Loaded.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

            <div className="bg-slate-800 rounded-xl p-5">
              <h2 className="text-lg font-semibold">Leads</h2>
              <p className="text-3xl font-bold text-amber-400 mt-2">0</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-5">
              <h2 className="text-lg font-semibold">Telecallers</h2>
              <p className="text-3xl font-bold text-amber-400 mt-2">0</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-5">
              <h2 className="text-lg font-semibold">Pending</h2>
              <p className="text-3xl font-bold text-yellow-400 mt-2">0</p>
            </div>

            <div className="bg-slate-800 rounded-xl p-5">
              <h2 className="text-lg font-semibold">Completed</h2>
              <p className="text-3xl font-bold text-green-400 mt-2">0</p>
            </div>

          </div>

          <div className="mt-10">
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold"
            >
              Logout
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminPortal;
