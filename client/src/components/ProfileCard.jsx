import { useNavigate } from 'react-router-dom';

const getInitials = name => (name||'?').split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2);

export default function ProfileCard({ user, actionButton }) {
  const navigate = useNavigate();
  return (
    <div className="profile-card" onClick={() => navigate(`/user/${user._id}`)}>
      <div className="profile-card-avatar">
        {user.photo
          ? <img src={user.photo} alt={user.name} onError={e=>{e.target.style.display='none';e.target.nextSibling.style.display='flex';}}/>
          : null
        }
        <span className="profile-card-avatar-initials" style={{display: user.photo ? 'none' : 'flex'}}>
          {getInitials(user.name)}
        </span>
      </div>
      <div className="profile-card-body">
        <div className="profile-card-name">{user.name}</div>
        <div className="profile-card-meta">
          {[user.age&&`${user.age} yrs`, user.location, user.religion].filter(Boolean).join(' · ')}
        </div>
        <div className="profile-card-tags">
          {user.gender      && <span className="tag">{user.gender}</span>}
          {user.maritalStatus && <span className="tag tag-blue">{user.maritalStatus}</span>}
          {user.education   && <span className="tag tag-gray">{user.education}</span>}
          {user.isVerified  && <span className="tag" style={{background:'#E6F1FB',color:'var(--blue)'}}>✓ Verified</span>}
        </div>
        {actionButton && (
          <div style={{marginTop:10}} onClick={e=>e.stopPropagation()}>{actionButton}</div>
        )}
      </div>
    </div>
  );
}
