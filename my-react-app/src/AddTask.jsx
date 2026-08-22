import { useState } from 'react';
import { useTasks } from './TaskContext';

function AddTask() {
  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { addTask } = useTasks();

  const handleAdd = () => {
    if (inputValue.trim() === "") return;
    addTask(inputValue, dueDate || null);
    setInputValue("");
    setDueDate("");
  };

  return (
    <div className="add-task-container">
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new task..."
      />
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="date-input"
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default AddTask;