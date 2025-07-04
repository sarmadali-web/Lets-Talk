import { useEffect, useState } from 'react';
import { auth } from './firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './login';
import UserInfo from './userinfo';

function App() {
  const [user, setUser] = useState(null);

  // Keep user signed in on refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? <UserInfo user={user} setUser={setUser} /> : <Login setUser={setUser} />}
    </div>
  );
}

export default App;
