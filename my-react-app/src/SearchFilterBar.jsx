import { useTasks } from './TaskContext';

function SearchFilterBar() {
  const {
    searchTerm, setSearchTerm,
    categoryFilter, setCategoryFilter,
    priorityFilter, setPriorityFilter,
    sortBy, setSortBy,
  } = useTasks();

  return (
    <div className="search-filter-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="🔍 Search tasks..."
        className="search-input"
      />

      <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="filter-select">
        <option value="all">All Categories</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Health">Health</option>
        <option value="Other">Other</option>
      </select>

      <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="filter-select">
        <option value="all">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
        <option value="createdAt">Sort: Newest First</option>
        <option value="dueDate">Sort: Due Date</option>
        <option value="priority">Sort: Priority</option>
      </select>
    </div>
  );
}

export default SearchFilterBar;