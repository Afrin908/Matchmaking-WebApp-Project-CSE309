import { useState, useEffect } from 'react';
import API from '../utils/axios';
import ProfileCard from '../components/ProfileCard';
import { RELIGIONS, LOCATIONS, EDUCATIONS } from './Profile';

export default function Search() {
  const [filters, setFilters] = useState({ gender:'', religion:'', location:'', maritalStatus:'', education:'', minAge:'', maxAge:'', name:'' });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sentRequests, setSentRequests] = useState({});
  const [hasSearched, setHasSearched] = useState(false);

  const fetchUsers = async (f = filters) => {
    setLoading(true); setHasSearched(true);
    const params = Object.fromEntries(Object.entries(f).filter(([,v]) => v));
    try {
      const { data } = await API.get('/users/search', { params });
      setUsers(data);
    } catch {} finally { setLoading(false); }
  };

  const fetchSent = async () => {
    try {
      const { data } = await API.get('/match/sent');
      const map = {};
      data.forEach(m => { map[m.receiver._id] = m.status; });
      setSentRequests(map);
    } catch {}
  };

  useEffect(() => { fetchUsers(); fetchSent(); }, []);

  const handleChange = e => setFilters(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSearch = e => { e.preventDefault(); fetchUsers(); };
  const handleReset  = () => {
    const fresh = { gender:'',religion:'',location:'',maritalStatus:'',education:'',minAge:'',maxAge:'',name:'' };
    setFilters(fresh); fetchUsers(fresh);
  };

  const sendRequest = async (userId) => {
    try {
      await API.post('/match/request', { receiverId: userId });
      setSentRequests(p => ({ ...p, [userId]: 'pending' }));
    } catch (err) { alert(err.response?.data?.message || 'Failed to send request'); }
  };

  const getActionBtn = (userId) => {
    const s = sentRequests[userId];
    if (s==='pending')  return <button className="btn btn-ghost btn-sm" disabled>⏳ Pending</button>;
    if (s==='accepted') return <button className="btn btn-sm" style={{background:'var(--teal-light)',color:'var(--teal-dark)'}} disabled>✅ Connected</button>;
    if (s==='rejected') return <button className="btn btn-ghost btn-sm" disabled>Rejected</button>;
    return <button className="btn btn-primary btn-sm" onClick={() => sendRequest(userId)}>💌 Send Request</button>;
  };

  return (
    <div className="page">
      <h1 className="page-title">Browse Profiles</h1>
      <p className="page-sub">Use the filters below to find your compatible match.</p>

      <div className="search-bar">
        <form onSubmit={handleSearch}>
          {/* Row 1 */}
          <div className="search-filters" style={{marginBottom:10}}>
            <div className="search-filter-group" style={{flexBasis:200,flexGrow:3}}>
              <span className="search-filter-label">Search by Name</span>
              <input className="form-input" name="name" value={filters.name} onChange={handleChange} placeholder="Type a name..."/>
            </div>
            <div className="search-filter-group">
              <span className="search-filter-label">Gender</span>
              <select className="form-select" name="gender" value={filters.gender} onChange={handleChange}>
                <option value="">Any</option>
                <option>Male</option><option>Female</option><option>Other</option>
              </select>
            </div>
            <div className="search-filter-group">
              <span className="search-filter-label">Religion</span>
              <select className="form-select" name="religion" value={filters.religion} onChange={handleChange}>
                <option value="">Any</option>
                {RELIGIONS.map(r=><option key={r}>{r}</option>)}
              </select>
            </div>
            <div className="search-filter-group">
              <span className="search-filter-label">Location</span>
              <select className="form-select" name="location" value={filters.location} onChange={handleChange}>
                <option value="">Any</option>
                {LOCATIONS.map(l=><option key={l}>{l}</option>)}
              </select>
            </div>
          </div>
          {/* Row 2 */}
          <div className="search-filters">
            <div className="search-filter-group">
              <span className="search-filter-label">Marital Status</span>
              <select className="form-select" name="maritalStatus" value={filters.maritalStatus} onChange={handleChange}>
                <option value="">Any</option>
                <option>Never Married</option><option>Divorced</option><option>Widowed</option>
              </select>
            </div>
            <div className="search-filter-group">
              <span className="search-filter-label">Education</span>
              <select className="form-select" name="education" value={filters.education} onChange={handleChange}>
                <option value="">Any</option>
                {EDUCATIONS.map(e=><option key={e}>{e}</option>)}
              </select>
            </div>
            <div className="search-filter-group" style={{maxWidth:90}}>
              <span className="search-filter-label">Min Age</span>
              <input className="form-input" type="number" name="minAge" value={filters.minAge} onChange={handleChange} placeholder="18" min="18"/>
            </div>
            <div className="search-filter-group" style={{maxWidth:90}}>
              <span className="search-filter-label">Max Age</span>
              <input className="form-input" type="number" name="maxAge" value={filters.maxAge} onChange={handleChange} placeholder="60"/>
            </div>
            <div style={{display:'flex',gap:8,alignItems:'flex-end'}}>
              <button className="btn btn-primary" type="submit">🔍 Search</button>
              <button className="btn btn-ghost" type="button" onClick={handleReset}>Reset</button>
            </div>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="spinner"></div>
      ) : users.length===0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p style={{fontSize:16,fontWeight:600,color:'var(--navy)'}}>No profiles found</p>
          <p style={{fontSize:13,marginTop:4}}>Try adjusting or resetting your filters.</p>
        </div>
      ) : (
        <>
          <p style={{fontSize:13,color:'var(--gray)',marginBottom:'1rem',fontWeight:500}}>{users.length} profile{users.length!==1?'s':''} found</p>
          <div className="grid-4">
            {users.map(u => <ProfileCard key={u._id} user={u} actionButton={getActionBtn(u._id)}/>)}
          </div>
        </>
      )}
    </div>
  );
}
