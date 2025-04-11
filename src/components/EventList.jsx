import { useState } from 'react';
import useStore from '../store/useStore.jsx';
import EventCard from './EventCard.jsx';
import EventFilters from './EventFilters.jsx';

const CATEGORIES = [
  { value: 'all', label: 'Все', color: 'bg-gray-200 text-gray-800' },
  { value: 'love', label: 'Любовь', color: 'bg-pink-200 text-pink-800' },
  { value: 'travel', label: 'Путешествия', color: 'bg-blue-200 text-blue-800' },
  { value: 'childhood', label: 'Детство', color: 'bg-yellow-200 text-yellow-800' },
  { value: 'friendship', label: 'Дружба', color: 'bg-green-200 text-green-800' },
  { value: 'inspiration', label: 'Вдохновение', color: 'bg-purple-200 text-purple-800' },
  { value: 'other', label: 'Другое', color: 'bg-gray-200 text-gray-800' },
];

const EventList = () => {
  const events = useStore((state) => state.events);
  const [filters, setFilters] = useState({
    searchTerm: '',
    category: 'all',
    year: 'all',
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredEvents = events.filter((event) => {
    // Фильтр по поисковому запросу
    const matchesSearch =
      filters.searchTerm === '' ||
      event.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(filters.searchTerm.toLowerCase());

    // Фильтр по категории
    const matchesCategory =
      filters.category === 'all' || event.category === filters.category;

    // Фильтр по году
    const matchesYear = filters.year === 'all' || event.year === filters.year;

    return matchesSearch && matchesCategory && matchesYear;
  });

  return (
    <div className="space-y-6">
      <EventFilters onFilterChange={handleFilterChange} />
      
      {filteredEvents.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            {filters.searchTerm || filters.category !== 'all' || filters.year !== 'all'
              ? 'События не найдены. Попробуйте изменить параметры поиска.'
              : 'У вас пока нет событий. Добавьте первое событие!'}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList; 