import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      toast.error('Username and password required');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/auth/register', form);
      if (res.data.success) {
        toast.success('Registration successful! Please login.');
        navigate('/member/login');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error('Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2">Create Account</h2>
        <p className="text-gray-500 mb-6">Join My Gym today</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="username" placeholder="Username *" onChange={handleChange} className="w-full p-3 border rounded-lg" />
          <input name="password" type="password" placeholder="Password *" onChange={handleChange} className="w-full p-3 border rounded-lg" />
          <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full p-3 border rounded-lg" />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-3 border rounded-lg" />
          <button disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded-lg">
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account? <Link to="/member/login" className="text-indigo-600">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;