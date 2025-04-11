import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import useStore from '../store/useStore.jsx';

// Исправление иконки маркера для Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const EventsMap = () => {
  const events = useStore((state) => state.events);
  const eventsWithLocation = events.filter((event) => event.lat && event.lng);

  if (eventsWithLocation.length === 0) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Карта событий</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Нет событий с указанным местоположением. Добавьте местоположение при создании события.
        </p>
      </div>
    );
  }

  // Вычисляем центр карты как среднее значение координат всех событий
  const centerLat = eventsWithLocation.reduce((sum, event) => sum + event.lat, 0) / eventsWithLocation.length;
  const centerLng = eventsWithLocation.reduce((sum, event) => sum + event.lng, 0) / eventsWithLocation.length;

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Карта событий</h2>
      <div className="h-[600px] rounded-lg overflow-hidden">
        <MapContainer
          center={[centerLat, centerLng]}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {eventsWithLocation.map((event) => (
            <Marker key={event.id} position={[event.lat, event.lng]}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-gray-800 dark:text-white">{event.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{event.year}</p>
                  {event.songUrl && (
                    <div className="mt-2">
                      <iframe
                        src={event.songUrl}
                        width="100%"
                        height="80"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default EventsMap; 