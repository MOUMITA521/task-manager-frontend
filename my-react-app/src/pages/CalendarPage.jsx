import { TaskProvider } from '../TaskContext';
import CalendarView from '../CalendarView';

function CalendarPage() {
  return (
    <TaskProvider>
      <div className="app-container">
        <CalendarView />
      </div>
    </TaskProvider>
  );
}

export default CalendarPage;