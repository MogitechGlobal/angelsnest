"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      const res = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        router.push('/dashboard');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Cannot connect to backend API. Ensure the server is running on port 8000.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="p-8 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
        {error && <div className="mb-4 p-2 text-sm text-red-600 bg-red-50 rounded border border-red-200">{error}</div>}
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full mb-4 p-2 border rounded" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full mb-6 p-2 border rounded" required />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Login</button>
      </form>
    </div>
  );
}
