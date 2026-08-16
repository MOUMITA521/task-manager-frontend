import { useState } from 'react';
import { useAuth } from './AuthContext';

function Signup({ switchToLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signup(email, password);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  if (success) {
    return (
      <div className="auth-container">
        <p>Account created! Please login now.</p>
        <span className="link" onClick={switchToLogin}>Go to Login</span>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {error && <p className="error-text">{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <span className="link" onClick={switchToLogin}>Login</span>
      </p>
    </div>
  );
}

export default Signup;