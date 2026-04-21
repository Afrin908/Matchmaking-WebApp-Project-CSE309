import { useState, useEffect } from 'react';
import API from '../utils/axios';

const Avatar = ({ name }) => (
  <div className="request-avatar">
    {name?.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) || '?'}
  </div>
);

export default function Requests() {
  const [incoming, setIncoming] = useState([]);
  const [sent, setSent] = useState([]);
  const [tab, setTab] = useState('incoming');
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState({});

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [inc, snt] = await Promise.all([
        API.get('/match/requests'),
        API.get('/match/sent'),
      ]);
      setIncoming(inc.data);
      setSent(snt.data);
    } catch {} finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const respond = async (matchId, status) => {
    setActing(p => ({ ...p, [matchId]: status }));
    try {
      await API.put(`/match/${matchId}/respond`, { status });
      setIncoming(p => p.filter(r => r._id !== matchId));
    } catch (err) {
      alert(err.response?.data?.message || 'Action failed');
    } finally { setActing(p => ({ ...p, [matchId]: null })); }
  };

  const TabBtn = ({ id, label, count }) => (
    <button
      onClick={() => setTab(id)}
      style={{
        padding:'9px 18px', borderRadius:8, border:'none', cursor:'pointer',
        fontFamily:'var(--font)', fontSize:14, fontWeight:500,
        background: tab===id ? 'var(--teal)' : 'var(--white)',
        color: tab===id ? 'white' : 'var(--gray-dark)',
        border: tab===id ? 'none' : '1px solid var(--border)',
      }}
    >
      {label} {count > 0 && <span style={{background:tab===id?'rgba(255,255,255,0.3)':'var(--teal-light)',color:tab===id?'white':'var(--teal-dark)',borderRadius:20,padding:'1px 7px',fontSize:11,marginLeft:4}}>{count}</span>}
    </button>
  );

  return (
    <div className="page">
      <h1 className="page-title">Match Requests</h1>
      <p className="page-sub">Manage who wants to connect with you.</p>

      <div style={{display:'flex',gap:8,marginBottom:'1.5rem'}}>
        <TabBtn id="incoming" label="Incoming" count={incoming.length} />
        <TabBtn id="sent" label="Sent" count={sent.length} />
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : tab === 'incoming' ? (
        incoming.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <p style={{fontSize:16,fontWeight:500}}>No incoming requests</p>
            <p style={{fontSize:13,marginTop:4,color:'var(--gray)'}}>When someone sends you a match request, it'll appear here.</p>
          </div>
        ) : (
          <div>
            {incoming.map(req => (
              <div className="request-item" key={req._id}>
                <Avatar name={req.sender?.name} />
                <div className="request-info">
                  <div className="request-name">{req.sender?.name}</div>
                  <div className="request-meta">
                    {[req.sender?.age && `${req.sender.age} yrs`, req.sender?.location, req.sender?.religion, req.sender?.gender].filter(Boolean).join(' · ')}
                  </div>
                </div>
                <div className="request-actions">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => respond(req._id, 'accepted')}
                    disabled={!!acting[req._id]}
                  >
                    {acting[req._id] === 'accepted' ? '...' : '✓ Accept'}
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => respond(req._id, 'rejected')}
                    disabled={!!acting[req._id]}
                  >
                    {acting[req._id] === 'rejected' ? '...' : '✕ Reject'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        sent.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📤</div>
            <p style={{fontSize:16,fontWeight:500}}>No sent requests</p>
            <p style={{fontSize:13,marginTop:4,color:'var(--gray)'}}>Browse profiles and send match requests to get started.</p>
          </div>
        ) : (
          <div>
            {sent.map(req => (
              <div className="request-item" key={req._id}>
                <Avatar name={req.receiver?.name} />
                <div className="request-info">
                  <div className="request-name">{req.receiver?.name}</div>
                  <div className="request-meta">
                    {[req.receiver?.age && `${req.receiver.age} yrs`, req.receiver?.location, req.receiver?.religion].filter(Boolean).join(' · ')}
                  </div>
                </div>
                <span className={`badge badge-${req.status}`} style={{textTransform:'capitalize'}}>{req.status}</span>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
