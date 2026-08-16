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
          <span className={task.completed ? "task-text completed" : "task-text"}>
            {task.text}
          </span>
          <button className="delete-btn" onClick={() => handleDeleteClick(task._id, task.text)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;