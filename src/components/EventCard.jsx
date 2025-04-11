import { useState } from 'react';
import useStore from '../store/useStore.jsx';

const CATEGORIES = [
  { value: 'love', label: 'Любовь', color: 'bg-pink-200 text-pink-800' },
  { value: 'travel', label: 'Путешествия', color: 'bg-blue-200 text-blue-800' },
  { value: 'childhood', label: 'Детство', color: 'bg-yellow-200 text-yellow-800' },
  { value: 'friendship', label: 'Дружба', color: 'bg-green-200 text-green-800' },
  { value: 'inspiration', label: 'Вдохновение', color: 'bg-purple-200 text-purple-800' },
  { value: 'other', label: 'Другое', color: 'bg-gray-200 text-gray-800' },
];

const EventCard = ({ event }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const removeEvent = useStore((state) => state.removeEvent);
  const editEvent = useStore((state) => state.editEvent);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({ ...event });

  const category = CATEGORIES.find(cat => cat.value === event.category) || CATEGORIES[CATEGORIES.length - 1];

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleDelete = () => {
    removeEvent(event.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editEvent(editedEvent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedEvent({ ...event });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 mb-6">
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
            Название
          </label>
          <input
            type="text"
            value={editedEvent.title}
            onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-neutral-700 dark:border-gray-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
            Год
          </label>
          <input
            type="number"
            value={editedEvent.year}
            onChange={(e) => setEditedEvent({ ...editedEvent, year: e.target.value })}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-neutral-700 dark:border-gray-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
            Категория
          </label>
          <select
            value={editedEvent.category}
            onChange={(e) => setEditedEvent({ ...editedEvent, category: e.target.value })}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-neutral-700 dark:border-gray-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
            Описание
          </label>
          <textarea
            value={editedEvent.description}
            onChange={(e) => setEditedEvent({ ...editedEvent, description: e.target.value })}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-neutral-700 dark:border-gray-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            rows="3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
            Ссылка на песню
          </label>
          <input
            type="url"
            value={editedEvent.songUrl}
            onChange={(e) => setEditedEvent({ ...editedEvent, songUrl: e.target.value })}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-neutral-700 dark:border-gray-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-neutral-700 rounded-lg hover:bg-gray-300 dark:hover:bg-neutral-600 transition-colors duration-200"
          >
            Отмена
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            Сохранить
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">{event.title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{event.year}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${category.color}`}>
          {category.label}
        </span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{event.description}</p>
      {event.lat && event.lng && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Местоположение: {event.lat.toFixed(4)}, {event.lng.toFixed(4)}
          </p>
        </div>
      )}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePlay}
          className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isPlaying ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
            )}
          </svg>
          <span>{isPlaying ? 'Пауза' : 'Воспроизвести'}</span>
        </button>
        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {isPlaying && (
        <div className="mt-4">
          <iframe
            src={event.songUrl}
            width="100%"
            height="80"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={`Песня: ${event.title}`}
          />
        </div>
      )}
    </div>
  );
};

export default EventCard; 