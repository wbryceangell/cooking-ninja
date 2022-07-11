import React, { createContext, Reducer, useReducer } from "react";
import { ThemeColors } from "../constants/ThemeColors";
import { ThemeModes } from "../constants/ThemeModes";

type Context<State, Action> = Partial<
  State & { dispatch: React.Dispatch<Action> }
>;
type State = { color: ThemeColors; mode: ThemeModes };
type ActionType = "CHANGE_COLOR" | "TOGGLE_MODE";
type Action = { type: ActionType; payload?: any };

const themeReducer: Reducer<State, Action> = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "CHANGE_COLOR":
      return { ...state, color: payload };
    case "TOGGLE_MODE": {
      const mode =
        state.mode === ThemeModes.Dark ? ThemeModes.Light : ThemeModes.Dark;
      return { ...state, mode };
    }
    default:
      return state;
  }
};

export const ThemeContext = createContext<Context<State, Action>>({});
export const ThemeProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(themeReducer, {
    color: ThemeColors.Green,
    mode: ThemeModes.Light,
  });
  return (
    <ThemeContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ThemeContext.Provider>
  );
};
