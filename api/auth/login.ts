import type { VercelRequest, VercelResponse } from '@vercel/node';

type Telecaller = {
  id: string;
  name: string;
  username: string;
  phone: string;
  email: string;
  password: string;
  status: string;
  assignedLeads: number;
  convertedLeads: number;
};

const globalStore = globalThis as typeof globalThis & {
  __placement247Telecallers?: Telecaller[];
};

if (!globalStore.__placement247Telecallers) {
  globalStore.__placement247Telecallers = [
    {
      id: 'tc-1',
      name: 'Rahul Sharma',
      username: 'rahul',
      phone: '',
      email: 'rahul@placement247.com',
      password: 'rahul123',
      status: 'active',
      assignedLeads: 0,
      convertedLeads: 0,
    },
    {
      id: 'tc-2',
      name: 'Priya Singh',
      username: 'priya',
      phone: '',
      email: 'priya@placement247.com',
      password: 'priya123',
      status: 'active',
      assignedLeads: 0,
      convertedLeads: 0,
    },
  ];
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed',
    });
  }

  const { username, password } = req.body || {};

  const loginUsername = String(username || '').trim().toLowerCase();
  const loginPassword = String(password || '');

  // Admin Login
  if (
    (loginUsername === 'admin' ||
      loginUsername === 'admin@placement247.com') &&
    loginPassword === 'admin123'
  ) {
    return res.status(200).json({
      success: true,
      user: {
        id: 'admin-1',
        name: 'Super Admin',
        role: 'admin',
        username: 'admin',
        email: 'admin@placement247.com',
      },
    });
  }

  // Telecaller Login
  const user = globalStore.__placement247Telecallers!.find(
    (t) =>
      (t.username.toLowerCase() === loginUsername ||
        t.email.toLowerCase() === loginUsername) &&
      t.password === loginPassword
  );

  if (user) {
    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: 'telecaller',
      },
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid username or password',
  });
}
