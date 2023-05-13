import { createContext } from "react";

export interface ContextProps {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDraggin: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
  setIsAddingEntry: (isAdding: boolean) => void;
  startDraggin: () => void;
  endDraggin: () => void;
}

export const UIContext = createContext({} as ContextProps);
