import { useState } from 'react';
import { useTasks } from './TaskContext';

function TaskList() {
  const { tasks, filter, deleteTask, toggleComplete, editTask, loading } = useTasks();
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDueDate, setEditDueDate] = useState("");

  if (loading) return <p className="loading-text">Loading tasks...</p>;

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed === true;
    if (filter === "pending") return task.completed === false;
    return true;
  });

  const handleDeleteClick = (id, text) => {
    const confirmed = window.confirm(`Delete "${text}"? This cannot be undone.`);
    if (confirmed) {
      deleteTask(id);
    }
  };

  const startEditing = (task) => {
    setEditingId(task._id);
    setEditText(task.text);
    // dueDate ko datetime-local input ke format mein convert karo
    if (task.dueDate) {
      const date = new Date(task.dueDate);
      const localISOTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 16);
      setEditDueDate(localISOTime);
    } else {
      setEditDueDate("");
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText("");
    setEditDueDate("");
  };

  const saveEdit = (id) => {
    if (editText.trim() === "") return;
    const isoDueDate = editDueDate ? new Date(editDueDate).toISOString() : null;
    editTask(id, editText, isoDueDate);
    setEditingId(null);
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata',
    });
  };

  if (filteredTasks.length === 0) {
    return <p className="empty-state">No tasks yet. Add one above! ✨</p>;
  }

  return (
    <ul className="task-list">
      {filteredTasks.map((task) => (
        <li key={task._id} className="task-item">
          {editingId === task._id ? (
            // EDIT MODE
            <div className="edit-mode">
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit-input"
              />
              <input
                type="datetime-local"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
                className="date-input"
              />
              <div className="edit-actions">
                <button className="save-btn" onClick={() => saveEdit(task._id)}>Save</button>
                <button className="cancel-btn" onClick={cancelEditing}>Cancel</button>
              </div>
            </div>
          ) : (
            // NORMAL VIEW MODE
            <>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task._id)}
              />
              <div className="task-content">
                <span className={task.completed ? "task-text completed" : "task-text"}>
                  {task.text}
                </span>
                {task.dueDate && (
                  <span className="due-date">📅 {formatDueDate(task.dueDate)}</span>
                )}
              </div>
              <button className="edit-btn" onClick={() => startEditing(task)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDeleteClick(task._id, task.text)}>
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;