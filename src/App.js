import React, { useState, useEffect } from 'react';

const UserSignupForm = () => {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    age: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  // Toggle Dark Mode class on the body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const validate = () => {
    let newErrors = {};
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email.match(/\S+@\S+\.\S+/)) newErrors.email = "Invalid email format";
    if (!formData.age || formData.age < 18) newErrors.age = "Must be at least 18";
    if (formData.description.length < 10) newErrors.description = "Description too short";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newUser = { ...formData, id: Date.now() };
      setUsers([...users, newUser]);
      setFormData({ username: '', email: '', age: '', description: '' });
      alert("User Registered Successfully!");
    }
  };

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-2xl mx-auto">
        
        {/* Header & Toggle */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">User Portal</h1>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* Signup Form */}
        <div className={`p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">Create Account</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm mb-1">Username</label>
              <input 
                type="text" 
                className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                value={formData.username}
                onChange={(e) => setFormData({...formData, username: e.target.value})}
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>

            <div>
              <label className="block text-sm mb-1">Email</label>
              <input 
                type="email" 
                className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="flex gap-4">
              <div className="w-1/4">
                <label className="block text-sm mb-1">Age</label>
                <input 
                  type="number" 
                  className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                />
                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm mb-1">Description</label>
              <textarea 
                className={`w-full p-2 rounded border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'}`}
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>

            <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-bold">
              Register User
            </button>
          </form>
        </div>

        {/* View Users Section */}
        <div className="mt-8">
          <button 
            onClick={() => setShowUsers(!showUsers)}
            className="text-blue-500 hover:underline font-medium"
          >
            {showUsers ? 'Hide Users' : 'View All Registered Users'} ({users.length})
          </button>

          {showUsers && (
            <div className="mt-4 space-y-4">
              {users.length === 0 ? <p className="italic opacity-50">No users registered yet.</p> : 
                users.map(user => (
                  <div key={user.id} className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="flex justify-between border-b border-gray-600 pb-2 mb-2">
                      <span className="font-mono text-xs text-blue-400">ID: {user.id}</span>
                      <span className="font-bold">{user.age} yrs</span>
                    </div>
                    <p><strong>Name:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p className="mt-2 text-sm italic opacity-80">"{user.description}"</p>
                  </div>
                ))
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSignupForm;