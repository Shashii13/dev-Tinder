import { useState } from "react";
import API from "../utils/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        emailId: email,
        password,
      });

      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      
      <button style={styles.button} onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    margin: "50px auto",
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

export default Login;