export default () => ["default"]

export const selector1 = state => [state]

export const selector2 = (state, args) => [state, args]

export const selector3 = (state, arg1, arg2) => [state, arg1, arg2]
