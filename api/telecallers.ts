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

  // ===========================
  // GET
  // ===========================
  if (req.method === 'GET') {

    const { data, error } = await supabase
      .from('telecallers')
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
      telecallers: data,
    });
  }

  // ===========================
  // POST
  // ===========================
  if (req.method === 'POST') {

    const {
      name,
      username,
      password,
      phone,
      email,
    } = req.body;

    const { data, error } = await supabase
      .from('telecallers')
      .insert([
        {
          name,
          username: username.toLowerCase(),
          password,
          phone,
          email,
          status: 'active',
          assigned_leads: 0,
          converted_leads: 0,
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
      telecaller: data,
    });
  }

  // ===========================
  // DELETE
  // ===========================
  if (req.method === 'DELETE') {

    const { id } = req.query;

    const { error } = await supabase
      .from('telecallers')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    return res.status(200).json({
      success: true,
    });
  }

  return res.status(405).json({
    success: false,
    message: 'Method Not Allowed',
  });
}
