import { useEffect } from "react";
import React, { useState } from "react";
import { createUser, getAllUsers } from "./Api/userApi";
import "./App.css";

function App() {

  const [users, setUsers] = useState([]);
  const [isDark, setIsDark] = useState(true);
  const [showList, setShowList] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    age: "",
    email: "",
    description: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};

    if (!formData.username.trim())
      tempErrors.username = "Username is required";

    if (!formData.fullname.trim())
      tempErrors.fullname = "Full name is required";

    if (!formData.age || formData.age <= 0)
      tempErrors.age = "Valid age required";

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      tempErrors.email = "Valid email required";

    if (!formData.description.trim())
      tempErrors.description = "Description required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const fetchUsers = async () => {
  try {
    const response = await getAllUsers();
    setUsers(response.data);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

useEffect(() => {
  fetchUsers();
}, []);


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await createUser(formData);
    console.log("User Saved:", response.data);

    fetchUsers(); 
    setShowList(true);

  } catch (error) {
    console.error("Error saving user:", error);
  }
};



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={isDark ? "app dark" : "app"}>
        {/* ===== HEADING ===== */}
    <h1 className="main-heading">
      Welcome to Ankur's Registration Form
    </h1>

      {/* ===== TOP BAR ===== */}
      <div className="top-bar">
        <button onClick={() => setIsDark(!isDark)}>
          {isDark ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>

        <button onClick={() => setShowList(!showList)}>
          {showList ? "Add User" : "View Users"}
        </button>
      </div>

      {/* ===== SLIDER CONTAINER ===== */}
      <div className="container">
        <div className={showList ? "slider slide-active" : "slider"}>
          
          

          {/* FORM SECTION */}
          <div className="form-section">
            <h2>Add User</h2>

            <form onSubmit={handleSubmit}>

              <input
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
              <span className="error">{errors.username}</span>

              <input
                name="fullname"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleChange}
              />
              <span className="error">{errors.fullname}</span>

              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
              />
              <span className="error">{errors.age}</span>

              <input
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              <span className="error">{errors.email}</span>

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />
              <span className="error">{errors.description}</span>

              <button type="submit">Submit</button>
            </form>
          </div>

          {/* LIST SECTION */}
          <div className="list-section">
            <h2>All Users</h2>

            {users.length === 0 ? (
              <p>No users added yet.</p>
            ) : (
              users.map((user, index) => (
                <div key={index} className="user-card">
                  <h3>{user.username}</h3>
                  <p><strong>Name:</strong> {user.fullname}</p>
                  <p><strong>Age:</strong> {user.age}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p>{user.description}</p>
                </div>
              ))
            )}

          </div>
          
        </div>
        
      </div>
     
         {/* ===== FIXED FOOTER (ADD HERE) ===== */}
    <footer className="footer">
      Made By Ankur Kumar Rai, CSE-1, Roll No. 16
    </footer>
    </div>
    
  );
}

export default App;
