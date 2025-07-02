import { auth } from './firebaseConfig';
import { signOut } from 'firebase/auth';
import Chat from './Chat';

function UserInfo({ user, setUser }) {
  const logout = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch((err) => console.error("Logout error:", err));
  };

  const containerStyle = {
    textAlign: "center",
    marginTop: "40px",
    padding: "20px",
    maxWidth: "800px",
    margin: "auto",
  };

  const profileImgStyle = {
    borderRadius: "50%",
    marginBottom: "10px",
    width: "80px",
    height: "80px",
    objectFit: "cover",
    border: "2px solid #ccc"
  };

  const logoutBtnStyle = {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#DB4437",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "14px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <img src={user.photoURL} alt="Profile" style={profileImgStyle} />
      <h2>Welcome, {user.displayName}</h2>
      <p>{user.email}</p>
      <button onClick={logout} style={logoutBtnStyle}>Logout</button>

      {/* Chat Component */}
      <div style={{ marginTop: "40px" }}>
        <Chat user={user} />
      </div>
    </div>
  );
}

export default UserInfo;
