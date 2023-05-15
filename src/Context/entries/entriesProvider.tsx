import { FC, useReducer, useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import { EntriesContext, entriesReducer } from "./";
import { Entry } from "@/interfaces";
import { entriesApi } from "@/axiosApi";
import { IEntry } from "@/models";

export interface entriesState {
  entries: Entry[];
}

interface Props {
  children: React.ReactNode;
}

const entries_INITIAL_STATE: entriesState = {
  entries: [],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, entries_INITIAL_STATE);

  const refreshEntries = async () => {
    try {
      const { data } = await entriesApi.get<IEntry[]>("/entries");
      dispatch({ type: "[Entry] - Refresh-Entry", payload: data });
    } catch (error) {
      enqueueSnackbar("refresh entry error", {
        variant: "success",
        autoHideDuration: 1500,
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  };

  useEffect(() => {
    refreshEntries();
  }, []);

  const addNewEntry = async (description: string) => {
    try {
      const { data } = await entriesApi.post<Entry>("/entries", {
        description,
      });
      dispatch({ type: "[Entry] - Add-Entry", payload: data });
    } catch (error) {
      enqueueSnackbar("create entry error", {
        variant: "success",
        autoHideDuration: 1500,
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  };

  const updateEntry = async (
    { _id, description, status }: Entry,
    showSnackbar = false
  ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
        description,
        status,
      });
      dispatch({ type: "[Entry] - Update-Entry", payload: data });
      if (!showSnackbar) return;
      enqueueSnackbar("entry updated", {
        variant: "success",
        autoHideDuration: 1500,
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } catch (error) {
      enqueueSnackbar("updated error", {
        variant: "error",
        autoHideDuration: 1500,
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      await entriesApi.delete(`/entries/${id}`);
      dispatch({ type: "[Entry] - Delete-Entry", payload: id });
      enqueueSnackbar("entry deleted", {
        variant: "success",
        autoHideDuration: 1500,
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    } catch (error) {
      enqueueSnackbar("delete error", {
        variant: "error",
        autoHideDuration: 1500,
        anchorOrigin: { vertical: "top", horizontal: "right" },
      });
    }
  };

  return (
    <EntriesContext.Provider
      value={{ ...state, addNewEntry, updateEntry, deleteEntry }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
