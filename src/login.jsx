import { useEffect } from 'react';
import { auth, provider, db } from './firebaseConfig';
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

function Login({ setUser }) {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const loginWithGoogle = async () => {
    try {
      if (isMobile) {
        await signInWithRedirect(auth, provider);
      } else {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        await saveUserToFirestore(user);
        setUser(user);
      }
    } catch (error) {
      console.error('Google login error:', error.message);
      alert('Login failed. Please try again.');
    }
  };

  const saveUserToFirestore = async (user) => {
    if (!user) return;
    try {
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    } catch (err) {
      console.error('Error saving user:', err.message);
    }
  };

  // Handle redirect login result
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          saveUserToFirestore(result.user);
          setUser(result.user);
        }
      })
      .catch((error) => {
        if (error) {
          console.error('Redirect login error:', error.message);
        }
      });
  }, []);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f4f6f8',
  };

  const buttonStyle = {
    padding: '12px 24px',
    backgroundColor: '#4285F4',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const titleStyle = {
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Let's Talk - Login</h2>
      <button onClick={loginWithGoogle} style={buttonStyle}>
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
