import { createContext, useReducer } from "react";

export const ItemContext = createContext();

export const itemReducer = (state, action) => {
  switch (action.type) {
    case "SET_ITEM":
      return {
        items: action.payload,
      };
    case "CREATE_ITEM":
      return {
        items: [action.payload, ...state.items],
      };
    default:
      return state;
  }
};

export const ItemContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(itemReducer, {
    items: [],
  });
  return (
    <ItemContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ItemContext.Provider>
  );
};
