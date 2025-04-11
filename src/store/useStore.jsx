import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      events: [],
      selectedEvent: null,
      selectedCategory: 'all',
      
      // Установка выбранного события
      setSelectedEvent: (event) => set({ selectedEvent: event }),
      
      // Установка выбранной категории
      setSelectedCategory: (category) => set({ selectedCategory: category }),
      
      // Добавление события
      addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
      
      // Обновление события
      updateEvent: (updatedEvent) => set((state) => ({
        events: state.events.map((event) => 
          event.id === updatedEvent.id ? updatedEvent : event
        )
      })),
      
      // Удаление события
      removeEvent: (id) => set((state) => ({ 
        events: state.events.filter((e) => e.id !== id) 
      })),
    }),
    {
      name: 'soundtrack-storage',
    }
  )
);

export default useStore; 