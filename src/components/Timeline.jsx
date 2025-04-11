import { motion } from 'framer-motion';
import useStore from '../store/useStore.jsx';
import ReactPlayer from 'react-player';

const Timeline = () => {
  const events = useStore((state) => state.events);
  const selectedEvent = useStore((state) => state.selectedEvent);
  const setSelectedEvent = useStore((state) => state.setSelectedEvent);

  return (
    <div className="relative">
      <div className="flex overflow-x-auto pb-8">
        <div className="flex space-x-8">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0 w-64"
            >
              <div
                className={`p-4 rounded-lg cursor-pointer ${
                  selectedEvent?.id === event.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-white hover:bg-gray-100'
                }`}
                onClick={() => setSelectedEvent(event)}
              >
                <h3 className="font-bold text-lg">{event.title}</h3>
                <p className="text-sm">{event.year}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-white rounded-lg shadow-md"
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
    </div>
  );
};

export default Timeline; 