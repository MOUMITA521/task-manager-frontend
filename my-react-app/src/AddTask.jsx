import { useState } from 'react';
import { useTasks } from './TaskContext';

function AddTask() {
  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [category, setCategory] = useState("Other");
  const [priority, setPriority] = useState("Medium");
  const [description, setDescription] = useState("");
  const [showMore, setShowMore] = useState(false);

  const { addTask } = useTasks();

  const handleAdd = () => {
    if (inputValue.trim() === "") return;

    let isoDueDate = null;

    // Date selected
    if (dueDate) {
      // If time is not given, deadline = 11:59 PM
      const time = dueTime || "23:59";
      const localDateTime = new Date(`${dueDate}T${time}`);

      isoDueDate = localDateTime.toISOString();
    }

   

    addTask(
      inputValue,
      isoDueDate,
      category,
      priority,
      description
    );

    // Reset fields
    setInputValue("");
    setDueDate("");
    setDueTime("");
    setCategory("Other");
    setPriority("Medium");
    setDescription("");
    setShowMore(false);
  };

  return (
    <div className="add-task-container">
      <div className="add-task-row">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
        />

        <button
          className="toggle-more-btn"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Less ▲" : "More ▼"}
        </button>

        <button onClick={handleAdd}>
          Add
        </button>
      </div>

      {showMore && (
        <div className="add-task-extra">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            className="description-input"
          />

          <div className="add-task-extra-row">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="category-select"
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="priority-select"
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>

            {/* Due Date */}
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="date-input"
            />

            {/* Optional Due Time */}
            <input
              type="time"
              value={dueTime}
              onChange={(e) => setDueTime(e.target.value)}
              className="time-input"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTask;