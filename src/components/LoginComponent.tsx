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
  
    // Kiểm tra giá trị username và password
  console.log("Username:", username);  // Kiểm tra giá trị username
  console.log("Password:", password);  // Kiểm tra giá trị password

  if (!username || !password) {
    console.error("Both username and password are required.");
    setError("Both username and password are required."); // Cập nhật thông báo lỗi
    return; // Ngăn không cho gửi yêu cầu nếu các trường còn trống
  }
  
    const loginData = {
      username,  // Đảm bảo tên trường chính xác với API yêu cầu
      password // Đảm bảo tên trường chính xác với API yêu cầu
    };
    console.log("Login data:", loginData); // Kiểm tra giá trị loginData
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Account/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      // Đảm bảo rằng bạn chỉ đọc body một lần
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login error:', errorData);
      return;
    }
  
      const data = await response.json();
      localStorage.setItem('accessToken', data.token);
      console.log("Login successful:", data);{/* nhớ xóa dòng này */}
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
              value={username}
              onChange={(e) => {
                console.log("Updated username:", e.target.value); // Kiểm tra giá trị được cập nhật
                setUsername(e.target.value);
              }}
              required
            />
            <label htmlFor="username">Username</label>
          </div>
          <div className="input-field">
            <input
              type={showPassword ? 'text' : "password"}
              value={password}
              onChange={(e) => {
                console.log("Updated password:", e.target.value); // Kiểm tra giá trị được cập nhật
                setPassword(e.target.value);
              }}
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
          {error && <p className="error-message">{error}</p>} {/* Hiển thị thông báo lỗi */}
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent; 
