import warning from "./warning";

const bindStateToSelector = (prevKey: string, selector) => (state, ...args) => {
  const targetState = prevKey ? state[prevKey] : state;
  return selector(targetState, ...args);
};

type Selector<S, A extends any[], R> = (state: S, ...args: A) => R;

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

type BoundModule<M, S> = { [k in keyof M]: }
type CombineSelectors<T> = { [k in keyof T]: T[k] };
export const combineSelectors = <T>(modules: T): CombineSelectors<T> =>
  __combineSelectors(modules);

/*
 * cs = combineSelectors({ todo, count })
 * {
 *   todo: {
 *     getAll: state => state
 *     getById: (state, id) => state[id]
 *   },
 *   count: {
 *     getCount: state => state
 *   }
 * }
 */
