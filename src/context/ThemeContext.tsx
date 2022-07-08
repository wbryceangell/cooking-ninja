import React, { createContext, Reducer, useReducer } from "react";

type State = Partial<{ color: string }>;
type Action = { type: "CHANGE_COLOR"; payload?: any };
const themeReducer: Reducer<State, Action> = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "CHANGE_COLOR":
      return { ...state, color: payload };
    default:
      return state;
  }
};

export const ThemeContext = createContext<
  State & { dispatch?: React.Dispatch<Action> }
>({});
export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(themeReducer, {});
  return (
    <ThemeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};
