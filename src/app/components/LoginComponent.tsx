// src/app/components/LoginComponent.tsx
import '../styles/login.css';

const LoginComponent: React.FC = () => {
  return (
    <div className="login-page">
      <div className="wrapper">
        <form action="#">
          <h2>Login</h2>
          <div className="input-field">
            <input type="text" id="email" required />
            <label>Enter your email</label>
          </div>
          <div className="input-field">
            <input type="password" required />
            <label>Enter your password</label>
          </div>
          <div className="forget">
            <a href="#">Forgot password?</a>
          </div>
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;
