import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const API_URL = "http://13.234.225.157:5000/api/users";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return;

    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${editId}`, form);
        setIsEditing(false);
        setEditId(null);
      } else {
        await axios.post(API_URL, form);
      }
      setForm({ name: "", email: "" });
      fetchUsers();
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email });
    setIsEditing(true);
    setEditId(user._id);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🌐 MERN CRUD Dashboard</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          {isEditing ? "Update" : "Add"} User
        </button>
      </form>

      <div style={styles.cardList}>
        {users.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "2rem" }}>No users found.</p>
        ) : (
          users.map((user) => (
            <div key={user._id} style={styles.card}>
              <div>
                <h3 style={{ marginBottom: "4px" }}>{user.name}</h3>
                <p style={{ color: "#555" }}>{user.email}</p>
              </div>
              <div>
                <button onClick={() => handleEdit(user)} style={styles.editBtn}>✏️</button>
                <button onClick={() => handleDelete(user._id)} style={styles.deleteBtn}>🗑</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh"
  },
  title: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "2rem",
    backgroundColor: "#fff",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px",
    fontSize: "1rem",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.2s ease"
  },
  cardList: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "1rem",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
  },
  editBtn: {
    backgroundColor: "#2196F3",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    marginRight: "0.5rem",
    cursor: "pointer"
  },
  deleteBtn: {
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};

export default App;
