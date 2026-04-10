"use client";

import { useEffect, useState } from "react";

type Booking = {
  id: string;
  sport: string;
  venue: string;
  date: string;
  time: string;
  status: string;
};

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showChange, setShowChange] = useState(false);
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [cpMessage, setCpMessage] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/admin/bookings');
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body?.message || 'Failed to load');
        }
        const data = await res.json();
        if (mounted) setBookings(data.bookings || []);
      } catch (err: any) {
        if (mounted) setError(err.message || 'Error');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black tracking-tight text-secondary uppercase italic flex items-center gap-2">
            <span className="inline-block w-2 h-8 bg-primary rounded-full mr-2"></span>
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded bg-muted hover:bg-muted/80 shadow" onClick={() => window.location.href = '/'}>Home</button>
            <button className="px-4 py-2 rounded bg-primary text-white shadow" onClick={() => setShowChange(s => !s)}>{showChange ? 'Close' : 'Change Password'}</button>
            <button className="px-4 py-2 rounded bg-destructive text-white shadow" onClick={async () => { await fetch('/api/admin/logout', { method: 'POST' }); window.location.href = '/'; }}>Logout</button>
          </div>
        </div>

        {showChange && (
          <div className="mb-8 p-6 border rounded-xl bg-white shadow-lg">
            <h2 className="font-bold mb-2 text-lg">Change Password</h2>
            {cpMessage && <p className="text-sm text-destructive mb-2">{cpMessage}</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <input type="password" placeholder="Current password" value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} className="p-3 border rounded-lg" />
              <input type="password" placeholder="New password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} className="p-3 border rounded-lg" />
              <input type="password" placeholder="Confirm new password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} className="p-3 border rounded-lg" />
            </div>
            <div className="mt-4">
              <button className="px-6 py-2 bg-primary text-white rounded-lg shadow font-bold" onClick={async () => {
                setCpMessage(null);
                if (!currentPwd || !newPwd) { setCpMessage('Fill fields'); return; }
                if (newPwd !== confirmPwd) { setCpMessage('Passwords do not match'); return; }
                try {
                  const res = await fetch('/api/admin/change-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ current: currentPwd, password: newPwd }) });
                  const body = await res.json().catch(() => ({}));
                  if (!res.ok) { setCpMessage(body?.message || 'Failed'); return; }
                  setCpMessage('Password changed');
                  setCurrentPwd(''); setNewPwd(''); setConfirmPwd('');
                } catch (err) { setCpMessage('Request failed'); }
              }}>Update Password</button>
            </div>
          </div>
        )}

        {loading && <div className="flex justify-center items-center h-40"><span className="text-lg font-bold text-muted-foreground">Loading...</span></div>}
        {error && <div className="flex justify-center items-center h-40"><span className="text-lg font-bold text-destructive">{error}</span></div>}

        {!loading && !error && (
          <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
            <h2 className="text-xl font-bold mb-4 text-primary">Recent Bookings</h2>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="text-left border-b bg-slate-50">
                  <th className="p-3 font-bold uppercase text-xs tracking-widest">ID</th>
                  <th className="p-3 font-bold uppercase text-xs tracking-widest">Sport</th>
                  <th className="p-3 font-bold uppercase text-xs tracking-widest">Venue</th>
                  <th className="p-3 font-bold uppercase text-xs tracking-widest">Date</th>
                  <th className="p-3 font-bold uppercase text-xs tracking-widest">Time</th>
                  <th className="p-3 font-bold uppercase text-xs tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b hover:bg-blue-50/40 transition-colors">
                    <td className="p-3 font-mono text-xs">{b.id}</td>
                    <td className="p-3">{b.sport}</td>
                    <td className="p-3">{b.venue}</td>
                    <td className="p-3">{b.date}</td>
                    <td className="p-3">{b.time}</td>
                    <td className="p-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm 
                        ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                          b.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-gray-100 text-gray-700'}`}>{b.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
