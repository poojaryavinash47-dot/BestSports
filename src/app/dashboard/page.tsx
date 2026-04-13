"use client";

import React, { useEffect, useState, useMemo } from "react";

type Booking = {
  id: string;
  sport?: string;
  venue?: string;
  date?: string;
  startDate?: string;
  endDate?: string;
  time?: string;
  status?: string;
  fullName?: string;
  phone?: string;
  email?: string;
  batch?: string;
  notes?: string;
  planName?: string;
  planPrice?: string;
  type: 'regular' | 'subscription' | 'membership';
};

type SortCol = 'id' | 'type' | 'fullName' | 'sport' | 'startDate' | 'endDate' | 'status';
type TypeFilter = 'all' | 'regular' | 'subscription' | 'membership';

const PAGE_SIZE = 10;

function formatDate(d?: string) {
  if (!d) return '-';
  const dt = new Date(d);
  if (isNaN(dt.getTime())) return d;
  return dt.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

// CSV date formatter: parses YYYY-MM-DD directly to avoid timezone shifts, returns '' for empty
// Tab prefix forces Excel to treat the value as text (prevents ## issue)
function csvDate(d?: string): string {
  if (!d) return '';
  const m = d.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return d;
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const month = months[parseInt(m[2], 10) - 1];
  return '\t' + m[3] + ' ' + month + ' ' + m[1];
}

function formatRupee(price?: string) {
  if (!price) return '-';
  return `₹${price.replace(/₹\s*/g, '')}`;
}

function isExpiringSoon(endDate?: string) {
  if (!endDate) return false;
  const end = new Date(endDate);
  const now = new Date();
  const diff = (end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= 7;
}

const SortIcon = ({ active, dir }: { active: boolean; dir: 'asc' | 'desc' }) => (
  <span className="ml-1 text-gray-400 text-[10px]">{active ? (dir === 'asc' ? '▲' : '▼') : '⇅'}</span>
);

export default function DashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Change password
  const [showChange, setShowChange] = useState(false);
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [cpMessage, setCpMessage] = useState<string | null>(null);

  // Filters / sort / pagination
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [sortCol, setSortCol] = useState<SortCol>('startDate');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);

  // Row expand
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  // Delete
  const [deleteTarget, setDeleteTarget] = useState<Booking | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Status update
  const [updatingId, setUpdatingId] = useState<string | null>(null);

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
      setBookings(data.bookings || []);
    } catch (err: any) {
      setError(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  // Filtered + sorted
  const filtered = useMemo(() => {
    let list = bookings;
    if (typeFilter !== 'all') list = list.filter(b => b.type === typeFilter);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(b =>
        (b.fullName || '').toLowerCase().includes(q) ||
        (b.phone || '').includes(q) ||
        (b.email || '').toLowerCase().includes(q) ||
        (b.id || '').toLowerCase().includes(q) ||
        (b.sport || b.planName || '').toLowerCase().includes(q)
      );
    }
    if (dateFrom) {
      list = list.filter(b => {
        const s = b.startDate || b.date || '';
        return s >= dateFrom;
      });
    }
    if (dateTo) {
      list = list.filter(b => {
        const s = b.startDate || b.date || '';
        return s <= dateTo;
      });
    }
    return [...list].sort((a, b) => {
      let av = '', bv = '';
      if (sortCol === 'startDate') { av = a.startDate || a.date || ''; bv = b.startDate || b.date || ''; }
      else if (sortCol === 'endDate') { av = a.endDate || ''; bv = b.endDate || ''; }
      else if (sortCol === 'fullName') { av = a.fullName || ''; bv = b.fullName || ''; }
      else if (sortCol === 'sport') { av = a.sport || a.planName || ''; bv = b.sport || b.planName || ''; }
      else if (sortCol === 'status') { av = a.status || a.planPrice || ''; bv = b.status || b.planPrice || ''; }
      else { av = (a as any)[sortCol] || ''; bv = (b as any)[sortCol] || ''; }
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [bookings, typeFilter, search, dateFrom, dateTo, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (col: SortCol) => {
    if (sortCol === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortCol(col); setSortDir('asc'); }
    setPage(1);
  };

  const exportCSV = () => {
    const headers = ['ID', 'Type', 'Name', 'Phone', 'Email', 'Sport / Plan', 'Batch / Time', 'Start Date', 'End Date', 'Status', 'Price', 'Notes'];
    const rows = filtered.map(b => [
      b.id,
      b.type,
      b.fullName || '',
      b.phone ? '\t' + b.phone : '',   // tab prefix forces Excel to treat as text
      b.email || '',
      b.sport || b.planName || '',
      [b.time, b.batch].filter(Boolean).join(', '),
      csvDate(b.startDate || b.date),
      b.type !== 'regular' ? csvDate(b.endDate) : '',
      b.type === 'regular' ? (b.status || '') : '',
      b.type !== 'regular' ? (b.planPrice || '') : '',
      b.notes || '',
    ]);
    const csv = [headers, ...rows]
      .map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'bookings.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = async (b: Booking) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/bookings?id=${encodeURIComponent(b.id)}&type=${b.type}`, { method: 'DELETE' });
      if (!res.ok) throw new Error();
      setBookings(prev => prev.filter(x => !(x.id === b.id && x.type === b.type)));
      setDeleteTarget(null);
    } catch {
      alert('Failed to delete booking');
    } finally {
      setDeleting(false);
    }
  };

  const handleStatusChange = async (b: Booking, newStatus: string) => {
    setUpdatingId(b.id);
    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: b.id, status: newStatus }),
      });
      if (!res.ok) throw new Error();
      setBookings(prev => prev.map(x => x.id === b.id && x.type === 'regular' ? { ...x, status: newStatus } : x));
    } catch {
      alert('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  // Pagination page numbers with ellipsis
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
    .reduce<(number | '...')[]>((acc, p, i, arr) => {
      if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('...');
      acc.push(p);
      return acc;
    }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between mb-8 gap-3">
          <h1 className="text-3xl font-black tracking-tight text-secondary uppercase italic flex items-center gap-2">
            <span className="inline-block w-2 h-8 bg-primary rounded-full mr-2"></span>
            Admin Dashboard
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <button className="px-3 py-2 rounded bg-green-600 text-white shadow text-sm font-semibold hover:bg-green-700 transition-colors" onClick={exportCSV}>↓ Export CSV</button>
            <button className="px-3 py-2 rounded bg-muted hover:bg-muted/80 shadow text-sm font-semibold transition-colors" onClick={() => { setDateFrom(''); setDateTo(''); setSearch(''); setPage(1); load(); }}>↻ Refresh</button>
            <button className="px-3 py-2 rounded bg-muted hover:bg-muted/80 shadow text-sm" onClick={() => window.location.href = '/'}>Home</button>
            <button className="px-3 py-2 rounded bg-primary text-white shadow text-sm" onClick={() => setShowChange(s => !s)}>{showChange ? 'Close' : 'Change Password'}</button>
            <button className="px-3 py-2 rounded bg-destructive text-white shadow text-sm" onClick={async () => { await fetch('/api/admin/logout', { method: 'POST' }); window.location.href = '/'; }}>Logout</button>
          </div>
        </div>

        {/* Change Password */}
        {showChange && (
          <div className="mb-8 p-6 border rounded-xl bg-white shadow-lg">
            <h2 className="font-bold mb-2 text-lg">Change Password</h2>
            {cpMessage && <p className={`text-sm mb-2 ${cpMessage === 'Password changed' ? 'text-green-600' : 'text-destructive'}`}>{cpMessage}</p>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <input type="password" placeholder="Current password" value={currentPwd} onChange={e => setCurrentPwd(e.target.value)} className="p-3 border rounded-lg" />
              <input type="password" placeholder="New password" value={newPwd} onChange={e => setNewPwd(e.target.value)} className="p-3 border rounded-lg" />
              <input type="password" placeholder="Confirm new password" value={confirmPwd} onChange={e => setConfirmPwd(e.target.value)} className="p-3 border rounded-lg" />
            </div>
            <div className="mt-4">
              <button className="px-6 py-2 bg-primary text-white rounded-lg shadow font-bold" onClick={async () => {
                setCpMessage(null);
                if (!currentPwd || !newPwd) { setCpMessage('Fill all fields'); return; }
                if (newPwd !== confirmPwd) { setCpMessage('Passwords do not match'); return; }
                try {
                  const res = await fetch('/api/admin/change-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ current: currentPwd, password: newPwd }) });
                  const body = await res.json().catch(() => ({}));
                  if (!res.ok) { setCpMessage(body?.message || 'Failed'); return; }
                  setCpMessage('Password changed');
                  setCurrentPwd(''); setNewPwd(''); setConfirmPwd('');
                } catch { setCpMessage('Request failed'); }
              }}>Update Password</button>
            </div>
          </div>
        )}

        {loading && <div className="flex justify-center items-center h-40"><span className="text-lg font-bold text-muted-foreground">Loading…</span></div>}
        {error && <div className="flex justify-center items-center h-40"><span className="text-lg font-bold text-destructive">{error}</span></div>}

        {!loading && !error && (
          <div className="bg-white rounded-xl shadow-lg p-6">

            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <h2 className="text-xl font-bold text-primary">Bookings</h2>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="text"
                  placeholder="Search name, phone, email…"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setPage(1); }}
                  className="border rounded-lg px-3 py-1.5 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <div className="flex items-center gap-1 border rounded-lg px-2 py-1">
                  <label className="text-[10px] font-semibold text-gray-400 uppercase whitespace-nowrap">Start</label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={e => { setDateFrom(e.target.value); setPage(1); }}
                    className="text-sm border-0 focus:outline-none bg-transparent"
                  />
                </div>
                <div className="flex items-center gap-1 border rounded-lg px-2 py-1">
                  <label className="text-[10px] font-semibold text-gray-400 uppercase whitespace-nowrap">End</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={e => { setDateTo(e.target.value); setPage(1); }}
                    className="text-sm border-0 focus:outline-none bg-transparent"
                  />
                </div>
                {(dateFrom || dateTo) && (
                  <button
                    onClick={() => { setDateFrom(''); setDateTo(''); setPage(1); }}
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors px-1"
                    title="Clear date filters"
                  >✕</button>
                )}
                <div className="flex rounded-lg overflow-hidden border text-sm">
                  {(['all', 'subscription', 'membership'] as TypeFilter[]).map(t => (
                    <button key={t} onClick={() => { setTypeFilter(t); setPage(1); }}
                      className={`px-3 py-1.5 capitalize font-semibold transition-colors ${typeFilter === t ? 'bg-primary text-white' : 'bg-white hover:bg-gray-50 text-gray-600'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse text-sm">
                <thead>
                  <tr className="text-left border-b bg-slate-50 text-xs">
                    {([
                      { col: 'id', label: 'ID' },
                      { col: 'type', label: 'Type' },
                      { col: 'fullName', label: 'Name' },
                      { col: 'sport', label: 'Sport / Plan' },
                    ] as { col: SortCol; label: string }[]).map(h => (
                      <th key={h.col} className="p-3 font-bold uppercase tracking-widest cursor-pointer select-none whitespace-nowrap" onClick={() => handleSort(h.col)}>
                        {h.label}<SortIcon active={sortCol === h.col} dir={sortDir} />
                      </th>
                    ))}
                    <th className="p-3 font-bold uppercase tracking-widest">Phone</th>
                    <th className="p-3 font-bold uppercase tracking-widest">Email</th>
                    <th className="p-3 font-bold uppercase tracking-widest">Batch / Time</th>
                    <th className="p-3 font-bold uppercase tracking-widest cursor-pointer select-none whitespace-nowrap" onClick={() => handleSort('startDate')}>
                      Start Date<SortIcon active={sortCol === 'startDate'} dir={sortDir} />
                    </th>
                    <th className="p-3 font-bold uppercase tracking-widest cursor-pointer select-none whitespace-nowrap" onClick={() => handleSort('endDate')}>
                      End Date<SortIcon active={sortCol === 'endDate'} dir={sortDir} />
                    </th>
                    <th className="p-3 font-bold uppercase tracking-widest cursor-pointer select-none whitespace-nowrap" onClick={() => handleSort('status')}>
                      Status / Price<SortIcon active={sortCol === 'status'} dir={sortDir} />
                    </th>
                    <th className="p-3 font-bold uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.length === 0 ? (
                    <tr>
                      <td colSpan={12} className="p-16 text-center">
                        <div className="flex flex-col items-center gap-2 text-gray-400">
                          <span className="text-4xl">📋</span>
                          <span className="text-base font-semibold">No bookings found{search || typeFilter !== 'all' ? ' matching your filters' : ''}.</span>
                          {(search || typeFilter !== 'all') && (
                            <button className="text-sm text-primary underline mt-1" onClick={() => { setSearch(''); setTypeFilter('all'); }}>Clear filters</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ) : paginated.flatMap(b => {
                    const expiring = isExpiringSoon(b.endDate);
                    const rowKey = b.id + b.type;
                    const isExpanded = expandedKey === rowKey;
                    return [
                      <tr
                        key={rowKey}
                        className={`border-b transition-colors cursor-pointer ${expiring ? 'bg-amber-50 hover:bg-amber-100/70' : 'hover:bg-blue-50/40'}`}
                        onClick={() => setExpandedKey(isExpanded ? null : rowKey)}
                      >
                        <td className="p-3 font-mono text-xs text-gray-500">{b.id}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${b.type === 'regular' ? 'bg-gray-100 text-gray-600' : b.type === 'subscription' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>
                            {b.type}
                          </span>
                        </td>
                        <td className="p-3 font-medium whitespace-nowrap">{b.fullName || '-'}</td>
                        <td className="p-3">{b.sport || b.planName || '-'}</td>
                        <td className="p-3 text-xs text-gray-600">{b.phone || '-'}</td>
                        <td className="p-3 text-xs text-gray-600 max-w-[140px] truncate">{b.email || '-'}</td>
                        <td className="p-3 text-xs">{[b.time, b.batch].filter(Boolean).join(', ') || '-'}</td>
                        <td className="p-3 whitespace-nowrap text-xs">{formatDate(b.startDate || b.date)}</td>
                        <td className="p-3 whitespace-nowrap text-xs">
                          {b.type !== 'regular' ? (
                            <span className={expiring ? 'text-amber-600 font-bold' : ''}>
                              {formatDate(b.endDate)}{expiring ? ' ⚠' : ''}
                            </span>
                          ) : '-'}
                        </td>
                        <td className="p-3" onClick={e => e.stopPropagation()}>
                          {b.type === 'regular' ? (
                            <select
                              value={b.status || 'pending'}
                              disabled={updatingId === b.id}
                              onChange={e => handleStatusChange(b, e.target.value)}
                              className={`text-xs rounded-full px-2 py-1 font-bold border-0 focus:ring-1 focus:ring-blue-300 cursor-pointer outline-none
                                ${b.status === 'confirmed' ? 'bg-green-100 text-green-700' : b.status === 'cancelled' ? 'bg-gray-100 text-gray-500' : 'bg-yellow-100 text-yellow-700'}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          ) : (
                            <span className="px-2 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700">{formatRupee(b.planPrice)}</span>
                          )}
                        </td>
                        <td className="p-3" onClick={e => e.stopPropagation()}>
                          <button
                            className="px-2 py-1 rounded bg-red-100 text-red-600 text-xs font-bold hover:bg-red-200 transition-colors"
                            onClick={() => setDeleteTarget(b)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>,
                      isExpanded && (
                        <tr key={rowKey + '_detail'} className="bg-blue-50/60 border-b">
                          <td colSpan={12} className="px-6 py-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                              <div><span className="text-[10px] font-semibold text-gray-400 uppercase">Phone</span><p className="font-medium mt-0.5">{b.phone || '-'}</p></div>
                              <div><span className="text-[10px] font-semibold text-gray-400 uppercase">Email</span><p className="font-medium mt-0.5 break-all">{b.email || '-'}</p></div>
                              <div><span className="text-[10px] font-semibold text-gray-400 uppercase">Venue</span><p className="font-medium mt-0.5">{b.venue || '-'}</p></div>
                              <div><span className="text-[10px] font-semibold text-gray-400 uppercase">Batch / Time</span><p className="font-medium mt-0.5">{[b.time, b.batch].filter(Boolean).join(', ') || '-'}</p></div>
                              <div><span className="text-[10px] font-semibold text-gray-400 uppercase">Plan</span><p className="font-medium mt-0.5">{b.planName || b.sport || '-'}</p></div>
                              <div><span className="text-[10px] font-semibold text-gray-400 uppercase">Price</span><p className="font-medium mt-0.5">{formatRupee(b.planPrice)}</p></div>
                              <div><span className="text-[10px] font-semibold text-gray-400 uppercase">Start Date</span><p className="font-medium mt-0.5">{formatDate(b.startDate || b.date)}</p></div>
                              <div><span className="text-[10px] font-semibold text-gray-400 uppercase">End Date</span><p className="font-medium mt-0.5">{b.endDate ? formatDate(b.endDate) : '-'}</p></div>
                              {b.notes && (
                                <div className="col-span-2 md:col-span-4">
                                  <span className="text-[10px] font-semibold text-gray-400 uppercase">Notes</span>
                                  <p className="font-medium mt-0.5">{b.notes}</p>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ),
                    ].filter(Boolean) as React.ReactNode[];
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-5 flex-wrap gap-2">
              <p className="text-sm text-gray-500">
                Showing {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} bookings
              </p>
              <div className="flex items-center gap-1">
                <button onClick={() => setPage(1)} disabled={page === 1} className="px-2 py-1 rounded border text-sm disabled:opacity-30 hover:bg-gray-50">«</button>
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 rounded border text-sm disabled:opacity-30 hover:bg-gray-50">‹</button>
                {pageNumbers.map((p, i) =>
                  p === '...' ? (
                    <span key={`e${i}`} className="px-2 py-1 text-sm text-gray-400">…</span>
                  ) : (
                    <button key={p} onClick={() => setPage(p as number)}
                      className={`px-3 py-1 rounded border text-sm font-semibold transition-colors ${page === p ? 'bg-primary text-white border-primary' : 'hover:bg-gray-50'}`}>
                      {p}
                    </button>
                  )
                )}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 rounded border text-sm disabled:opacity-30 hover:bg-gray-50">›</button>
                <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="px-2 py-1 rounded border text-sm disabled:opacity-30 hover:bg-gray-50">»</button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl p-6 max-w-sm w-full mx-4">
              <h3 className="font-bold text-lg mb-2">Delete Booking</h3>
              <p className="text-gray-600 mb-5 text-sm">
                Are you sure you want to delete booking <span className="font-mono font-bold">{deleteTarget.id}</span>
                {deleteTarget.fullName ? ` for ${deleteTarget.fullName}` : ''}? This cannot be undone.
              </p>
              <div className="flex gap-2 justify-end">
                <button className="px-4 py-2 rounded border text-sm font-semibold hover:bg-gray-50" onClick={() => setDeleteTarget(null)} disabled={deleting}>Cancel</button>
                <button className="px-4 py-2 rounded bg-destructive text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60" onClick={() => handleDelete(deleteTarget)} disabled={deleting}>
                  {deleting ? 'Deleting…' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
