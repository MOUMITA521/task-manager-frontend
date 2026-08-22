import { useState } from 'react';
import { useTasks } from './TaskContext';

function CalendarView() {
  const { tasks } = useTasks();
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Is month ka pehla din kaunse day pe aata hai (0=Sunday, 1=Monday...)
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Is month mein kितने din hain
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  // Kisi specific din ke tasks nikalna
  const getTasksForDay = (day) => {
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === day &&
        taskDate.getMonth() === month &&
        taskDate.getFullYear() === year
      );
    });
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Calendar grid ke liye empty boxes (mahine ke pehle din se pehle)
  const emptyBoxes = Array(firstDayOfMonth).fill(null);
  const dayBoxes = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const today = new Date();
  const isToday = (day) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={goToPreviousMonth}>‹</button>
        <h3>{monthNames[month]} {year}</h3>
        <button onClick={goToNextMonth}>›</button>
      </div>

      <div className="calendar-grid">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day} className="calendar-day-label">{day}</div>
        ))}

        {emptyBoxes.map((_, index) => (
          <div key={`empty-${index}`} className="calendar-box empty"></div>
        ))}

        {dayBoxes.map(day => {
          const dayTasks = getTasksForDay(day);
          return (
            <div key={day} className={`calendar-box ${isToday(day) ? 'today' : ''}`}>
              <span className="calendar-day-number">{day}</span>
              {dayTasks.map(task => (
                <div key={task._id} className="calendar-task">
                  {task.text}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarView;