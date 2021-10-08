import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "./Note";
import { v1 as uuid } from "uuid";

export interface NotesState {
  notes: Note[];
  currentNoteId: string | null;
}

const initialState: NotesState = {
  notes: [],
  currentNoteId: null,
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (state) => {
      state.notes.push({
        content: [],
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        id: uuid(),
        title: "",
      });
    },
    removeNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload.id);
      if (index !== -1) {
        state.notes.splice(index, 1);
      }
    },
    updateNote: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    selectNote: (state, action: PayloadAction<string>) => {
      state.currentNoteId = action.payload;
    },
  },
});

export const { addNote, removeNote, updateNote, selectNote } = notesSlice.actions;

export default notesSlice.reducer;
