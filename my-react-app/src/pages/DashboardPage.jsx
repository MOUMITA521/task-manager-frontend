import { TaskProvider } from '../TaskContext';
import AddTask from '../AddTask';
import SearchFilterBar from '../SearchFilterBar';
import FilterButtons from '../FilterButtons';
import TaskList from '../TaskList';
import TaskStats from '../TaskStats';

function DashboardPage() {
  return (
    <TaskProvider>
      <div className="app-container">
        <AddTask />
        <SearchFilterBar />
        <FilterButtons />
        <TaskList />
        <TaskStats />
      </div>
    </TaskProvider>
  );
}

export default DashboardPage;