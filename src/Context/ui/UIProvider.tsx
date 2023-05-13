import { FC, useReducer } from "react";
import { UIContext, UIReducer } from "./";

export interface UIState {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDraggin: boolean;
}

interface Props {
  children: React.ReactNode;
}

const UI_INITIAL_STATE: UIState = {
  sideMenuOpen: false,
  isAddingEntry: false,
  isDraggin: false,
};

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: "UI - Open Sidebar" });
  };

  const closeSideMenu = () => {
    dispatch({ type: "UI - Close Sidebar" });
  };

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({ type: "UI - Set isAddingEntry", payload: isAdding });
  };

  const startDraggin = () => {
    dispatch({ type: "UI - Start Draggin" });
  };

  const endDraggin = () => {
    dispatch({ type: "UI - End Draggin" });
  };

  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
        startDraggin,
        endDraggin,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
