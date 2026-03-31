import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../../services/authService';
import toast from 'react-hot-toast';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '', password: '', confirmPassword: '', fullName: '', email: '', mobile: '', age: '', gender: '', address: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (let key in formData) {
      if (!formData[key]) return toast.error('All fields are required');
    }

    if (formData.password !== formData.confirmPassword) return toast.error('Passwords do not match');

    setLoading(true);
    const { confirmPassword, ...data } = formData;
    const res = await authService.register(data);

    if (res.success) {
      toast.success('Registered successfully');
      navigate('/login');
    } else {
      toast.error(res.message || 'Failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">

      {/* Header (same as landing) */}
      <div className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] text-white py-4 shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <h1 className="font-bold">My Gym</h1>
          <Link to="/login" className="bg-white/20 px-4 py-2 rounded-md">Login</Link>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 ">

      {/* Main Container */}
      <div className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">

        {/* LEFT IMAGE */}
        <div className="hidden md:block relative">
          <img src="/signup_gym.jpeg" alt="gym" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white/80 backdrop-blur-lg p-10 flex flex-col justify-center">

          <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="grid grid-cols-2 gap-4">
              <input name="username" placeholder="Username *" value={formData.username} onChange={handleChange} className="p-3 border-b border-gray-400 bg-transparent outline-none" />
              <input name="fullName" placeholder="Full Name *" value={formData.fullName} onChange={handleChange} className="p-3 border-b border-gray-400 bg-transparent outline-none" />

              <input type="password" name="password" placeholder="Password *" value={formData.password} onChange={handleChange} className="p-3 border-b border-gray-400 bg-transparent outline-none" />
              <input type="password" name="confirmPassword" placeholder="Confirm Password *" value={formData.confirmPassword} onChange={handleChange} className="p-3 border-b border-gray-400 bg-transparent outline-none" />

              <input name="email" placeholder="Email *" value={formData.email} onChange={handleChange} className="p-3 border-b border-gray-400 bg-transparent outline-none" />
              <input name="mobile" placeholder="Mobile *" value={formData.mobile} onChange={handleChange} className="p-3 border-b border-gray-400 bg-transparent outline-none" />

              <input type="number" name="age" placeholder="Age *" value={formData.age} onChange={handleChange} className="p-3 border-b border-gray-400 bg-transparent outline-none" />

              <select name="gender" value={formData.gender} onChange={handleChange} className="p-3 border-b border-gray-400 bg-transparent outline-none">
                <option value="">Gender *</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <textarea name="address" placeholder="Address *" value={formData.address} onChange={handleChange} className="w-full p-3 border-b border-gray-400 bg-transparent outline-none" />

            <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-full mt-4">
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm mt-4">
            Already have an account? <Link to="/" className="text-blue-600">Login</Link>
          </p>
        </div>
      </div>
          </div>

      {/* Footer (same as landing) */}
      <footer className="bg-[#0f172a] text-gray-400 text-center py-6 mt-10">
        © 2024 My Gym
      </footer>
    </div>
  );
};

export default Register;
