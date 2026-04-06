
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
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Bookings</h1>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded bg-muted hover:bg-muted/80" onClick={() => window.location.href = '/'}>Home</button>
            <button className="px-4 py-2 rounded bg-primary text-white" onClick={() => setShowChange(s => !s)}>{showChange ? 'Close' : 'Change Password'}</button>
            <button className="px-4 py-2 rounded bg-destructive text-white" onClick={async () => { await fetch('/api/admin/logout', { method: 'POST' }); window.location.href = '/'; }}>Logout</button>
          </div>
        </div>

        {showChange && (
          <div className="mb-6 p-4 border rounded bg-card">
            <h2 className="font-bold mb-2">Change Password</h2>
            {cpMessage && <p className="text-sm text-destructive">{cpMessage}</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <input type="password" placeholder="Current password" value={currentPwd} onChange={(e) => setCurrentPwd(e.target.value)} className="p-2 border rounded" />
              <input type="password" placeholder="New password" value={newPwd} onChange={(e) => setNewPwd(e.target.value)} className="p-2 border rounded" />
              <input type="password" placeholder="Confirm new password" value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} className="p-2 border rounded" />
            </div>
            <div className="mt-3">
              <button className="px-4 py-2 bg-primary text-white rounded" onClick={async () => {
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

        {loading && <p>Loading...</p>}
        {error && <p className="text-destructive">{error}</p>}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-2">ID</th>
                  <th className="p-2">Sport</th>
                  <th className="p-2">Venue</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Time</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b">
                    <td className="p-2">{b.id}</td>
                    <td className="p-2">{b.sport}</td>
                    <td className="p-2">{b.venue}</td>
                    <td className="p-2">{b.date}</td>
                    <td className="p-2">{b.time}</td>
                    <td className="p-2">{b.status}</td>
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
