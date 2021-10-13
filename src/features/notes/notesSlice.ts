import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "./Note";
import { v1 as uuid } from "uuid";
import { AddBlockToNote } from "./AddBlockToNote";
import { Block } from "./Block";
import { RemoveBlock } from "./RemoveBlock";

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
    // notes
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
    // blocks
    addBlock: (state, action: PayloadAction<AddBlockToNote>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload.noteId);
      if (index !== -1) {
        const block: Block = { ...action.payload, id: uuid() };
        if (action.payload.index) {
          state.notes[index].content.splice(action.payload.index, 0, block);
        } else {
          state.notes[index].content.push(block);
        }
      }
    },
    editBlock: (state, action: PayloadAction<Block>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload.noteId);
      if (index !== -1) {
        const blockIndex = state.notes[index].content.findIndex((block) => block.id === action.payload.id);
        if (blockIndex !== -1) {
          state.notes[index].content[blockIndex] = action.payload;
        }
      }
    },
    removeBlock: (state, action: PayloadAction<RemoveBlock>) => {
      const index = state.notes.findIndex((note) => note.id === action.payload.noteId);
      if (index !== -1) {
        const blockIndex = state.notes[index].content.findIndex((block) => block.id === action.payload.id);
        if (blockIndex !== -1) {
          state.notes[index].content.splice(blockIndex, 1);
        }
      }
    },
  },
});

export const { addNote, removeNote, updateNote, selectNote, addBlock, editBlock, removeBlock } = notesSlice.actions;

export default notesSlice.reducer;
