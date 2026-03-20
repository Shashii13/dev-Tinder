import { useEffect, useState } from "react";
import API from "../utils/api";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    API.get("/profile/view")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // ✅ Handle change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // ✅ Update profile
  const handleUpdate = async () => {
    try {
      const res = await API.put("/profile/edit", user);
      alert(res.data.message);
    } catch {
      alert("Update failed");
    }
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div style={styles.container}>
      <h2>My Profile</h2>

      <input name="firstName" value={user.firstName} onChange={handleChange} style={styles.input} />
      <input name="lastName" value={user.lastName} onChange={handleChange} style={styles.input} />
      <input name="age" value={user.age || ""} onChange={handleChange} style={styles.input} />
      <input name="gender" value={user.gender || ""} onChange={handleChange} style={styles.input} />
      <input name="bio" value={user.bio || ""} onChange={handleChange} style={styles.input} />

      <button style={styles.button} onClick={handleUpdate}>
        Update Profile
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    margin: "40px auto",
    gap: "10px",
  },
  input: {
    padding: "10px",
  },
  button: {
    padding: "10px",
    background: "#38bdf8",
    border: "none",
    cursor: "pointer",
  },
};

export default Profile;