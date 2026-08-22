import { useState } from 'react';
import { useTasks } from './TaskContext';

function AddTask() {
  const [inputValue, setInputValue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { addTask } = useTasks();

  const handleAdd = () => {
    if (inputValue.trim() === "") return;
    
    // Local time ko sahi se ISO/UTC format mein convert kiya
    const isoDueDate = dueDate ? new Date(dueDate).toISOString() : null;
    
    addTask(inputValue, isoDueDate);
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