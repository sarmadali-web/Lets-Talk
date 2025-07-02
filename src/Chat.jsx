import { useEffect, useRef, useState } from 'react';
import { db, auth } from './firebaseConfig';
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';

function Chat({ user, setUser }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const endRef = useRef(null);

  // Send message
  const sendMessage = async () => {
    if (message.trim()) {
      await addDoc(collection(db, 'messages'), {
        text: message,
        name: user.displayName,
        uid: user.uid,
        timestamp: serverTimestamp(),
      });
      setMessage('');
    }
  };

  // Realtime messages
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });
    return unsubscribe;
  }, []);

  // Scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Styles
  const containerStyle = {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
  };

  const messagesStyle = {
    maxHeight: '300px',
    overflowY: 'auto',
    marginBottom: '20px',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1px solid #ccc',
    display: 'flex',
    flexDirection: 'column',
  };

  const inputStyle = {
    width: '75%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginRight: '10px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '8px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  };

  const topBarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const profileStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const logoutButtonStyle = {
    padding: '6px 12px',
    backgroundColor: '#d9534f',
    border: 'none',
    borderRadius: '5px',
    color: '#fff',
    cursor: 'pointer'
  };

  const msgBubble = (msg) => ({
    backgroundColor: msg.uid === user.uid ? '#DCF8C6' : '#e6e6e6',
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '10px',
    alignSelf: msg.uid === user.uid ? 'flex-end' : 'flex-start',
    maxWidth: '80%',
  });

  return (
    <div style={containerStyle}>
      {/* Top Bar */}
      {/* <div style={topBarStyle}>
        <div style={profileStyle}>
          <img
            src={user.photoURL}
            alt={user.displayName}
            style={{ width: '35px', height: '35px', borderRadius: '50%' }}
          />
          <span>{user.displayName}</span>
        </div>
        <button onClick={() => {
          signOut(auth);
          setUser(null);
        }} style={logoutButtonStyle}>
          Logout
        </button>
      </div> */}

      {/* Chat Messages */}
      <div style={messagesStyle}>
        {messages.map((msg) => (
          <div key={msg.id} style={msgBubble(msg)}>
            <strong>{msg.name}:</strong> {msg.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Input */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={inputStyle}
        />
        <button onClick={sendMessage} style={buttonStyle}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
