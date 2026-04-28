import { Store, Listener } from "./types";

export function createStore<T extends object>(initialState: T): Store<T> {
  let state = initialState;
  const listeners = new Set<Listener<T>>();

  return {
    getState: () => state,
    setState: (updater) => {
      const prevState = state;
      const nextState = typeof updater === "function" ? (updater as any)(state) : { ...state, ...updater };
      if (Object.is(prevState, nextState)) return;
      state = nextState;
      listeners.forEach((fn) => fn(state, prevState));
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    destroy: () => listeners.clear(),
  };
}
