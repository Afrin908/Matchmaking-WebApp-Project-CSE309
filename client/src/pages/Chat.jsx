import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../utils/axios';

const Avatar = ({ name, size = 38 }) => (
  <div style={{width:size,height:size,borderRadius:'50%',background:'linear-gradient(135deg,var(--teal-light),var(--blue-light))',display:'flex',alignItems:'center',justifyContent:'center',fontSize:size*0.35,fontWeight:600,color:'var(--teal-dark)',flexShrink:0}}>
    {name?.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2)||'?'}
  </div>
);

const formatTime = (d) => new Date(d).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});

export default function Chat() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [connections, setConnections] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const bottomRef = useRef(null);
  const pollRef = useRef(null);

  useEffect(() => {
    API.get('/match/connections').then(r => {
      setConnections(r.data);
      const withId = searchParams.get('with');
      if (withId) {
        const found = r.data.find(c => c.user._id === withId);
        if (found) selectUser(found.user);
      }
    });
    return () => clearInterval(pollRef.current);
  }, []);

  const selectUser = (u) => {
    setActiveUser(u);
    loadMessages(u._id);
    clearInterval(pollRef.current);
    pollRef.current = setInterval(() => loadMessages(u._id), 4000);
  };

  const loadMessages = async (userId) => {
    setLoadingMsgs(true);
    try {
      const { data } = await API.get(`/messages/${userId}`);
      setMessages(data);
    } catch {} finally { setLoadingMsgs(false); }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMsg = async (e) => {
    e.preventDefault();
    if (!text.trim() || !activeUser) return;
    setSending(true);
    try {
      const { data } = await API.post('/messages/send', { receiverId: activeUser._id, content: text.trim() });
      setMessages(p => [...p, data]);
      setText('');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send');
    } finally { setSending(false); }
  };

  const handleKey = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMsg(e); } };

  return (
    <div className="page" style={{paddingBottom:0}}>
      <h1 className="page-title" style={{marginBottom:'1rem'}}>Messages</h1>
      <div className="chat-wrap">
        {/* SIDEBAR */}
        <div className="chat-sidebar">
          <div className="chat-sidebar-header">💬 Conversations</div>
          {connections.length === 0 ? (
            <div style={{padding:'1.5rem',textAlign:'center',color:'var(--gray)',fontSize:13}}>No connections yet. Accept a match request first.</div>
          ) : connections.map(c => (
            <div
              key={c.matchId}
              className={`chat-contact${activeUser?._id === c.user._id ? ' active' : ''}`}
              onClick={() => selectUser(c.user)}
            >
              <Avatar name={c.user.name} size={38} />
              <div>
                <div className="chat-contact-name">{c.user.name}</div>
                <div className="chat-contact-preview" style={{fontSize:11,color:'var(--gray)'}}>
                  {c.user.location || c.user.religion || ''}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MAIN */}
        <div className="chat-main">
          {!activeUser ? (
            <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'1rem',color:'var(--gray)',padding:'2rem'}}>
              <div style={{fontSize:56}}>💬</div>
              <p style={{fontSize:15,fontWeight:500,color:'var(--navy)'}}>Select a conversation</p>
              <p style={{fontSize:13}}>Choose a connection from the sidebar to start chatting.</p>
            </div>
          ) : (
            <>
              <div className="chat-header">
                <Avatar name={activeUser.name} size={36} />
                <div>
                  <div className="chat-header-name">{activeUser.name}</div>
                  <div style={{fontSize:11,color:'var(--gray)'}}>{[activeUser.age&&`${activeUser.age} yrs`,activeUser.location].filter(Boolean).join(' · ')}</div>
                </div>
              </div>

              <div className="chat-messages">
                {loadingMsgs && messages.length === 0 ? (
                  <div className="spinner" style={{margin:'auto'}}></div>
                ) : messages.length === 0 ? (
                  <div style={{textAlign:'center',color:'var(--gray)',padding:'2rem',fontSize:13}}>
                    No messages yet. Say hello! 👋
                  </div>
                ) : (
                  messages.map(msg => {
                    const mine = msg.sender._id === user._id || msg.sender === user._id;
                    return (
                      <div key={msg._id} className={`msg ${mine ? 'mine' : 'theirs'}`}>
                        <div className="msg-bubble">{msg.content}</div>
                        <div className="msg-time">{formatTime(msg.createdAt)}</div>
                      </div>
                    );
                  })
                )}
                <div ref={bottomRef} />
              </div>

              <form className="chat-input-wrap" onSubmit={sendMsg}>
                <input
                  className="chat-input"
                  value={text}
                  onChange={e => setText(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder={`Message ${activeUser.name}...`}
                  disabled={sending}
                />
                <button className="btn btn-primary" type="submit" disabled={sending || !text.trim()} style={{borderRadius:'50%',width:40,height:40,padding:0,flexShrink:0}}>
                  ➤
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
