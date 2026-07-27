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
          status: 'active',
          assignedLeads: 0,
          convertedLeads: 0,
        },
        {
          id: 'tc-2',
          name: 'Priya Singh',
          username: 'priya',
          status: 'active',
          assignedLeads: 0,
          convertedLeads: 0,
        },
      ],
    });
  }

  // POST — Create Telecaller
  if (req.method === 'POST') {
    try {
      let body = req.body || {};

      // Handle string body if necessary
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }

      const name = body.name || body.fullName || body.full_name;
      const username = body.username;
      const password = body.password;

      if (!name || !username || !password) {
        return res.status(400).json({
          success: false,
          message: 'Full Name, Username and Password are required.',
        });
      }

      const newTelecaller = {
        id: `tc-${Date.now()}`,
        name,
        username,
        status: 'active',
        assignedLeads: 0,
        convertedLeads: 0,
      };

      return res.status(201).json({
        success: true,
        message: 'Telecaller created successfully.',
        telecaller: newTelecaller,
        user: newTelecaller,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Unable to create telecaller.',
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: 'Method Not Allowed',
  });
}
