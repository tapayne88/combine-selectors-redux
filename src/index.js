const bindStateToSelector = (prevKey, selector) => (state, ...args) => {
  const targetState = prevKey ? state[prevKey] : state;
  return selector(targetState, ...args);
};

const __combineSelectors = (selectors, prevKey = false) => {
  const selectorKeys = Object.keys(selectors);

  const finalSelectors = {};
  for (let i = 0; i < selectorKeys.length; i++) {
    const selectorKey = selectorKeys[i];

    const selector = selectors[selectorKey];
    if (typeof selector === "function") {
      finalSelectors[selectorKey] = bindStateToSelector(prevKey, selector);
    } else {
      finalSelectors[selectorKey] = __combineSelectors(
        selector,
        prevKey || selectorKey
      );
    }
  }
  return finalSelectors;
};

export const combineSelectors = modules => {
  return __combineSelectors(modules);
};
