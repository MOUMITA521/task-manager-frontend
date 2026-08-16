import { useState } from 'react';
import { useAuth } from './AuthContext';

function Login({ switchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <span className="link" onClick={switchToSignup}>Sign up</span>
      </p>
    </div>
  );
}

export default Login;