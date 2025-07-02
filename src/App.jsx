// App.js
import { useState } from 'react';
import Login from './login';
import UserInfo from './userinfo';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {user ? <UserInfo user={user} setUser={setUser} /> : <Login setUser={setUser} />}
    </div>
  );
}

export default App;
