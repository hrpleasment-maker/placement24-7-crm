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
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed',
    });
  }

  const { username, password } = req.body;

  const loginUsername = String(username || '').trim().toLowerCase();

  // Admin Login
  if (
    (loginUsername === 'admin' ||
      loginUsername === 'admin@placement247.com') &&
    password === 'admin123'
  ) {
    return res.status(200).json({
      success: true,
      user: {
        id: 'admin',
        role: 'admin',
        username: 'admin',
        name: 'Super Admin',
      },
    });
  }

  // Telecaller Login
  const { data: user, error } = await supabase
    .from('telecallers')
    .select('*')
    .or(`username.eq.${loginUsername},email.eq.${loginUsername}`)
    .eq('password', password)
    .single();

  if (error || !user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid username or password',
    });
  }

  return res.status(200).json({
    success: true,
    user: {
      id: user.id,
      role: 'telecaller',
      username: user.username,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });
}
