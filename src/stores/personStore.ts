
import { create } from 'zustand';
import type { Person } from '../features/person/types/person';
import { getPeople, createPerson } from '../features/person/services/personService';

type PersonState = {
  people: Person[];
  loadPeople: () => Promise<void>;
  addPerson: (p: Person) => Promise<void>;
};

export const usePersonStore = create<PersonState>((set, get) => ({
  people: [],
  loadPeople: async () => {
    const data = await getPeople();
    set({ people: data });
  },
  addPerson: async (p) => {
    const newPerson = await createPerson(p);
    set({ people: [...get().people, newPerson] });
  }
}));
