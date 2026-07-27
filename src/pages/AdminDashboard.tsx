import React, { useEffect, useState } from "react";

type Lead = {
  id: string;
  customer_name: string;
  mobile: string;
  district: string;
  product: string;
  assigned_to: string;
  status: string;
};

type Telecaller = {
  id: string;
  name: string;
  username: string;
};

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [telecallers, setTelecallers] = useState<Telecaller[]>([]);

  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");
  const [district, setDistrict] = useState("");
  const [product, setProduct] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  async function loadLeads() {
    const res = await fetch("/api/leads");
    const data = await res.json();

    if (data.success) {
      setLeads(data.leads);
    }
  }

  async function loadTelecallers() {
    const res = await fetch("/api/telecallers");
    const data = await res.json();

    if (data.success) {
      setTelecallers(data.telecallers);
    }
  }

  useEffect(() => {
    loadLeads();
    loadTelecallers();
  }, []);
    async function addLead(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer_name: customerName,
        mobile,
        district,
        product,
        assigned_to: assignedTo,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Lead Added Successfully");

      setCustomerName("");
      setMobile("");
      setDistrict("");
      setProduct("");
      setAssignedTo("");

      loadLeads();
    } else {
      alert(data.message || "Failed");
    }
  }

  return (
    <div className="min-h-screen bg-slate-100">

      <header className="bg-slate-900 text-white px-6 py-4 flex justify-between">

        <h1 className="text-2xl font-bold text-yellow-400">
          Placement24/7 CRM
        </h1>

        <button className="bg-red-500 px-4 py-2 rounded">
          Logout
        </button>

      </header>

      <div className="max-w-7xl mx-auto p-6">

        <h2 className="text-3xl font-bold mb-6">
          Admin Dashboard
        </h2>

        <div className="grid grid-cols-5 gap-4 mb-8">

          <div className="bg-white rounded shadow p-4">
            <p>Total Leads</p>
            <h2 className="text-3xl font-bold">
              {leads.length}
            </h2>
          </div>

          <div className="bg-white rounded shadow p-4">
            <p>Telecallers</p>
            <h2 className="text-3xl font-bold">
              {telecallers.length}
            </h2>
          </div>

        </div>
                {/* Add Lead Form */}

        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <h3 className="text-xl font-bold mb-4">
            Add New Lead
          </h3>

          <form
            onSubmit={addLead}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >

            <input
              className="border rounded p-3"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />

            <input
              className="border rounded p-3"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />

            <input
              className="border rounded p-3"
              placeholder="District"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />

            <input
              className="border rounded p-3"
              placeholder="Product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            />

            <select
              className="border rounded p-3"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">Assign Telecaller</option>

              {telecallers.map((tc) => (
                <option
                  key={tc.id}
                  value={tc.username}
                >
                  {tc.name}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="bg-blue-600 text-white rounded p-3 font-bold"
            >
              Add Lead
            </button>

          </form>

        </div>
              <div className="bg-white rounded-xl shadow p-6">

        <h3 className="text-xl font-bold mb-4">
          Lead List
        </h3>

        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-slate-900 text-white">

                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">District</th>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Assigned To</th>
                <th className="p-3 text-left">Status</th>

              </tr>

            </thead>

            <tbody>

              {leads.length === 0 ? (

                <tr>

                  <td
                    colSpan={6}
                    className="text-center p-6"
                  >
                    No Leads Available
                  </td>

                </tr>

              ) : (

                leads.map((lead) => (

                  <tr
                    key={lead.id}
                    className="border-b"
                  >

                    <td className="p-3">
                      {lead.customer_name}
                    </td>

                    <td className="p-3">
                      {lead.mobile}
                    </td>

                    <td className="p-3">
                      {lead.district}
                    </td>

                    <td className="p-3">
                      {lead.product}
                    </td>

                    <td className="p-3">
                      {lead.assigned_to || "-"}
                    </td>

                    <td className="p-3">
                      {lead.status}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  </div>
);
}
