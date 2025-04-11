import { motion } from 'framer-motion';
import { useState } from 'react';
import useStore from '../store/useStore.jsx';
import ReactPlayer from 'react-player';
import EditEventModal from './EditEventModal.jsx';

const Timeline = () => {
  const events = useStore((state) => state.events);
  const selectedEvent = useStore((state) => state.selectedEvent);
  const setSelectedEvent = useStore((state) => state.setSelectedEvent);
  const removeEvent = useStore((state) => state.removeEvent);
  const updateEvent = useStore((state) => state.updateEvent);
  const [editingEvent, setEditingEvent] = useState(null);

  // Сортируем события по году в порядке убывания (поздние годы слева)
  const sortedEvents = [...events].sort((a, b) => b.year - a.year);

  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  const handleDelete = (eventId) => {
    if (window.confirm('Вы уверены, что хотите удалить это событие?')) {
      removeEvent(eventId);
      if (selectedEvent?.id === eventId) {
        setSelectedEvent(null);
      }
    }
  };

  const handleSaveEdit = (updatedEvent) => {
    updateEvent(updatedEvent);
    if (selectedEvent?.id === updatedEvent.id) {
      setSelectedEvent(updatedEvent);
    }
  };

  const handleEventClick = (event) => {
    if (selectedEvent?.id === event.id) {
      setSelectedEvent(null);
    } else {
      setSelectedEvent(event);
    }
  };

  return (
    <div className="relative">
      <div className="flex overflow-x-auto pb-8">
        <div className="flex space-x-8">
          {sortedEvents.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0 w-64"
            >
              <div
                className={`p-4 rounded-lg cursor-pointer relative ${
                  selectedEvent?.id === event.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white'
                }`}
                onClick={() => handleEventClick(event)}
              >
                <h3 className="font-bold text-lg">{event.title}</h3>
                <p className="text-sm">{event.year}</p>
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(event);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Редактировать
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(event.id);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-gray-900 dark:text-white"
        >
          <h2 className="text-2xl font-bold mb-4">{selectedEvent.title}</h2>
          <p className="text-gray-600 mb-4">{selectedEvent.description}</p>
          <div className="aspect-video">
            <ReactPlayer
              url={selectedEvent.songUrl}
              width="100%"
              height="100%"
              controls
            />
          </div>
        </motion.div>
      )}

      {editingEvent && (
        <EditEventModal
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default Timeline; 