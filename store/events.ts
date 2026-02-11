import { create } from "zustand";

type Store = {
  Events: [];
  inc: (Events: []) => void;
};

export const useEvents = create<Store>()((set) => ({
  Events: [],
  inc: (Events) => set(() => ({ Events: Events })),
}));
