import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api"; 

function Signup() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleSignup = async () => {
    try {
      const res = await API.post("/auth/signup", form);
      alert(res.data.message);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Signup</h2>

      <input
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="lastName"
        placeholder="Last Name"
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="emailId"
        placeholder="Email"
        onChange={handleChange}
        style={styles.input}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        style={styles.input}
      />

    
      <button style={styles.button} onClick={handleSignup}>
        Signup
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
    background: "#22c55e",
    border: "none",
    cursor: "pointer",
  },
};

export default Signup;