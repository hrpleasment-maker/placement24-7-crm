export default function handler(req: any, res: any) {
  // GET — Telecaller list
  if (req.method === 'GET') {
    return res.status(200).json({
      success: true,
      telecallers: [
        {
          id: 'tc-1',
          name: 'Rahul Sharma',
          username: 'rahul',
          phone: '',
          email: '',
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
          status: 'active',
          assignedLeads: 0,
          convertedLeads: 0,
        },
      ],
    });
  }

  // POST — Create new Telecaller
  if (req.method === 'POST') {
    try {
      let body = req.body || {};

      // Handle string body
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

      const name = body.name || body.full_name;
      const username = body.username;
      const password = body.password;
      const phone = body.phone || '';
      const email = body.email || '';

      // Required fields
      if (!name || !username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Full Name, Username and Password are required.',
        });
      }

      // Create telecaller
      const telecaller = {
        id: `tc-${Date.now()}`,
        name,
        username,
        phone,
        email,
        status: 'active',
        assignedLeads: 0,
        convertedLeads: 0,
      };

      return res.status(201).json({
        success: true,
        message: 'Telecaller created successfully.',
        telecaller,
      });
    } catch (error) {
      console.error('Create telecaller error:', error);

      return res.status(500).json({
        success: false,
        message: 'Server error while creating telecaller.',
      });
    }
  }

  // Other methods
  return res.status(405).json({
    success: false,
    message: 'Method Not Allowed',
  });
}
