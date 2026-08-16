import { useTasks } from './TaskContext';

function FilterButtons() {
  const { filter, setFilter } = useTasks();

  return (
    <div className="filter-container">
      <button 
        className={filter === "all" ? "active" : ""} 
        onClick={() => setFilter("all")}
      >
        All
      </button>
      <button 
        className={filter === "completed" ? "active" : ""} 
        onClick={() => setFilter("completed")}
      >
        Completed
      </button>
      <button 
        className={filter === "pending" ? "active" : ""} 
        onClick={() => setFilter("pending")}
      >
        Pending
      </button>
    </div>
  );
}

export default FilterButtons;