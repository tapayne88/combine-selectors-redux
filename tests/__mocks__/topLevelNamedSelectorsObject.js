export default () => ["default"];

export const selectors = {
  selector1: (state) => [state],
  selector2: (state, args) => [state, args],
  selector3: (state, arg1, arg2) => [state, arg1, arg2],
};
