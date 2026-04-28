export type Listener<T> = (state: T, prevState: T) => void;
export type Unsubscribe = () => void;

export interface Store<T> {
  getState: () => T;
  setState: (updater: Partial<T> | ((prev: T) => T)) => void;
  subscribe: (listener: Listener<T>) => Unsubscribe;
  destroy: () => void;
}
