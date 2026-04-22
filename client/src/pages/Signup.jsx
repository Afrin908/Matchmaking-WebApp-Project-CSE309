import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const DecorElement = ({ style, className }) => (
  <div style={style} className={className}></div>
);

export default function Signup() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', password:'', confirmPassword:'', age:'', gender:'' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) return setError('Passwords do not match');
    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password, age: parseInt(form.age), gender: form.gender });
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-left">
        <div style={{position:'relative',width:'280px',height:'280px',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:'2rem'}}>
          {/* Decorative elements */}
          <DecorElement style={{position:'absolute',width:14,height:14,borderRadius:'50%',background:'#6AAEB4',top:20,left:30,animation:'float 3s ease-in-out infinite'}} />
          <DecorElement style={{position:'absolute',width:10,height:10,borderRadius:'50%',background:'#4A8A92',top:40,right:50,animation:'float 4s ease-in-out infinite 0.5s'}} />
          <DecorElement style={{position:'absolute',width:12,height:12,borderRadius:'50%',background:'#6AAEB4',bottom:30,left:40,animation:'float 3.5s ease-in-out infinite 1s'}} />
          <DecorElement style={{position:'absolute',width:8,height:8,borderRadius:'50%',background:'#4A8A92',bottom:50,right:30,animation:'float 4.5s ease-in-out infinite 1.5s'}} />
          <DecorElement style={{position:'absolute',width:16,height:16,top:10,right:20,color:'#6AAEB4',fontSize:24,animation:'float 3.8s ease-in-out infinite 0.2s'}}> + </DecorElement>
          <DecorElement style={{position:'absolute',width:16,height:16,bottom:20,right:50,color:'#6AAEB4',fontSize:24,animation:'float 4.2s ease-in-out infinite 1.2s'}}> ✓ </DecorElement>
          <DecorElement style={{position:'absolute',width:18,height:18,top:'50%',left:10,color:'#6AAEB4',fontSize:28,animation:'float 3.3s ease-in-out infinite 0.8s'}}> ◆ </DecorElement>
          
          {/* Logo */}
          <img src={logo} alt="Matchmaking" style={{height:180,width:'auto',position:'relative',zIndex:1}} />
        </div>
        <div className="auth-brand" style={{fontSize:28}}>Matchmaking</div>
        <p className="auth-brand-sub">Join thousands finding their perfect match today.</p>
      </div>
      <div className="auth-right">
        <div className="auth-form">
          <h1 className="auth-title">Sign Up</h1>
          <p className="auth-sub">Create your account and start your journey.</p>
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="Afrin Mahmud" required />
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
              <div className="form-group">
                <label className="form-label">Age</label>
                <input className="form-input" type="number" name="age" value={form.age} onChange={handleChange} placeholder="25" min="18" max="80" />
              </div>
              <div className="form-group">
                <label className="form-label">Gender</label>
                <select className="form-select" name="gender" value={form.gender} onChange={handleChange}>
                  <option value="">Select</option>
                  <option>Male</option><option>Female</option><option>Other</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" name="password" value={form.password} onChange={handleChange} placeholder="••••••••" required minLength="6" />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input className="form-input" type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" required />
            </div>
            <button className="btn btn-primary btn-full" type="submit" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          <p className="auth-link" style={{marginTop:'1.25rem'}}>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
