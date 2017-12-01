import warning from "./warning";

const bindStateToSelector = (prevKey, selector) => (state, ...args) => {
  const targetState = prevKey ? state[prevKey] : state;
  return selector(targetState, ...args);
};

const __combineSelectors = (selectors, prevKey = false) => {
  return Object.keys(selectors).reduce((finalSelectors, selectorKey) => {
    const selector = selectors[selectorKey];

    if (process.env.NODE_ENV !== "production") {
      if (typeof selector === "undefined") {
        warning(`No selector provided for key "${selectorKey}"`);
      }
    }

    if (typeof selector === "function") {
      return {
        ...finalSelectors,
        [selectorKey]: bindStateToSelector(prevKey, selector)
      };
    } else {
      return {
        ...finalSelectors,
        [selectorKey]: __combineSelectors(selector, prevKey || selectorKey)
      };
    }
  }, {});
};

export const combineSelectors = modules => {
  return __combineSelectors(modules);
};
