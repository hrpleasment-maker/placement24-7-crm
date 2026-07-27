import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {

  // ==========================
  // GET LEADS
  // ==========================
  if (req.method === "GET") {

    const assignedTo = req.query.assignedTo as string | undefined;

    let query = supabase.from("leads").select("*");

    if (assignedTo) {
      query = query.eq("assigned_to", assignedTo);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    return res.json({
      success: true,
      leads: data,
    });
  }

  // ==========================
  // ADD LEAD
  // ==========================
  if (req.method === "POST") {

    const {
      customer_name,
      mobile,
      district,
      product,
      assigned_to,
      qualification,
      current_work
    } = req.body;

    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          customer_name,
          mobile,
          district,
          product,
          assigned_to,
          qualification,
          current_work,
          status: "Pending"
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    return res.json({
      success: true,
      lead: data,
    });
  }

  // ==========================
  // UPDATE STATUS
  // ==========================
  if (req.method === "PUT") {

    const {
      id,
      status
    } = req.body;

    const { data, error } = await supabase
      .from("leads")
      .update({
        status
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    return res.json({
      success: true,
      lead: data,
    });
  }

  return res.status(405).json({
    success: false,
    message: "Method Not Allowed",
  });
}
