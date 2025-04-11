import { useState } from 'react';
import AddEventForm from './components/AddEventForm.jsx';
import EventList from './components/EventList.jsx';
import EventsMap from './components/EventsMap.jsx';
import useStore from './store/useStore.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';

function App() {
  const [activeTab, setActiveTab] = useState('events');
  const events = useStore((state) => state.events);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-neutral-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
            Саундтрек моей жизни
          </h1>
          <ThemeToggle />
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg shadow-sm">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                activeTab === 'events'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700'
              }`}
            >
              События
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                activeTab === 'map'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-700'
              }`}
            >
              Карта
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <AddEventForm />
          </div>
          <div className="lg:col-span-2">
            {activeTab === 'events' ? (
              <EventList />
            ) : (
              <EventsMap />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 