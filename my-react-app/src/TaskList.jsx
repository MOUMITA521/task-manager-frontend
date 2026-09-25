import { useState } from 'react';
import { useTasks } from './TaskContext';

const categoryColors = {
  Work: '#4299e1',
  Personal: '#48bb78',
  Health: '#ed8936',
  Other: '#a0aec0',
};

const priorityColors = {
  Low: '#a0aec0',
  Medium: '#ecc94b',
  High: '#f56565',
};

function TaskList() {
  const {
    tasks,
    filter,
    deleteTask,
    toggleComplete,
    editTask,
    loading,
    searchTerm,
    categoryFilter,
    priorityFilter,
    sortBy,
  } = useTasks();

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDueDate, setEditDueDate] = useState("");
  const [editDueTime, setEditDueTime] = useState("");
  const [editCategory, setEditCategory] = useState("Other");
  const [editPriority, setEditPriority] = useState("Medium");

  if (loading) {
    return <p className="loading-text">Loading tasks...</p>;
  }

  // Check whether task deadline has passed
  const isOverdue = (task) => {
    if (!task.dueDate || task.completed) {
      return false;
    }

    return new Date(task.dueDate).getTime() < Date.now();
  };

  // Format date in Indian format
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

  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3,
  };

  // Filter tasks
  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "completed" && !task.completed) return false;

      if (filter === "pending" && task.completed) return false;

      if (filter === "overdue" && !isOverdue(task)) return false;

      if (
        categoryFilter !== "all" &&
        task.category !== categoryFilter
      ) {
        return false;
      }

      if (
        priorityFilter !== "all" &&
        task.priority !== priorityFilter
      ) {
        return false;
      }

      if (
        searchTerm &&
        !task.text.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "dueDate") {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;

        return new Date(a.dueDate) - new Date(b.dueDate);
      }

      if (sortBy === "priority") {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }

      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  // Delete task
  const handleDeleteClick = (id, text) => {
    const confirmed = window.confirm(
      `Delete "${text}"? This cannot be undone.`
    );

    if (confirmed) {
      deleteTask(id);
    }
  };

  // Start editing
  const startEditing = (task) => {
    setEditingId(task._id);
    setEditText(task.text);
    setEditDescription(task.description || "");
    setEditCategory(task.category || "Other");
    setEditPriority(task.priority || "Medium");

    if (task.dueDate) {
      const date = new Date(task.dueDate);

      // Convert UTC date to local browser time
      const localDateTime = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      )
        .toISOString();

      setEditDueDate(localDateTime.slice(0, 10));
      setEditDueTime(localDateTime.slice(11, 16));
    } else {
      setEditDueDate("");
      setEditDueTime("");
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditDueDate("");
    setEditDueTime("");
  };

  // Save edited task
  const saveEdit = (id) => {
    if (editText.trim() === "") return;

    let isoDueDate = null;

    if (editDueDate) {
      // If time is empty → 11:59 PM
      const time = editDueTime || "23:59";

      const localDateTime = new Date(
        `${editDueDate}T${time}`
      );

      isoDueDate = localDateTime.toISOString();
    }

    editTask(
      id,
      editText,
      isoDueDate,
      editCategory,
      editPriority,
      editDescription
    );

    setEditingId(null);
    setEditDueDate("");
    setEditDueTime("");
  };

  if (filteredTasks.length === 0) {
    return (
      <p className="empty-state">
        No matching tasks found.
      </p>
    );
  }

  return (
    <ul className="task-list">
      {filteredTasks.map((task) => (
        <li key={task._id} className="task-item">

          {editingId === task._id ? (

            // ================= EDIT MODE =================
            <div className="edit-mode">

              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="edit-input"
              />

              <textarea
                value={editDescription}
                onChange={(e) =>
                  setEditDescription(e.target.value)
                }
                placeholder="Description (optional)"
                className="description-input"
              />

              <div className="add-task-extra-row">

                <select
                  value={editCategory}
                  onChange={(e) =>
                    setEditCategory(e.target.value)
                  }
                  className="category-select"
                >
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Health">Health</option>
                  <option value="Other">Other</option>
                </select>

                <select
                  value={editPriority}
                  onChange={(e) =>
                    setEditPriority(e.target.value)
                  }
                  className="priority-select"
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                </select>

                {/* Edit Date */}
                <input
                  type="date"
                  value={editDueDate}
                  onChange={(e) =>
                    setEditDueDate(e.target.value)
                  }
                  className="date-input"
                />

                {/* Edit Time - Optional */}
                <input
                  type="time"
                  value={editDueTime}
                  onChange={(e) =>
                    setEditDueTime(e.target.value)
                  }
                  className="time-input"
                />

              </div>

              <div className="edit-actions">

                <button
                  className="save-btn"
                  onClick={() => saveEdit(task._id)}
                >
                  Save
                </button>

                <button
                  className="cancel-btn"
                  onClick={cancelEditing}
                >
                  Cancel
                </button>

              </div>
            </div>

          ) : (

            // ================= NORMAL MODE =================
            <>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task._id)}
              />

              <div className="task-content">

                <div className="task-text-row">

                  <span
                    className="category-badge"
                    style={{
                      backgroundColor:
                        categoryColors[task.category] ||
                        categoryColors.Other,
                    }}
                  >
                    {task.category || "Other"}
                  </span>

                  <span
                    className="priority-badge"
                    style={{
                      backgroundColor:
                        priorityColors[task.priority] ||
                        priorityColors.Medium,
                    }}
                  >
                    {task.priority || "Medium"}
                  </span>

                  {isOverdue(task) && (
                    <span className="overdue-badge">
                      ⚠ Overdue
                    </span>
                  )}

                  <span
                    className={
                      task.completed
                        ? "task-text completed"
                        : "task-text"
                    }
                  >
                    {task.text}
                  </span>

                </div>

                {task.description && (
                  <span className="task-description">
                    {task.description}
                  </span>
                )}

                {task.dueDate && (
                  <span
                    className={
                      isOverdue(task)
                        ? "due-date overdue-text"
                        : "due-date"
                    }
                  >
                    📅 {formatDueDate(task.dueDate)}
                  </span>
                )}

              </div>

              <button
                className="edit-btn"
                onClick={() => startEditing(task)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  handleDeleteClick(task._id, task.text)
                }
              >
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