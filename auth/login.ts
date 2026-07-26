import type { VercelRequest, VercelResponse } from '@vercel/node';

type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'telecaller' | 'tl';
  username: string;
};

const telecallers = [
  {
    id: 'tc-1',
    name: 'Rahul Sharma',
    email: 'rahul@placement247.com',
    phone: '+91 98123 45678',
    username: 'rahul',
    password: 'telecaller123',
  },
  {
    id: 'tc-2',
    name: 'Priya Singh',
    email: 'priya@placement247.com',
    phone: '+91 98234 56789',
    username: 'priya',
    password: 'telecaller123',
  },
  {
    id: 'tc-3',
    name: 'Amit Kumar',
    email: 'amit@placement247.com',
    phone: '+91 98345 67890',
    username: 'amit',
    password: 'telecaller123',
  },
];

const teamLeaders = [
  {
    id: 'tl-1',
    name: 'Team Leader',
    email: 'tl@placement247.com',
    phone: '+91 90000 00001',
    username: 'tl',
    password: 'tl123456',
  },
];

export default function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }

  try {
    const { username, password } = req.body || {};

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required',
      });
    }

    const loginUsername = String(username).trim().toLowerCase();
    const loginPassword = String(password);

    // ADMIN LOGIN
    if (
      loginUsername === 'admin' &&
      loginPassword === 'admin123'
    ) {
      const user: User = {
        id: 'admin-1',
        name: 'Super Admin',
        email: 'admin@placement247.com',
        role: 'admin',
        username: 'admin',
      };

      return res.status(200).json({
        success: true,
        user,
      });
    }

    // TELECALLER LOGIN
    const telecaller = telecallers.find(
      (user) =>
        (
          user.username.toLowerCase() === loginUsername ||
          user.email.toLowerCase() === loginUsername
        ) &&
        user.password === loginPassword
    );

    if (telecaller) {
      const user: User = {
        id: telecaller.id,
        name: telecaller.name,
        email: telecaller.email,
        phone: telecaller.phone,
        role: 'telecaller',
        username: telecaller.username,
      };

      return res.status(200).json({
        success: true,
        user,
      });
    }

    // TEAM LEADER LOGIN
    const teamLeader = teamLeaders.find(
      (user) =>
        (
          user.username.toLowerCase() === loginUsername ||
          user.email.toLowerCase() === loginUsername
        ) &&
        user.password === loginPassword
    );

    if (teamLeader) {
      const user: User = {
        id: teamLeader.id,
        name: teamLeader.name,
        email: teamLeader.email,
        phone: teamLeader.phone,
        role: 'tl',
        username: teamLeader.username,
      };

      return res.status(200).json({
        success: true,
        user,
      });
    }

    // INVALID LOGIN
    return res.status(401).json({
      success: false,
      message: 'Invalid username or password',
    });
  } catch (error) {
    console.error('Login API Error:', error);

    return res.status(500).json({
      success: false,
      message: 'Server error. Please try again.',
    });
  }
}
