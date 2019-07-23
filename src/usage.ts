import { combineSelectors } from "./";

type Todos = {
  [k: string]: string;
};

type State = {
  todos: Todos;
};

type Action = {
  type: string;
  payload: any;
};

const initialState: State = {
  todos: {}
};

export default function todoReducer(
  state: State = initialState,
  { payload, ...action }: Action
): State {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        todos: {
          [payload.id]: payload.data
        }
      };
    case "REMOVE":
      return undefined;
    default:
      return state;
  }
}

export const selectors = {
  getAll: (state: State): Todos => state.todos,
  getById: (state: State, id: string): string => state.todos[id]
};

const cs = combineSelectors({ todos: selectors });

const myTodos: State = {
  todos: { "1": "Buy milk", "2": "foo", "3": "Bar" }
};

export const allTodos = cs.todos.getAll(myTodos);
export const getFirst = cs.todos.getById(myTodos, "1");
export const anotherSelector = cs.hello.getById(myTodos, "1");
