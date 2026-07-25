import React, { useState } from 'react';
import { Lock, UserCheck, Key, ShieldAlert, X, ArrowRight, User } from 'lucide-react';

interface LoginModalProps {
  initialRole: 'telecaller' | 'admin';
  onLoginSuccess: (role: 'telecaller' | 'admin', userObj: any) => void;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  initialRole,
  onLoginSuccess,
  onClose,
}) => {
  const [role, setRole] = useState<'telecaller' | 'admin'>(initialRole);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success && data.user) {
        onLoginSuccess(data.user.role, data.user);
        onClose();
      } else {
        setError(data.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (demoUsername: string, demoRole: 'telecaller' | 'admin') => {
    setRole(demoRole);
    if (demoRole === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    } else {
      setUsername(demoUsername);
      setPassword('telecaller123');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-white relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Role Toggle Header */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-12 h-12 bg-amber-400/20 border border-amber-400/40 rounded-2xl flex items-center justify-center mx-auto text-amber-400 mb-2">
            {role === 'admin' ? <Lock className="w-6 h-6" /> : <UserCheck className="w-6 h-6" />}
          </div>
          <h2 className="text-2xl font-bold font-serif text-white">
            {role === 'admin' ? 'Admin Control Login' : 'Telecaller Portal Login'}
          </h2>
          <p className="text-xs text-slate-400">
            Authorized Personnel Access Only — Placement24/7 CRM
          </p>
        </div>

        {/* Role Switcher Tabs */}
        <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => {
              setRole('telecaller');
              setUsername('rahul');
              setPassword('telecaller123');
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              role === 'telecaller'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            Telecaller Portal
          </button>

          <button
            type="button"
            onClick={() => {
              setRole('admin');
              setUsername('admin');
              setPassword('admin123');
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              role === 'admin'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            Admin Dashboard
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              {role === 'admin' ? 'Admin Username' : 'Telecaller Username'}
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder={role === 'admin' ? 'admin' : 'rahul / priya / amit'}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/90 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Password</label>
            <div className="relative">
              <Key className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700/90 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 font-bold rounded-xl text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
          >
            {loading ? 'Authenticating...' : 'Sign In To Account'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Credentials Quick Picker */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-400 mb-2">Quick Demo Login Shortcuts:</p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-[11px]">
            <button
              onClick={() => handleDemoLogin('admin', 'admin')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded-lg border border-slate-700 font-medium"
            >
              Admin (admin)
            </button>
            <button
              onClick={() => handleDemoLogin('rahul', 'telecaller')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-blue-300 rounded-lg border border-slate-700 font-medium"
            >
              Rahul (Telecaller)
            </button>
            <button
              onClick={() => handleDemoLogin('priya', 'telecaller')}
              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-lg border border-slate-700 font-medium"
            >
              Priya (Telecaller)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
