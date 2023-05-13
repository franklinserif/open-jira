import { Entry } from "@/interfaces";
import { entriesState } from "./";

type EntriesActionType =
  | { type: "[Entry] - Add-Entry"; payload: Entry }
  | { type: "[Entry] - Update-Entry"; payload: Entry };

export const entriesReducer = (
  state: entriesState,
  action: EntriesActionType
): entriesState => {
  switch (action.type) {
    case "[Entry] - Add-Entry":
      return { ...state, entries: [...state.entries, action.payload] };
    case "[Entry] - Update-Entry": {
      const { payload } = action;
      const newEntries = state.entries.map((entry: Entry) =>
        entry._id === payload._id ? payload : entry
      );
      return {
        ...state,
        entries: newEntries,
      };
    }

    default:
      return state;
  }
};
