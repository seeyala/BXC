  "use client"; // Mark this file as a Client Component
  import '../styles/login.css';
  import Image from 'next/image';
  import LogoPlaceholder from '../images/icons/LogoPlaceholder.png';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
  import { useState } from 'react';

  const LoginComponent: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState(''); // New state for password

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div className="login-page">
        <div className="title">
          <Image src={LogoPlaceholder} alt="Logo" className="title-image" width={100} height={100} />
          <h1>BXC</h1>
        </div>
        <div className="wrapper">
          <form action="#">
            <h2>Login</h2>
            <div className="input-field">
              <input type="text" id="email" required />
              <label>Username</label>
            </div>
            <div className="input-field">
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password} // Bind the password state to the input
                onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                required 
              />
              <label>Password</label>
              {/* Conditionally render the icon only if there is a password entered */}
              {password && (
                <span onClick={togglePasswordVisibility} className="password-toggle">
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
              )}
            </div>
            <div className="forget">
              <a href="#">Forgot password</a>
            </div>
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>
    );
  };

  export default LoginComponent;
