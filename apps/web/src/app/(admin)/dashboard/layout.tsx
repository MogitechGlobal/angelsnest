"use client";
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('http://localhost:8000/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r p-4">
        <h2 className="text-xl font-bold mb-8">Angelsnest Admin</h2>
        <nav className="space-y-2">
          <a href="/dashboard" className="block p-2 rounded hover:bg-gray-50">Dashboard</a>
          <button onClick={handleLogout} className="w-full text-left p-2 rounded text-red-600 hover:bg-red-50">Logout</button>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
