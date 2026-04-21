import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/axios';

export default function Connections() {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/match/connections')
      .then(r => setConnections(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="spinner" style={{marginTop:'3rem'}}></div>;

  return (
    <div className="page">
      <h1 className="page-title">My Connections</h1>
      <p className="page-sub">People you've matched with — start a conversation!</p>

      {connections.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🤝</div>
          <p style={{fontSize:16,fontWeight:500}}>No connections yet</p>
          <p style={{fontSize:13,marginTop:4,color:'var(--gray)'}}>When someone accepts your request (or vice versa), they'll appear here.</p>
          <button className="btn btn-primary" style={{marginTop:'1rem'}} onClick={() => navigate('/search')}>Browse Profiles</button>
        </div>
      ) : (
        <div className="grid-3">
          {connections.map(c => {
            const u = c.user;
            const initials = u.name?.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2) || '?';
            return (
              <div key={c.matchId} className="card" style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
                <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
                  <div style={{width:52,height:52,borderRadius:'50%',background:'linear-gradient(135deg,var(--teal-light),var(--blue-light))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,overflow:'hidden',flexShrink:0}}>
                    {u.photo ? <img src={u.photo} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/> : initials}
                  </div>
                  <div>
                    <div style={{fontWeight:600,color:'var(--navy)',fontSize:15}}>{u.name}</div>
                    <div style={{fontSize:12,color:'var(--gray)'}}>
                      {[u.age && `${u.age} yrs`, u.location].filter(Boolean).join(' · ')}
                    </div>
                  </div>
                </div>
                <div style={{display:'flex',gap:'2px',flexWrap:'wrap'}}>
                  {u.religion && <span className="tag">{u.religion}</span>}
                  {u.gender && <span className="tag tag-blue">{u.gender}</span>}
                  {u.maritalStatus && <span className="tag tag-gray">{u.maritalStatus}</span>}
                </div>
                <div style={{display:'flex',gap:8}}>
                  <button className="btn btn-primary btn-sm" style={{flex:1}} onClick={() => navigate(`/chat?with=${u._id}`)}>💬 Message</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => navigate(`/user/${u._id}`)}>View</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
