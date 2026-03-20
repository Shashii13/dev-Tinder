import { useEffect, useState } from "react";
import API from "../utils/api";

function Home() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.get("/feed")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleInterested = async (toUserId) => {
    try {
      await API.post(`/connection/send/interested/${toUserId}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== toUserId));
    } catch (err) {
      console.error(err);
    }
  };

  const handleIgnore = (toUserId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== toUserId));
  };

  if (isLoading) {
    return <h2 style={styles.loading}>Loading feed...</h2>;
  }

  return (
    <div style={styles.container}>
      <h2>Discover Developers</h2>

      <div style={styles.cardContainer}>
        {users.length === 0 && <p>No developers found right now.</p>}
        {users.map((user) => (
          <div key={user._id} style={styles.card}>
            <h3>{user.firstName} {user.lastName}</h3>
            <p>{user.bio}</p>
            <p><strong>Skills:</strong> {user.skills?.join(", ")}</p>

            <div style={styles.actions}>
              <button style={styles.ignore} onClick={() => handleIgnore(user._id)}>Ignore</button>
              <button style={styles.interested} onClick={() => handleInterested(user._id)}>Interested</button>
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
  loading: {
    textAlign: "center",
    marginTop: "40px",
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