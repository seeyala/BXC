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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await fetch(`${apiUrl}/Account/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      console.log('Login success', data);

    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid username or password');
    }
    console.log(apiUrl);
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
              id="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="email">Username</label>
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
