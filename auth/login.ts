export default function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed',
    });
  }

  const { username, password } = req.body || {};

  // ADMIN LOGIN
  if (username === 'admin' && password === 'admin123') {
    return res.status(200).json({
      success: true,
      user: {
        id: 'admin-1',
        name: 'Super Admin',
        email: 'admin@placement247.com',
        role: 'admin',
        username: 'admin',
      },
    });
  }

  // TELECALLER LOGIN
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

  const telecaller = telecallers.find(
    (t) =>
      (t.username.toLowerCase() === String(username).toLowerCase() ||
        t.email.toLowerCase() === String(username).toLowerCase()) &&
      t.password === password
  );

  if (telecaller) {
    return res.status(200).json({
      success: true,
      user: {
        id: telecaller.id,
        name: telecaller.name,
        email: telecaller.email,
        phone: telecaller.phone,
        role: 'telecaller',
        username: telecaller.username,
      },
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid username or password',
  });
}
