import { useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import { TaskProvider } from './TaskContext';
import Login from './Login';
import Signup from './Signup';
import AddTask from './AddTask';
import FilterButtons from './FilterButtons';
import TaskList from './TaskList';
import TaskStats from './TaskStats';
import CalendarView from './CalendarView';
import './App.css';

function MainApp() {
  const { token, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(true);
  const [showCalendar, setShowCalendar] = useState(false);

  if (!token) {
    return showLogin ? (
      <Login switchToSignup={() => setShowLogin(false)} />
    ) : (
      <Signup switchToLogin={() => setShowLogin(true)} />
    );
  }

  return (
    <TaskProvider>
      <div className="app-container">
        <div className="app-header">
          <h1 className="app-title">📋 Task Manager</h1>
          <div className="header-buttons">
            <button className="calendar-toggle-btn" onClick={() => setShowCalendar(!showCalendar)}>
              {showCalendar ? "📋 List" : "📅 Calendar"}
            </button>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>
        </div>

        {showCalendar ? (
          <CalendarView />
        ) : (
          <>
            <AddTask />
            <FilterButtons />
            <TaskList />
            <TaskStats />
          </>
        )}
      </div>
    </TaskProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;