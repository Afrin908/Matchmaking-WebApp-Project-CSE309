import { useState, useEffect } from 'react';
import API from '../utils/axios';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    API.get('/users/all')
      .then(r => setUsers(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const suspend = async (id) => {
    if (!window.confirm('Suspend this user?')) return;
    try {
      await API.put(`/users/${id}/suspend`);
      setUsers(p => p.map(u => u._id === id ? { ...u, isActive: false } : u));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed');
    }
  };

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="spinner" style={{marginTop:'3rem'}}></div>;

  return (
    <div className="page">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'1.5rem',flexWrap:'wrap',gap:12}}>
        <div>
          <h1 className="page-title">Admin Panel</h1>
          <p style={{color:'var(--gray)',fontSize:14}}>Monitor and manage all registered users.</p>
        </div>
        <div style={{display:'flex',gap:'12px'}}>
          <div className="card" style={{padding:'12px 20px',textAlign:'center',minWidth:90}}>
            <div style={{fontSize:22,fontWeight:600,color:'var(--navy)'}}>{users.length}</div>
            <div style={{fontSize:11,color:'var(--gray)'}}>Total Users</div>
          </div>
          <div className="card" style={{padding:'12px 20px',textAlign:'center',minWidth:90}}>
            <div style={{fontSize:22,fontWeight:600,color:'var(--teal)'}}>{users.filter(u=>u.isActive).length}</div>
            <div style={{fontSize:11,color:'var(--gray)'}}>Active</div>
          </div>
          <div className="card" style={{padding:'12px 20px',textAlign:'center',minWidth:90}}>
            <div style={{fontSize:22,fontWeight:600,color:'#A32D2D'}}>{users.filter(u=>!u.isActive).length}</div>
            <div style={{fontSize:11,color:'var(--gray)'}}>Suspended</div>
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{marginBottom:'1rem'}}>
          <input className="form-input" placeholder="🔍 Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} style={{maxWidth:340}} />
        </div>
        <div style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',fontSize:14}}>
            <thead>
              <tr style={{borderBottom:'1px solid var(--border)'}}>
                {['Name','Email','Age','Gender','Location','Status','Action'].map(h => (
                  <th key={h} style={{textAlign:'left',padding:'8px 12px',color:'var(--gray)',fontSize:12,fontWeight:500,textTransform:'uppercase',letterSpacing:'.04em'}}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u._id} style={{borderBottom:'1px solid var(--border)',opacity:u.isActive?1:0.5}}>
                  <td style={{padding:'10px 12px',fontWeight:500,color:'var(--navy)'}}>{u.name}</td>
                  <td style={{padding:'10px 12px',color:'var(--gray)'}}>{u.email}</td>
                  <td style={{padding:'10px 12px'}}>{u.age||'—'}</td>
                  <td style={{padding:'10px 12px'}}>{u.gender||'—'}</td>
                  <td style={{padding:'10px 12px'}}>{u.location||'—'}</td>
                  <td style={{padding:'10px 12px'}}>
                    {u.isAdmin
                      ? <span className="badge" style={{background:'#6AAEB4',color:'white'}}>Admin</span>
                      : u.isActive
                        ? <span className="badge badge-accepted">Active</span>
                        : <span className="badge badge-rejected">Suspended</span>
                    }
                  </td>
                  <td style={{padding:'10px 12px'}}>
                    {!u.isAdmin && u.isActive && (
                      <button className="btn btn-danger btn-sm" onClick={() => suspend(u._id)}>Suspend</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div style={{textAlign:'center',padding:'2rem',color:'var(--gray)'}}>No users found</div>
          )}
        </div>
      </div>
    </div>
  );
}
