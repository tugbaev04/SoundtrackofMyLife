import { useState } from 'react';
import useStore from '../store/useStore.jsx';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Исправление иконки маркера для Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const CATEGORIES = [
  { value: 'love', label: 'Любовь', color: 'bg-pink-200 text-pink-800' },
  { value: 'travel', label: 'Путешествия', color: 'bg-blue-200 text-blue-800' },
  { value: 'childhood', label: 'Детство', color: 'bg-yellow-200 text-yellow-800' },
  { value: 'friendship', label: 'Дружба', color: 'bg-green-200 text-green-800' },
  { value: 'inspiration', label: 'Вдохновение', color: 'bg-purple-200 text-purple-800' },
  { value: 'other', label: 'Другое', color: 'bg-gray-200 text-gray-800' },
];

const LocationMarker = ({ setLocation }) => {
  const map = useMapEvents({
    click(e) {
      setLocation({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return null;
};

const AddEventForm = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');
  const [songUrl, setSongUrl] = useState('');
  const [category, setCategory] = useState('other');
  const [location, setLocation] = useState(null);
  const addEvent = useStore((state) => state.addEvent);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now(),
      title,
      year,
      description,
      songUrl,
      category,
      ...(location && { lat: location.lat, lng: location.lng }),
    };
    addEvent(newEvent);
    setTitle('');
    setYear('');
    setDescription('');
    setSongUrl('');
    setCategory('other');
    setLocation(null);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-800 p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Добавить новое событие</h2>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2" htmlFor="title">
          Название события
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 dark:text-gray-300 dark:bg-neutral-700 dark:border-gray-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2" htmlFor="year">
          Год
        </label>
        <input
          type="number"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 dark:text-gray-300 dark:bg-neutral-700 dark:border-gray-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2" htmlFor="category">
          Категория
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 dark:text-gray-300 dark:bg-neutral-700 dark:border-gray-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
          required
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2" htmlFor="description">
          Описание
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 dark:text-gray-300 dark:bg-neutral-700 dark:border-gray-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
          rows="3"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2" htmlFor="songUrl">
          Ссылка на песню (YouTube/Spotify)
        </label>
        <input
          type="url"
          id="songUrl"
          value={songUrl}
          onChange={(e) => setSongUrl(e.target.value)}
          className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 dark:text-gray-300 dark:bg-neutral-700 dark:border-gray-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-colors duration-200"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
          Местоположение (опционально)
        </label>
        <div className="h-64 rounded-lg overflow-hidden">
          <MapContainer
            center={[55.7558, 37.6173]} // Москва по умолчанию
            zoom={5}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {location && <Marker position={[location.lat, location.lng]} />}
            <LocationMarker setLocation={setLocation} />
          </MapContainer>
        </div>
        {location && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Выбрано местоположение: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800 transition-colors duration-200"
      >
        Добавить событие
      </button>
    </form>
  );
};

export default AddEventForm; 