import { FC, useReducer } from "react";
import { v4 as uuid } from "uuid";
import { EntriesContext, entriesReducer } from "./";
import { Entry } from "@/interfaces";

export interface entriesState {
  entries: Entry[];
}

interface Props {
  children: React.ReactNode;
}

const entries_INITIAL_STATE: entriesState = {
  entries: [
    {
      _id: uuid(),
      description:
        "Pendiente: Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur molestias quod inventore?",
      status: "pending",
      createdAt: Date.now() - 1000000,
    },
    {
      _id: uuid(),
      description:
        "En-Progreso: Et quis irure minim elit proident sit non consectetur velit eu laborum sit aliqua consectetur.",
      status: "in-progress",
      createdAt: Date.now(),
    },
    {
      _id: uuid(),
      description:
        "Terminada: Eiusmod laborum consequat aute magna ea consectetur officia mollit ex sit ex.",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, entries_INITIAL_STATE);

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      _id: uuid(),
      description,
      status: "pending",
      createdAt: Date.now(),
    };

    dispatch({ type: "[Entry] - Add-Entry", payload: newEntry });
  };

  const updateEntry = (entry: Entry) => {
    dispatch({ type: "[Entry] - Update-Entry", payload: entry });
  };

  return (
    <EntriesContext.Provider value={{ ...state, addNewEntry, updateEntry }}>
      {children}
    </EntriesContext.Provider>
  );
};
