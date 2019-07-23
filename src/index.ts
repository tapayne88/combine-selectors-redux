import warning from "./warning";

const bindStateToSelector = (prevKey: string, selector) => (state, ...args) => {
  const targetState = prevKey ? state[prevKey] : state;
  return selector(targetState, ...args);
};

/*
 *
 * {
 *   todos: {
 *     mine: {
 *       getAll: () => {}
 *     },
 *     yours: {
 *       getAll: () => {}
 *     }
 *   }
 *
 *
 * prevKey: undefined, todos, mine
 */

const __combineSelectors = (selectors: Selectors, prevKey?) => {
  return Object.keys(selectors).reduce((boundSelectors, selectorKey) => {
    const selector = selectors[selectorKey];

    if (process.env.NODE_ENV !== "production") {
      if (typeof selector === "undefined") {
        warning(`No selector provided for key "${selectorKey}"`);
      }
    }

    if (typeof selector === "function") {
      return {
        ...boundSelectors,
        [selectorKey]: bindStateToSelector(prevKey, selector)
      };
    } else {
      return {
        ...boundSelectors,
        [selectorKey]: __combineSelectors(selector, prevKey || selectorKey)
      };
    }
  }, {});
};

type Selector<S = any, A extends any[] = any[], R = any> = (
  state: S,
  ...args: A
) => R;
type SelectorsMapObject<S = any> = {
  [K in keyof S]: SelectorsMapObject<S[K]> | S[K] extends Selector<
    S[K],
    any,
    any
  >
    ? Selector<S[K], any, any>
    : never
};
export type CombineSelectors = (
  selectorMap: SelectorsMapObject
) => SelectorsMapObject;
export const combineSelectors: CombineSelectors = modules =>
  __combineSelectors(modules);



/*
 * combineSelectors: {
 *  [keys are strings which should match whole state shape]: values are other objects or selectors
 * }
 *
 * Pre Bound Selectors: (take local state shape) => some part of the state
 * Post Bound Selectors: (take whole state shape) => some part of local state
 *
 * {
 *  todos: {
 *    getAll: (state) => state
 *    getById: (state, id) => state[id]
 *  }
 * }
 */
type CombineSelectors<T> = (module: T) => 
