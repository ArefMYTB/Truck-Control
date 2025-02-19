import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaKey, setCaptchaKey] = useState('');
  const [captchaImage, setCaptchaImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCaptcha();
  }, []);

  const fetchCaptcha = async () => {
    try {
      const response = await fetch("http://localhost:8000/captcha/refresh/");
      const data = await response.json();  
      setCaptchaImage(`http://localhost:8000${data.image}`);
      setCaptchaKey(data.key);  // Save captcha key
    } catch (error) {
      console.error("Error fetching captcha:", error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          captcha_0: captchaKey,  // Captcha key
          captcha_1: captcha,  // User input
        }),
      });
  
      const result = await response.json();
      console.log("here")
      console.log(result)
      if (result.is_valid) {
        localStorage.setItem('authToken', result.token); // Save token
        navigate('/'); // Redirect to main page
      } else {
        alert(result.message || 'Invalid credentials or captcha. Please try again.');
        fetchCaptcha(); // Refresh captcha on failure
      }
    } catch (error) {
      alert('An error occurred during login.');
    }
  };
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Captcha:</label>
            <div className="flex items-center">
              <input
                type="text"
                value={captcha}
                onChange={(e) => setCaptcha(e.target.value)}
                className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <img
                src={captchaImage}
                alt="captcha"
                className="ml-2 w-24 h-8 object-contain cursor-pointer"
                onClick={fetchCaptcha}
              />
            </div>
            <button
              type="button"
              onClick={fetchCaptcha}
              className="mt-2 text-sm text-blue-500 hover:underline"
            >
              Refresh Captcha
            </button>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
