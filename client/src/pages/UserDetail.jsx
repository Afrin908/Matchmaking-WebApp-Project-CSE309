import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/axios';

const INFO = [
  { key:'age',           label:'Age',            fmt: v=>v?`${v} years`:'—' },
  { key:'gender',        label:'Gender' },
  { key:'religion',      label:'Religion' },
  { key:'location',      label:'Location' },
  { key:'maritalStatus', label:'Marital Status' },
  { key:'education',     label:'Education' },
  { key:'university',    label:'University / College' },
  { key:'profession',    label:'Profession' },
];

export default function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: me } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reqStatus, setReqStatus] = useState(null);
  const [reqLoading, setReqLoading] = useState(false);

  useEffect(() => {
    API.get(`/users/${id}`)
      .then(r => { setProfile(r.data); setLoading(false); })
      .catch(() => { setLoading(false); navigate('/search'); });
    API.get('/match/sent').then(r => {
      const found = r.data.find(m => m.receiver._id===id || m.receiver===id);
      if (found) setReqStatus(found.status);
    }).catch(()=>{});
    // Also check incoming (they may have sent to me)
    API.get('/match/connections').then(r => {
      const conn = r.data.find(c => c.user._id===id);
      if (conn) setReqStatus('accepted');
    }).catch(()=>{});
  }, [id]);

  const sendRequest = async () => {
    setReqLoading(true);
    try {
      await API.post('/match/request', { receiverId: id });
      setReqStatus('pending');
    } catch (err) { alert(err.response?.data?.message||'Failed'); }
    finally { setReqLoading(false); }
  };

  if (loading) return <div className="spinner" style={{marginTop:'3rem'}}></div>;
  if (!profile) return null;

  const initials = (profile.name||'?').split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);
  const isSelf = me?._id === id;

  const ActionBtn = () => {
    if (isSelf)            return <button className="btn btn-ghost" onClick={() => navigate('/profile')}>✏️  Edit My Profile</button>;
    if (reqStatus==='pending')  return <button className="btn btn-ghost" disabled>⏳ Request Pending</button>;
    if (reqStatus==='accepted') return <button className="btn btn-primary" onClick={() => navigate(`/chat?with=${id}`)}>💬 Message</button>;
    if (reqStatus==='rejected') return <button className="btn btn-ghost" disabled>Request Rejected</button>;
    return <button className="btn btn-primary" onClick={sendRequest} disabled={reqLoading}>{reqLoading?'Sending...':'💌 Send Match Request'}</button>;
  };

  return (
    <div className="page">
      <button className="btn btn-ghost btn-sm" onClick={() => navigate(-1)} style={{marginBottom:'1.25rem'}}>← Back to Search</button>

      <div className="profile-detail">
        {/* LEFT */}
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="profile-avatar-lg">
            {profile.photo
              ? <img src={profile.photo} alt={profile.name} style={{width:'100%',height:'100%',objectFit:'cover'}}/>
              : <span>{initials}</span>
            }
          </div>
          <div className="card" style={{textAlign:'center'}}>
            <div style={{fontFamily:'var(--font-serif)',fontSize:22,fontWeight:700,color:'var(--navy)',marginBottom:4}}>{profile.name}</div>
            {profile.isVerified && <div style={{fontSize:12,color:'var(--teal-dark)',fontWeight:600,marginBottom:10}}>✓ Verified Profile</div>}
            {profile.bio && <p style={{fontSize:13.5,color:'var(--gray)',lineHeight:1.65,marginBottom:'1rem',textAlign:'left'}}>{profile.bio}</p>}
            <ActionBtn/>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <div className="card">
            <div style={{fontFamily:'var(--font-serif)',fontSize:20,fontWeight:600,color:'var(--navy)',marginBottom:'1rem',paddingBottom:'0.6rem',borderBottom:'1px solid var(--border)'}}>Profile Details</div>
            <div className="profile-info-grid">
              {INFO.map(row => (
                <div className="profile-info-item" key={row.key}>
                  <div className="profile-info-label">{row.label}</div>
                  <div className="profile-info-val">{row.fmt ? row.fmt(profile[row.key]) : (profile[row.key]||'—')}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Compatibility */}
          <div className="card">
            <div style={{fontFamily:'var(--font-serif)',fontSize:18,fontWeight:600,color:'var(--navy)',marginBottom:'0.75rem'}}>Compatibility Rating</div>
            <p style={{fontSize:13,color:'var(--gray)',marginBottom:'0.75rem'}}>Profile alignment based on shared values, location, and background.</p>
            <div style={{background:'var(--bg)',borderRadius:'var(--radius-sm)',padding:14}}>
              <div style={{height:12,borderRadius:6,background:'linear-gradient(90deg,#E24B4A,#EF9F27,#EACC1A,#639922,#1D9E75)',position:'relative',marginBottom:8}}>
                <div style={{position:'absolute',top:-5,left:'65%',width:3,height:22,background:'var(--navy)',borderRadius:2,boxShadow:'0 0 0 3px rgba(4,44,83,0.15)'}}></div>
              </div>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'var(--gray)'}}>
                <span>Ingredient</span><span>Culinary</span><span>Premium</span><span style={{color:'var(--teal-dark)',fontWeight:700}}>Ceremonial</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {(profile.education||profile.profession||profile.university) && (
            <div className="card">
              <div style={{fontFamily:'var(--font-serif)',fontSize:18,fontWeight:600,color:'var(--navy)',marginBottom:'0.75rem'}}>Background</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                {profile.education   && <span className="tag">{profile.education}</span>}
                {profile.profession  && <span className="tag tag-blue">{profile.profession}</span>}
                {profile.university  && <span className="tag tag-gray">{profile.university}</span>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
