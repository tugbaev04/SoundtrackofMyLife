import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      events: [],
      addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
      removeEvent: (id) => set((state) => ({ events: state.events.filter((e) => e.id !== id) })),
      selectedEvent: null,
      setSelectedEvent: (event) => set({ selectedEvent: event }),
    }),
    {
      name: 'soundtrack-storage',
    }
  )
);

export default useStore; 