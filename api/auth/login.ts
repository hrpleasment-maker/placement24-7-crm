export default function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method Not Allowed',
    });
  }

  const { username, password } = req.body || {};

  const loginUsername = String(username || '').trim().toLowerCase();
  const loginPassword = String(password || '');

  // =========================
  // ADMIN LOGIN
  // =========================
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
        email: 'admin@placement247.com',
        role: 'admin',
        username: 'admin',
      },
    });
  }

  // =========================
  // TEST TELECALLER
  // =========================
  if (
    loginUsername === 'testcaller01' &&
    loginPassword === 'test123'
  ) {
    return res.status(200).json({
      success: true,
      user: {
        id: 'tc-test-01',
        name: 'Test Telecaller',
        email: 'testcaller01@placement247.com',
        phone: '',
        role: 'telecaller',
        username: 'testcaller01',
      },
    });
  }

  // =========================
  // DEMO TELECALLERS
  // =========================
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

  // =========================
  // FIND TELECALLER
  // =========================
  const user = telecallers.find(
    (t) =>
      (
        t.username.toLowerCase() === loginUsername ||
        t.email.toLowerCase() === loginUsername
      ) &&
      t.password === loginPassword
  );

  if (user) {
    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: 'telecaller',
        username: user.username,
      },
    });
  }

  // =========================
  // INVALID LOGIN
  // =========================
  return res.status(401).json({
    success: false,
    message: 'Invalid username or password',
  });
}
