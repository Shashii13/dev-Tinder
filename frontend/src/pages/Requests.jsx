import { useEffect, useState } from "react";
import API from "../utils/api";

function Requests() {
  const [requests, setRequests] = useState([]);

  // ✅ Fetch received requests
  const fetchRequests = async () => {
    try {
      const res = await API.get("/connection/requests/received");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ✅ Handle accept/reject
  const handleReview = async (status, requestId) => {
    try {
      await API.post(`/connection/review/${status}/${requestId}`);

      // remove from UI
      setRequests((prev) =>
        prev.filter((req) => req._id !== requestId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Connection Requests</h2>

      {requests.length === 0 && <p>No requests found</p>}

      {requests.map((req) => {
        const user = req.fromUserId;

        return (
          <div key={req._id} style={styles.card}>
            <h3>{user.firstName} {user.lastName}</h3>
            <p>{user.bio}</p>
            <p><strong>Skills:</strong> {user.skills?.join(", ")}</p>

            <div style={styles.actions}>
              <button
                style={styles.accept}
                onClick={() => handleReview("accepted", req._id)}
              >
                Accept
              </button>

              <button
                style={styles.reject}
                onClick={() => handleReview("rejected", req._id)}
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "30px",
  },
  card: {
    width: "300px",
    margin: "20px auto",
    padding: "20px",
    borderRadius: "10px",
    background: "#1e293b",
    color: "white",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  accept: {
    background: "#22c55e",
    border: "none",
    padding: "8px",
    cursor: "pointer",
  },
  reject: {
    background: "#ef4444",
    border: "none",
    padding: "8px",
    cursor: "pointer",
  },
};

export default Requests;