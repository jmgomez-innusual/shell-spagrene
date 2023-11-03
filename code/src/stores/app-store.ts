import { create } from "zustand";

type Feature = {
  counter: number;
};

type State = {
  [key: string]: Feature;
};

export type AppState = {
  app: State;
  setCounter: (featureId: string, counter: number) => void;
};

const useAppStore = create<AppState>((set) => ({
  app: {
    featureA: {
      counter: 10,
    },
    featureB: {
      counter: 0,
    },
  },
  setCounter: (featureId: string, counter: number) =>
    set((state) => {
      const newState: AppState = { ...state };
      if (newState.app[featureId]) {
        newState.app[featureId].counter = counter;
      }
      return newState;
    }),
}));

export default useAppStore;
