import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';

const PREVIEW_PROFILES = [
  { name:'Anika Rahman',    age:23, location:'Dhaka',      photo:'https://randomuser.me/api/portraits/women/11.jpg' },
  { name:'Fatima Islam',    age:25, location:'Chittagong', photo:'https://randomuser.me/api/portraits/women/32.jpg' },
  { name:'Tahsin Rahman',   age:28, location:'Dhaka',      photo:'https://randomuser.me/api/portraits/men/15.jpg' },
  { name:'Nadia Chowdhury', age:27, location:'Dhaka',      photo:'https://randomuser.me/api/portraits/women/68.jpg' },
  { name:'Mahir Islam',     age:31, location:'Sylhet',     photo:'https://randomuser.me/api/portraits/men/22.jpg' },
  { name:'Priya Das',       age:24, location:'Dhaka',      photo:'https://randomuser.me/api/portraits/women/45.jpg' },
];

const FAQS = [
  { q:'Is my personal information safe?', a:'Yes. Your profile details are only visible to matched users. We use industry-standard encryption and admin monitoring to protect all data.' },
  { q:'How does the match request system work?', a:'Browse profiles, send a match request to someone you like. If they accept, you both become connections and can message each other freely.' },
  { q:'Can I see who viewed my profile?', a:'Currently, the platform focuses on mutual connections. You can see who sent you requests from the Requests tab.' },
  { q:'How do I report a suspicious profile?', a:'Use the report button on any profile page. Our admin team reviews all reports within 24 hours and takes appropriate action.' },
  { q:'Is there a mobile app?', a:'The web app is fully responsive and works great on mobile browsers. A dedicated app is on the roadmap.' },
];

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div>
      {/* ── 1. HERO ── */}
      <div className="hero-section">
        <div className="hero-inner">
          <div>
            <p style={{fontSize:13,fontWeight:600,color:'#ffffff',textTransform:'uppercase',letterSpacing:'.1em',marginBottom:12}}>Bangladesh's Trusted Matchmaking Platform</p>
            <h1 className="hero-title">Find Your <span className="accent">Perfect Life</span> Partner</h1>
            <p className="hero-desc">A structured, secure, and modern approach to finding a compatible spouse. Verified profiles, smart search, and private messaging — all in one place.</p>
            <div className="hero-cta">
              {user ? (
                <button className="btn-hero-primary" onClick={() => navigate('/search')}>Browse Profiles →</button>
              ) : (
                <>
                  <Link to="/signup"><button className="btn-hero-primary">Get Started — Free</button></Link>
                  <Link to="/login"><button className="btn-hero-outline">Sign In</button></Link>
                </>
              )}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-stat-row">
              <div className="hero-stat"><div className="hero-stat-num">2,400+</div><div className="hero-stat-label">Active Profiles</div></div>
              <div className="hero-stat"><div className="hero-stat-num">860+</div><div className="hero-stat-label">Successful Matches</div></div>
              <div className="hero-stat"><div className="hero-stat-num">98%</div><div className="hero-stat-label">Verified Users</div></div>
            </div>
            <div className="hero-card">
              <div className="hero-card-title">Recently Active</div>
              <div style={{display:'flex',flexDirection:'column',gap:10,marginTop:10}}>
                {PREVIEW_PROFILES.slice(0,3).map(p=>(
                  <div key={p.name} style={{display:'flex',alignItems:'center',gap:10}}>
                    <img src={p.photo} alt="" style={{width:38,height:38,borderRadius:'50%',objectFit:'cover',flexShrink:0}}/>
                    <div>
                      <div style={{fontSize:13,fontWeight:600,color:'white'}}>{p.name}</div>
                      <div style={{fontSize:11,opacity:.6}}>{p.age} · {p.location}</div>
                    </div>
                    <div style={{marginLeft:'auto',fontSize:11,background:'rgba(106,174,180,0.2)',color:'#6AAEB4',padding:'3px 9px',borderRadius:20,fontWeight:600}}>Active</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 1.5 LOGO SHOWCASE ── */}
      <div style={{background:'linear-gradient(180deg, #ffffff 0%, #f0f9fb 100%)',padding:'4rem 2rem',textAlign:'center',position:'relative',overflow:'hidden'}}>
        <div style={{position:'relative',width:'100%',height:'350px',display:'flex',alignItems:'center',justifyContent:'center',maxWidth:'1140px',margin:'0 auto'}}>
          {/* Decorative floating elements */}
          <div style={{position:'absolute',width:16,height:16,borderRadius:'50%',background:'#6AAEB4',top:30,left:'10%',animation:'float 3s ease-in-out infinite'}}></div>
          <div style={{position:'absolute',width:12,height:12,borderRadius:'50%',background:'#4A8A92',top:50,right:'15%',animation:'float 4s ease-in-out infinite 0.5s'}}></div>
          <div style={{position:'absolute',width:14,height:14,borderRadius:'50%',background:'#6AAEB4',bottom:40,left:'12%',animation:'float 3.5s ease-in-out infinite 1s'}}></div>
          <div style={{position:'absolute',width:10,height:10,borderRadius:'50%',background:'#4A8A92',bottom:50,right:'10%',animation:'float 4.5s ease-in-out infinite 1.5s'}}></div>
          <div style={{position:'absolute',fontSize:32,color:'#6AAEB4',top:20,right:'20%',animation:'float 3.8s ease-in-out infinite 0.2s'}}>+</div>
          <div style={{position:'absolute',fontSize:28,color:'#6AAEB4',bottom:30,right:'25%',animation:'float 4.2s ease-in-out infinite 1.2s'}}>✓</div>
          <div style={{position:'absolute',fontSize:36,color:'#6AAEB4',top:'40%',left:'8%',animation:'float 3.3s ease-in-out infinite 0.8s'}}>◆</div>
          <div style={{position:'absolute',width:18,height:18,borderRadius:'50%',background:'#6AAEB4',top:'60%',right:'18%',animation:'float 4.8s ease-in-out infinite 0.3s',opacity:0.6}}></div>
          
          {/* Center Logo */}
          <img src={logo} alt="Matchmaking" style={{height:280,width:'auto',position:'relative',zIndex:2,filter:'drop-shadow(0 10px 30px rgba(106,174,180,0.2))'}} />
        </div>
        <h2 style={{fontSize:28,fontWeight:700,color:'#2a2a2a',marginTop:'1rem',fontFamily:'var(--font-serif)',letterSpacing:'-0.5px'}}>Matchmaking</h2>
        <p style={{fontSize:15,color:'var(--gray)',marginTop:'0.5rem',maxWidth:500,margin:'0.5rem auto 0'}}>Your trusted partner in finding true love. Secure, verified, and designed for meaningful connections.</p>
      </div>

      {/* ── 2. HOW IT WORKS ── */}
      <div className="section-wrap">
        <p className="section-label">Simple Process</p>
        <h2 className="section-title">How It Works</h2>
        <p className="section-desc">Get started in minutes. Our guided process takes you from sign-up to meaningful connection.</p>
        <div className="how-grid">
          {[
            { num:1, title:'Create Your Profile', desc:'Register and fill in your details — education, religion, location, and preferences.' },
            { num:2, title:'Browse & Filter', desc:'Use our smart search to find compatible profiles based on your criteria.' },
            { num:3, title:'Send a Request', desc:'Interested in someone? Send a match request and wait for their response.' },
            { num:4, title:'Connect & Chat', desc:'Once both accept, unlock private messaging and start your journey.' },
          ].map(s => (
            <div className="how-step" key={s.num}>
              <div className="how-num">{s.num}</div>
              <div className="how-title">{s.title}</div>
              <div className="how-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. FEATURED PROFILES ── */}
      <div style={{background:'var(--white)',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)'}}>
        <div className="section-wrap" style={{paddingBottom:'3rem'}}>
          <p className="section-label">Browse Profiles</p>
          <h2 className="section-title">Meet Some of Our Members</h2>
          <p className="section-desc">Thousands of verified profiles waiting for the right connection.</p>
          <div className="grid-4" style={{marginBottom:'1.5rem'}}>
            {PREVIEW_PROFILES.map(p => (
              <div key={p.name} style={{background:'var(--bg)',border:'1px solid var(--border)',borderRadius:'var(--radius)',overflow:'hidden',transition:'box-shadow 0.2s'}}>
                <img src={p.photo} alt={p.name} style={{width:'100%',height:180,objectFit:'cover',display:'block'}}/>
                <div style={{padding:'0.85rem'}}>
                  <div style={{fontFamily:'var(--font-serif)',fontWeight:600,fontSize:15,color:'var(--navy)'}}>{p.name}</div>
                  <div style={{fontSize:12.5,color:'var(--gray)',marginTop:2}}>{p.age} yrs · {p.location}</div>
                </div>
              </div>
            ))}
          </div>
          {!user && (
            <div style={{textAlign:'center'}}>
              <Link to="/signup"><button className="btn btn-primary" style={{padding:'12px 32px',fontSize:15}}>Sign Up to View Full Profiles</button></Link>
            </div>
          )}
          {user && (
            <div style={{textAlign:'center'}}>
              <Link to="/search"><button className="btn btn-primary" style={{padding:'12px 32px',fontSize:15}}>Browse All Profiles →</button></Link>
            </div>
          )}
        </div>
      </div>

      {/* ── 4. FEATURES ── */}
      <div className="section-wrap">
        <p className="section-label">Why Choose Us</p>
        <h2 className="section-title">Built for Trust & Privacy</h2>
        <p className="section-desc">Every feature is designed to give you control, safety, and real connections.</p>
        <div className="feature-grid">
          {[
            { icon:'🔒', title:'Verified Profiles', desc:'Every profile goes through admin review. Real people, real intentions — no fake accounts.' },
            { icon:'🔍', title:'Smart Filtering', desc:'Filter by religion, location, age, education, marital status and more to find exactly who you are looking for.' },
            { icon:'💬', title:'Private Messaging', desc:'Chat is only unlocked after both parties accept a match request. Full privacy guaranteed.' },
            { icon:'🛡️', title:'Admin Moderation', desc:'Our team actively monitors activity and responds to reports within 24 hours.' },
            { icon:'⭐', title:'Compatibility Rating', desc:'Our system assesses profile alignment from Ingredient Grade to Ceremonial Grade.' },
            { icon:'📱', title:'Fully Responsive', desc:'Access your matches from any device — desktop, tablet, or mobile browser.' },
          ].map(f => (
            <div className="feature-item" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 5. COMPATIBILITY ── */}
      <div style={{background:'#f5f5f5'}}>
        <div className="section-wrap alt-section">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'3rem',alignItems:'center'}}>
            <div>
              <p className="section-label" style={{color:'#6AAEB4'}}>Our Algorithm</p>
              <h2 className="section-title">Understand Compatibility Grades</h2>
              <p className="section-desc">We rate how well two profiles align based on shared values, location, education and background.</p>
              <div style={{marginTop:'1rem'}}>
                <div className="compat-bar"></div>
                <div className="compat-labels">
                  <span>Ingredient</span><span>Culinary</span><span>Premium</span><span style={{color:'#6AAEB4',fontWeight:600}}>Ceremonial</span>
                </div>
              </div>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:12}}>
              <p style={{fontSize:13,opacity:.6,fontWeight:500,textTransform:'uppercase',letterSpacing:'.06em',color:'white',marginBottom:4}}>Active Members</p>
              {PREVIEW_PROFILES.map(p => (
                <div key={p.name} className="preview-card">
                  <div className="preview-avatar"><img src={p.photo} alt=""/></div>
                  <div>
                    <div className="preview-name">{p.name}</div>
                    <div className="preview-meta">{p.age} yrs · {p.location}</div>
                  </div>
                  <div style={{marginLeft:'auto',fontSize:11,background:'rgba(127,217,187,0.15)',color:'#7FD9BB',padding:'3px 9px',borderRadius:20,fontWeight:600,flexShrink:0}}>Verified</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 6. TESTIMONIALS ── */}
      <div className="section-wrap">
        <p className="section-label">Success Stories</p>
        <h2 className="section-title">Families Built Here</h2>
        <p className="section-desc">Real stories from real couples who found each other on our platform.</p>
        <div className="testimonial-grid">
          {[
            { text:'"I was skeptical at first, but the profile verification gave me confidence. Found my husband within 3 months — we have been happily married for a year now."', author:'Sadia K.', role:'Dhaka · Married 2024', stars:5 },
            { text:'"The filtering system is excellent. I could narrow down by religion, location, and education. No wasted time, just genuine connections."', author:'Imran H.', role:'Chittagong · Married 2024', stars:5 },
            { text:'"My family was involved in the process and they appreciated how structured and safe the platform felt. Highly recommend for serious seekers."', author:'Nusrat F.', role:'Sylhet · Married 2025', stars:5 },
          ].map((t,i) => (
            <div className="testimonial-card" key={i}>
              <div className="stars">{'★'.repeat(t.stars)}</div>
              <p className="testimonial-text">{t.text}</p>
              <div className="testimonial-author">{t.author}</div>
              <div className="testimonial-role">{t.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 7. SUBSCRIPTION ── */}
      <div style={{background:'var(--bg)',borderTop:'1px solid var(--border)'}}>
        <div className="section-wrap">
          <p className="section-label">Subscription Plans</p>
          <h2 className="section-title">Simple, Transparent Pricing</h2>
          <p className="section-desc">Start for free. Upgrade when you're ready for more connections and visibility.</p>
          <div className="pricing-grid">
            {[
              { name:'Basic', price:'Free', period:'', desc:'Get started and explore the platform.', features:['Create profile','Browse up to 20 profiles/day','Send 5 match requests/month','Basic search filters'], cta:'Get Started', primary:false },
              { name:'Premium', price:'৳499', period:'/month', desc:'For serious seekers who want maximum visibility.', features:['Unlimited profile views','Unlimited match requests','Advanced filters','Priority in search results','See who viewed your profile'], cta:'Go Premium', primary:true },
              { name:'Elite', price:'৳999', period:'/month', desc:'White-glove matchmaking experience.', features:['Everything in Premium','Dedicated matchmaker consultation','Profile boost weekly','Background verification badge','Compatibility report'], cta:'Go Elite', primary:false },
            ].map(p => (
              <div key={p.name} className={`pricing-card${p.primary?' featured':''}`}>
                {p.primary && <div style={{background:'var(--teal)',color:'white',fontSize:11,fontWeight:700,textAlign:'center',padding:'5px',borderRadius:'8px 8px 0 0',margin:'-28px -28px 16px',letterSpacing:'.06em',textTransform:'uppercase'}}>Most Popular</div>}
                <div className="pricing-name">{p.name}</div>
                <div className="pricing-price">{p.price}<span style={{color:'var(--gray)',fontFamily:'var(--font)'}}>{p.period}</span></div>
                <div className="pricing-desc">{p.desc}</div>
                <ul className="pricing-features">{p.features.map(f=><li key={f}>{f}</li>)}</ul>
                <Link to={user?'/search':'/signup'}><button className={`btn btn-full${p.primary?' btn-primary':' btn-outline'}`}>{p.cta}</button></Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 8. FAQ ── */}
      <div className="section-wrap">
        <p className="section-label">Questions</p>
        <h2 className="section-title">Frequently Asked</h2>
        <div className="faq-list" style={{maxWidth:700}}>
          {FAQS.map((f,i) => (
            <div className="faq-item" key={i}>
              <div className="faq-q" onClick={() => setOpenFaq(openFaq===i?null:i)}>
                {f.q}
                <span style={{fontSize:18,color:'var(--teal)',transform:openFaq===i?'rotate(45deg)':'none',transition:'transform 0.2s',display:'inline-block'}}>+</span>
              </div>
              {openFaq===i && <div className="faq-a">{f.a}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* ── 9. NEWSLETTER CTA ── */}
      <div style={{background:'linear-gradient(135deg,var(--teal-dark),var(--teal))',padding:'4rem 2rem',textAlign:'center'}}>
        <h2 style={{fontFamily:'var(--font-serif)',fontSize:34,color:'white',marginBottom:10}}>Ready to Find Your Match?</h2>
        <p style={{fontSize:15,color:'rgba(255,255,255,0.8)',marginBottom:'2rem',maxWidth:440,margin:'0 auto 2rem'}}>Join thousands of verified members across Bangladesh already finding meaningful connections.</p>
        {user ? (
          <Link to="/search"><button className="btn-hero-primary" style={{fontSize:16,padding:'14px 36px'}}>Browse Profiles Now →</button></Link>
        ) : (
          <Link to="/signup"><button className="btn-hero-primary" style={{fontSize:16,padding:'14px 36px'}}>Create Free Account →</button></Link>
        )}
      </div>

      {/* ── 10. FOOTER ── */}
      <div className="footer-section">
        <div className="footer-inner">
          <div>
            <div className="footer-brand">Matchmaking</div>
            <div className="footer-tagline">Bangladesh's trusted platform for finding a life partner in a secure, modern way.</div>
            <div style={{fontSize:13,opacity:.5}}>📧 Tisha@iub.edu.bd &nbsp;|&nbsp; 📞 0123456789</div>
          </div>
          <div>
            <div className="footer-heading">Platform</div>
            <div className="footer-links">
              <Link to="/search">Browse Profiles</Link>
              <Link to="/requests">Match Requests</Link>
              <Link to="/connections">Connections</Link>
              <Link to="/chat">Messages</Link>
            </div>
          </div>
          <div>
            <div className="footer-heading">Account</div>
            <div className="footer-links">
              <Link to="/signup">Sign Up</Link>
              <Link to="/login">Log In</Link>
              <Link to="/profile">My Profile</Link>
            </div>
          </div>
          <div>
            <div className="footer-heading">Newsletter</div>
            <p style={{fontSize:13,opacity:.6,marginBottom:12,lineHeight:1.6}}>Get matchmaking tips and platform updates.</p>
            <div style={{display:'flex',gap:8}}>
              <input placeholder="Your email..." style={{flex:1,padding:'9px 12px',borderRadius:8,border:'none',fontSize:13,fontFamily:'var(--font)'}}/>
              <button className="btn btn-primary btn-sm">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Matchmaking. All rights reserved.</span>
          <span>IUB CSE 309 Project 2026, Faculty : Abu Sayed </span>
        </div>
      </div>
    </div>
  );
}
