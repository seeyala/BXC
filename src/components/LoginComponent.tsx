"use client"; 
import '../styles/login.css';
import Image from 'next/image';
import LogoPlaceholder from '../app/images/icons/LogoPlaceholder.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; 

const LoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

  if (!username || !password) {
    setError("Both username and password are required."); 
    return; 
  }
  
  const loginData = { username, password };

  setLoading(true);
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Account/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login error:', errorData);
        setError(errorData.message || "An error occurred. Please try again.");
        return;
      }
  
      const data = await response.json();
      localStorage.setItem('accessToken', data.token);

      setTimeout(() => {
        window.location.reload();
    }, 100);
      router.push('/home');
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false); 
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
          {error && <p className="error-message">{error}</p>} 
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};
export default LoginComponent;