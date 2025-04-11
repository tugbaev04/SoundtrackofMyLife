import { useState, useEffect, useCallback } from 'react';
import useStore from '../store/useStore.jsx';
import { debounce } from 'lodash';

const CATEGORIES = [
  { value: 'all', label: 'Все', color: 'bg-gray-200 text-gray-800' },
  { value: 'love', label: 'Любовь', color: 'bg-pink-200 text-pink-800' },
  { value: 'travel', label: 'Путешествия', color: 'bg-blue-200 text-blue-800' },
  { value: 'childhood', label: 'Детство', color: 'bg-yellow-200 text-yellow-800' },
  { value: 'friendship', label: 'Дружба', color: 'bg-green-200 text-green-800' },
  { value: 'inspiration', label: 'Вдохновение', color: 'bg-purple-200 text-purple-800' },
  { value: 'other', label: 'Другое', color: 'bg-gray-200 text-gray-800' },
];

const EventFilters = ({ onFilterChange }) => {
  const events = useStore((state) => state.events);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  // Получаем уникальные годы из событий
  const years = [...new Set(events.map((event) => event.year))].sort((a, b) => b - a);

  // Создаем отложенную функцию для поиска
  const debouncedSearch = useCallback(
    debounce((term) => {
      onFilterChange({
        searchTerm: term,
        category: selectedCategory,
        year: selectedYear,
      });
    }, 300),
    [selectedCategory, selectedYear]
  );

  // Обработчик изменения поискового запроса
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    debouncedSearch(term);
  };

  // Обработчики изменения фильтров
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onFilterChange({
      searchTerm,
      category,
      year: selectedYear,
    });
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    onFilterChange({
      searchTerm,
      category: selectedCategory,
      year,
    });
  };

  // Очищаем отложенную функцию при размонтировании
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Поиск */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
            Поиск
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Поиск по названию или описанию..."
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-neutral-700 dark:border-gray-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>

        {/* Фильтр по категории */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
            Категория
          </label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-neutral-700 dark:border-gray-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            {CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Фильтр по году */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-semibold mb-2">
            Год
          </label>
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-neutral-700 dark:border-gray-600 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            <option value="all">Все годы</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default EventFilters; 