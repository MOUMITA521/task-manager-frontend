import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-hero">
        <h1 className="landing-title">Organize Your Life with DoIt</h1>
        <p className="landing-subtitle">
          Simple, powerful task management with due dates, calendar view, and more.
        </p>
        <div className="landing-cta">
          <Link to="/signup" className="landing-btn-primary">Get Started Free</Link>
          <Link to="/login" className="landing-btn-secondary">I already have an account</Link>
        </div>
      </div>

      <div className="landing-features">
        <div className="feature-card">
          <div className="feature-icon">✅</div>
          <h3>Simple Task Management</h3>
          <p>Add, edit, and organize your tasks effortlessly.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📅</div>
          <h3>Calendar View</h3>
          <p>See all your tasks laid out on a calendar, by date.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Secure & Private</h3>
          <p>Your tasks are yours alone, protected by secure login.</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;