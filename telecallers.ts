
export default function handler(req: any, res: any) {
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

  if (req.method === 'POST') {
    const { name, username, password } = req.body || {};

    if (!name || !username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Full Name, Username and Password are required.',
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Telecaller created successfully.',
      telecaller: {
        id: `tc-${Date.now()}`,
        name,
        username,
        status: 'active',
        assignedLeads: 0,
        convertedLeads: 0,
      },
    });
  }

  return res.status(405).json({
    success: false,
    message: 'Method Not Allowed',
  });
}
