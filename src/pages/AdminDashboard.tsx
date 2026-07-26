import React from "react";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}
      <header className="bg-slate-900 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-amber-400">
            Placement24/7 CRM
          </h1>

          <button className="bg-amber-400 text-slate-900 px-4 py-2 rounded-lg font-semibold hover:bg-amber-300">
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">

        <h2 className="text-3xl font-bold text-slate-800 mb-2">
          Admin Dashboard
        </h2>

        <p className="text-slate-500 mb-8">
          Welcome to Placement24/7 Lead Management System
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">

          <div className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-600">
            <p className="text-gray-500">Total Leads</p>
            <h3 className="text-3xl font-bold">0</h3>
          </div>

          <div className="bg-white rounded-xl shadow p-5 border-l-4 border-green-600">
            <p className="text-gray-500">New Leads</p>
            <h3 className="text-3xl font-bold">0</h3>
          </div>

          <div className="bg-white rounded-xl shadow p-5 border-l-4 border-yellow-500">
            <p className="text-gray-500">Today's Leads</p>
            <h3 className="text-3xl font-bold">0</h3>
          </div>

          <div className="bg-white rounded-xl shadow p-5 border-l-4 border-purple-600">
            <p className="text-gray-500">Follow Up</p>
            <h3 className="text-3xl font-bold">0</h3>
          </div>

          <div className="bg-white rounded-xl shadow p-5 border-l-4 border-red-600">
            <p className="text-gray-500">Converted</p>
            <h3 className="text-3xl font-bold">0</h3>
          </div>

        </div>

        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-bold mb-4">
            Lead Management
          </h3>

          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-slate-900 text-white">

                  <th className="p-3 text-left">Lead ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Mobile</th>
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-left">Status</th>

                </tr>

              </thead>

              <tbody>

                <tr>

                  <td className="p-4" colSpan={5}>
                    No Leads Available
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;
