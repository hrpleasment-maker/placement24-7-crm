import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // =========================
  // GET ALL LEADS
  // =========================
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
      leads: data,
    });
  }

  // =========================
  // CREATE LEAD
  // =========================
  if (req.method === 'POST') {
    const {
      customer_name,
      mobile,
      district,
      product,
      assigned_to,
    } = req.body;

    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          customer_name,
          mobile,
          district,
          product,
          assigned_to,
          status: 'Pending',
        },
      ])
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(201).json({
      success: true,
      lead: data,
    });
  }

  return res.status(405).json({
    success: false,
    message: 'Method Not Allowed',
  });
}
