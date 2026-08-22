import { useTasks } from './TaskContext';

function TaskList() {
  const { tasks, filter, deleteTask, toggleComplete, loading } = useTasks();

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

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (filteredTasks.length === 0) {
    return <p className="empty-state">No tasks yet. Add one above! ✨</p>;
  }

  return (
    <ul className="task-list">
      {filteredTasks.map((task) => (
        <li key={task._id} className="task-item">
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
          <button className="delete-btn" onClick={() => handleDeleteClick(task._id, task.text)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;