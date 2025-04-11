import { useState, useEffect } from 'react';
import AddEventForm from './components/AddEventForm.jsx';
import Timeline from './components/Timeline.jsx';

function App() {
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
      setShowSaveMessage(true);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Саундтрек моей жизни
        </h1>
        
        {showSaveMessage && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded">
            <p>Не забудьте сохранить изменения перед перезагрузкой страницы!</p>
          </div>
        )}

        <div className="space-y-8">
          <AddEventForm />
          <Timeline />
        </div>
      </div>
    </div>
  );
}

export default App; 