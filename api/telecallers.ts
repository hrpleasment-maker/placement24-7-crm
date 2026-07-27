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

// Server memory store
// Existing telecallers
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
      email: '',
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
      email: '',
      password: 'priya123',
      status: 'active',
      assignedLeads: 0,
      convertedLeads: 0,
    },
  ];
}

export default function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const telecallers = globalStore.__placement247Telecallers!;

  // =========================
  // GET — TELECALLER LIST
  // =========================

  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      telecallers,
    });
  }

  // =========================
  // POST — CREATE TELECALLER
  // =========================

  if (req.method === 'POST') {
    try {
      let body: any = req.body || {};

      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch {
          return res.status(400).json({
            success: false,
            message: 'Invalid JSON request body.',
          });
        }
      }

      const name = String(
        body.name || body.full_name || ''
      ).trim();

      const username = String(
        body.username || ''
      )
        .trim()
        .toLowerCase();

      const password = String(
        body.password || ''
      ).trim();

      const phone = String(
        body.phone || ''
      ).trim();

      const email = String(
        body.email || ''
      ).trim();

      // Required
      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'Full Name is required.',
        });
      }

      if (!username) {
        return res.status(400).json({
          success: false,
          message: 'Username is required.',
        });
      }

      if (!password) {
        return res.status(400).json({
          success: false,
          message: 'Password is required.',
        });
      }

      if (password.length < 4) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 4 characters.',
        });
      }

      // Check duplicate username
      const existing = telecallers.find(
        (tc) => tc.username === username
      );

      if (existing) {
        return res.status(409).json({
          success: false,
          message: `Username "${username}" already exists.`,
        });
      }

      // Create new telecaller
      const newTelecaller: Telecaller = {
        id: `tc-${Date.now()}`,
        name,
        username,
        phone,
        email,
        password,
        status: 'active',
        assignedLeads: 0,
        convertedLeads: 0,
      };

      // IMPORTANT:
      // Save into current server store
      telecallers.push(newTelecaller);

      console.log(
        'New Telecaller Created:',
        newTelecaller.name
      );

      return res.status(201).json({
        success: true,
        message: 'Telecaller created successfully.',
        telecaller: newTelecaller,
      });
    } catch (error) {
      console.error(
        'Create telecaller error:',
        error
      );

      return res.status(500).json({
        success: false,
        message:
          'Server error while creating telecaller.',
      });
    }
  }

  // =========================
  // DELETE
  // =========================

  if (req.method === 'DELETE') {
    const id =
      req.query.id ||
      req.body?.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Telecaller ID is required.',
      });
    }

    const index = telecallers.findIndex(
      (tc) => tc.id === id
    );

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: 'Telecaller not found.',
      });
    }

    const deleted =
      telecallers.splice(index, 1)[0];

    return res.status(200).json({
      success: true,
      message: 'Telecaller deleted successfully.',
      telecaller: deleted,
    });
  }

  // =========================
  // METHOD NOT ALLOWED
  // =========================

  return res.status(405).json({
    success: false,
    message: 'Method Not Allowed',
  });
}
