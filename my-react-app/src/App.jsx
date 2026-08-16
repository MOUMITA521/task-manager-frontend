import { useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import { TaskProvider } from './TaskContext';
import Login from './Login';
import Signup from './Signup';
import AddTask from './AddTask';
import FilterButtons from './FilterButtons';
import TaskList from './TaskList';
import TaskStats from './TaskStats';
import './App.css';

function MainApp() {
  const { token, logout } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  // Agar token nahi hai, to Login/Signup dikhाओ
  if (!token) {
    return showLogin ? (
      <Login switchToSignup={() => setShowLogin(false)} />
    ) : (
      <Signup switchToLogin={() => setShowLogin(true)} />
    );
  }

  // Agar token hai, to Task Manager dikhаओ
  return (
    <TaskProvider>
      <div className="app-container">
        <div className="app-header">
          <h1 className="app-title">📋 Task Manager</h1>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
        <AddTask />
        <FilterButtons />
        <TaskList />
        <TaskStats />
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