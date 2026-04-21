import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const active = path => pathname === path;

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" style={{fontFamily:'var(--font-serif)',fontSize:19,fontWeight:700,color:'var(--navy)',letterSpacing:'-0.3px'}}>
          M21 <span style={{color:'var(--teal)'}}>Matchmaking</span>
        </Link>
      </div>

      {user ? (
        <>
          <div className="navbar-links">
            {[
              ['/search','Browse'],
              ['/requests','Requests'],
              ['/connections','Connections'],
              ['/chat','Messages'],
            ].map(([path,label])=>(
              <Link key={path} to={path} style={active(path)?{background:'var(--teal-light)',color:'var(--teal-dark)',borderRadius:8,padding:'7px 15px',fontWeight:600,fontSize:'13.5px'}:{}}>
                {label}
              </Link>
            ))}
            {user.isAdmin && <Link to="/admin" style={active('/admin')?{background:'var(--teal-light)',color:'var(--teal-dark)',borderRadius:8,padding:'7px 15px',fontWeight:600,fontSize:'13.5px'}:{}}>Admin</Link>}
          </div>
          <div className="navbar-actions">
            <Link to="/profile">
              <button className="btn btn-ghost btn-sm" style={{display:'flex',alignItems:'center',gap:7}}>
                <div style={{width:26,height:26,borderRadius:'50%',background:'var(--teal-light)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:700,color:'var(--teal-dark)',overflow:'hidden',flexShrink:0}}>
                  {user.photo ? <img src={user.photo} style={{width:'100%',height:'100%',objectFit:'cover'}} alt=""/> : (user.name||'?').charAt(0).toUpperCase()}
                </div>
                <span style={{maxWidth:90,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{user.name}</span>
              </button>
            </Link>
            <button className="btn btn-sm" style={{background:'var(--navy)',color:'white',border:'none'}} onClick={handleLogout}>Log Out</button>
          </div>
        </>
      ) : (
        <div className="navbar-actions">
          <Link to="/login"><button className="btn btn-ghost btn-sm">Log In</button></Link>
          <Link to="/signup"><button className="btn btn-primary btn-sm">Sign Up</button></Link>
        </div>
      )}
    </nav>
  );
}
