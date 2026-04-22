import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../utils/axios';

// ── Shared constants (matches Search.jsx dropdowns exactly) ──
export const RELIGIONS  = ['Islam','Hinduism','Christianity','Buddhism','Judaism','Other'];
export const LOCATIONS  = ['Dhaka','Chittagong','Rajshahi','Khulna','Sylhet','Barisal','Rangpur','Mymensingh','Comilla','Narayanganj'];
export const UNIVERSITIES = [
  'BUET','DU (University of Dhaka)','BRACU','NSU','IUB','AIUB',
  'RUET','University of Chittagong','Jahangirnagar University',
  'Rajshahi University (RU)','Khulna University (KU)','BAU','IBA DU',
  'DMCH','University of Sylhet','Other',
];
export const EDUCATIONS = ["SSC","HSC","Diploma","Bachelor's","Master's","MBA","MBBS","PhD","Other"];
export const PROFESSIONS = ['Student','Software Engineer','Doctor','Lawyer','Teacher / Lecturer','Business Analyst','Marketing Manager','Pharmacist','Civil Engineer','Graphic Designer','IT Consultant','Medical Officer','Accountant','Banker','Other'];

const FIELDS = [
  { name:'name',          label:'Full Name',           type:'text',   col:'full' },
  { name:'age',           label:'Age',                 type:'number' },
  { name:'gender',        label:'Gender',              type:'select', options:['Male','Female','Other'] },
  { name:'religion',      label:'Religion',            type:'select', options:RELIGIONS },
  { name:'location',      label:'City / Division',     type:'select', options:LOCATIONS },
  { name:'maritalStatus', label:'Marital Status',      type:'select', options:['Never Married','Divorced','Widowed'] },
  { name:'education',     label:'Education Level',     type:'select', options:EDUCATIONS },
  { name:'university',    label:'University / College',type:'select', options:UNIVERSITIES },
  { name:'profession',    label:'Profession',          type:'select', options:PROFESSIONS },
  { name:'bio',           label:'About Me',            type:'textarea', col:'full', placeholder:'Tell potential matches about yourself, your interests, and what you are looking for...' },
  { name:'photo',         label:'Profile Photo URL',   type:'text',   col:'full', placeholder:'https://...' },
];

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    API.get('/users/me').then(r => { setForm(r.data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = async e => {
    e.preventDefault();
    setSaving(true); setSuccess(false); setError('');
    try {
      const { data } = await API.put('/users/me', form);
      updateUser(data);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save profile.');
    } finally { setSaving(false); }
  };

  if (loading) return <div className="spinner" style={{marginTop:'3rem'}}></div>;

  const initials = (form.name || user?.name || '?').split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);

  return (
    <div className="page">
      <h1 className="page-title">My Profile</h1>
      <p className="page-sub">Keep your profile complete to attract better matches.</p>

      <div style={{display:'grid',gridTemplateColumns:'200px 1fr',gap:'1.5rem',alignItems:'start'}}>
        {/* LEFT CARD */}
        <div className="card" style={{textAlign:'center',position:'sticky',top:'84px'}}>
          <div style={{width:110,height:110,borderRadius:'50%',background:'linear-gradient(135deg,var(--teal-light),var(--blue-light))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:36,fontFamily:'var(--font-serif)',fontWeight:700,margin:'0 auto 1rem',overflow:'hidden',border:'3px solid var(--teal-light)'}}>
            {form.photo ? <img src={form.photo} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/> : initials}
          </div>
          <div style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:16,color:'var(--navy)'}}>{form.name||user?.name}</div>
          <div style={{fontSize:12.5,color:'var(--gray)',marginTop:3}}>{form.email||user?.email}</div>
          {form.location && <div style={{fontSize:12,color:'var(--teal-dark)',marginTop:6,fontWeight:500}}>📍 {form.location}</div>}
          {user?.isAdmin && <span className="badge" style={{marginTop:10,display:'inline-block',background:'#6AAEB4',color:'white'}}>Admin</span>}
          {form.isVerified && <div style={{fontSize:11,color:'var(--teal-dark)',fontWeight:600,marginTop:8}}>✓ Verified</div>}
        </div>

        {/* FORM */}
        <div className="card">
          <div style={{fontFamily:'var(--font-serif)',fontSize:19,color:'var(--navy)',fontWeight:600,marginBottom:'1.25rem',paddingBottom:'0.75rem',borderBottom:'1px solid var(--border)'}}>Edit Profile Details</div>
          {success && <div className="alert alert-success">✅ Profile updated successfully!</div>}
          {error   && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSave}>
            <div className="profile-edit-grid">
              {FIELDS.map(f => (
                <div key={f.name} className="form-group" style={f.col==='full'?{gridColumn:'1/-1'}:{}}>
                  <label className="form-label">{f.label}</label>
                  {f.type==='select' ? (
                    <select className="form-select" name={f.name} value={form[f.name]||''} onChange={handleChange}>
                      <option value="">Select {f.label}...</option>
                      {f.options.map(o => <option key={o}>{o}</option>)}
                    </select>
                  ) : f.type==='textarea' ? (
                    <textarea className="form-textarea" name={f.name} value={form[f.name]||''} onChange={handleChange} placeholder={f.placeholder||''} rows={4}/>
                  ) : (
                    <input className="form-input" type={f.type} name={f.name} value={form[f.name]||''} onChange={handleChange} placeholder={f.placeholder||''}/>
                  )}
                </div>
              ))}
            </div>
            <div style={{marginTop:'1.25rem',display:'flex',justifyContent:'flex-end',gap:10}}>
              <button className="btn btn-ghost btn-sm" type="button" onClick={() => API.get('/users/me').then(r=>setForm(r.data))}>Reset</button>
              <button className="btn btn-primary" type="submit" disabled={saving}>
                {saving ? 'Saving...' : '💾  Save Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
