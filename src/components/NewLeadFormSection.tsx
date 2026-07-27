import React, { useState } from "react";

interface Props {
  preselectedProduct?: string;
  onLeadSubmitted: (lead: any) => void;
}

export const NewLeadFormSection: React.FC<Props> = ({
  preselectedProduct,
  onLeadSubmitted,
}) => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    district: "",
    product: preselectedProduct || "Personal Loan",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_name: form.name,
          mobile: form.mobile,
          district: form.district,
          product: form.product,
          assigned_to: null,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.error || "Failed");
        setLoading(false);
        return;
      }

      onLeadSubmitted(data.lead);

      alert("Lead Added Successfully");

      setForm({
        name: "",
        mobile: "",
        district: "",
        product: "Personal Loan",
      });

    } catch (err) {
      alert("Server Error");
    }

    setLoading(false);
  };
    return (
    <section
      id="apply-form"
      className="py-16 bg-slate-900 text-white"
    >
      <div className="max-w-3xl mx-auto px-4">

        <div className="bg-slate-800 rounded-xl p-6 shadow-lg">

          <h2 className="text-3xl font-bold text-center mb-6">
            Apply Now
          </h2>

          <form
            onSubmit={submitLead}
            className="space-y-4"
          >

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-slate-700 border border-slate-600"
            />

            <input
              type="text"
              name="mobile"
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-slate-700 border border-slate-600"
            />

            <input
              type="text"
              name="district"
              placeholder="District"
              value={form.district}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-slate-700 border border-slate-600"
            />

            <select
              name="product"
              value={form.product}
              onChange={handleChange}
              className="w-full p-3 rounded bg-slate-700 border border-slate-600"
            >
              <option>Personal Loan</option>
              <option>Business Loan</option>
              <option>Home Loan</option>
              <option>Credit Card</option>
              <option>Savings Account</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-black font-bold p-3 rounded"
            >
              {loading ? "Saving..." : "Submit Lead"}
            </button>

          </form>

        </div>

      </div>

    </section>
  );
};
