import { useState } from 'react';
import { useTasks } from './TaskContext';

function AddTask() {
  const [inputValue, setInputValue] = useState("");
  const { addTask } = useTasks();

  const handleAdd = () => {
    if (inputValue.trim() === "") return;
    addTask(inputValue);
    setInputValue("");
  };

  return (
    <div className="add-task-container">
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new task..."
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default AddTask;