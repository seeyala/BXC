"use client"; 
import '../styles/login.css';
import Image from 'next/image';
import LogoPlaceholder from '../app/images/icons/LogoPlaceholder.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const LoginComponent: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const loginData = { username, password };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Account/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),  // Sử dụng giá trị từ state
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login error:", errorData);
        const errorMessages = errorData.errors; // Lấy thông tin lỗi cụ thể
        if (errorMessages) {
          for (const key in errorMessages) {
            console.error(`${key}: ${errorMessages[key].join(', ')}`);
          }
        }
        setError("Login failed: " + errorData.title);
        throw new Error("Login failed");
      }

      const data = await response.json();
      // Lưu accessToken và refreshToken vào localStorage
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
  
      // Xử lý phản hồi thành công ở đây
      console.log("Login successful:", data);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  return (
    <div className="login-page">
      {/* Left Side: Image */}
      <div className="image-side"></div>

      {/* Right Side: Login Form */}
      <div className="wrapper">
        <div className="title">
          <Image src={LogoPlaceholder} alt="Logo" className="title-image" width={100} height={100} />
          <h1>BXC</h1>
        </div>
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className="input-field">
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="input-field">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            {password && (
              <span onClick={togglePasswordVisibility} className="password-toggle">
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
            )}
          </div>
          <div className="forget">
            <a href="#">Forgot password</a>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
