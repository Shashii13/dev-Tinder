import { useEffect, useState } from "react";
import API from "../utils/api";

function Home() {
  const [users, setUsers] = useState([]);

  
  const fetchUsers = async () => {
    try {
      const res = await API.get("/profile/view"); 
      
      setUsers([res.data]);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Discover Developers</h2>

      <div style={styles.cardContainer}>
        {users.map((user, index) => (
          <div key={index} style={styles.card}>
            <h3>{user.firstName} {user.lastName}</h3>
            <p>{user.bio}</p>
            <p><strong>Skills:</strong> {user.skills?.join(", ")}</p>

            <div style={styles.actions}>
              <button style={styles.ignore}>Ignore</button>
              <button style={styles.interested}>Interested</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "30px",
  },
  cardContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  card: {
    width: "300px",
    padding: "20px",
    borderRadius: "10px",
    background: "#1e293b",
    color: "white",
  },
  actions: {
    marginTop: "15px",
    display: "flex",
    justifyContent: "space-between",
  },
  ignore: {
    padding: "8px",
    background: "#ef4444",
    border: "none",
    cursor: "pointer",
  },
  interested: {
    padding: "8px",
    background: "#22c55e",
    border: "none",
    cursor: "pointer",
  },
};

export default Home;