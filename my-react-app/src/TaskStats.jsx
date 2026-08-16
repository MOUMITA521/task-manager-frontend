import { useTasks } from './TaskContext';

function TaskStats() {
  const { tasks } = useTasks();

  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const pending = total - completed;

  return (
    <div className="stats-container">
      <p>Total: {total} | Completed: {completed} | Pending: {pending}</p>
    </div>
  );
}

export default TaskStats;