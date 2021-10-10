import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import EditorLine from "./EditorLine";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import { useHistory } from "react-router-dom";
import { updateNote } from "features/notes/notesSlice";
import { Block, BlockType, Note } from "features/notes/Note";
import useDebounce from "./../../app/utils/debounce";

const Editor = () => {
  const note = useSelector((state: RootState) => state.notes.notes.find((n) => n.id === state.notes.currentNoteId));
  const currentNoteId = useSelector((state: RootState) => state.notes.currentNoteId);
  const history = useHistory();
  const dispatch = useDispatch();

  // navigate away from editor if note is not found
  if (!note) {
    history.push("/");
  }

  const [title, setTitle] = useState(note?.title || "New Note");
  const titleEl = useRef<HTMLInputElement>(null);
  const debouncedTitle = useDebounce(title, 1000);

  const [blocks, setBlocks] = useState<Block[]>(note?.content || []);
  const debouncedBlocks = useDebounce(blocks, 200);

  // focus title when note new
  useEffect(() => {
    if (note?.content.length === 0 && titleEl.current) {
      titleEl.current.focus();
    }
  }, [note?.content.length]);

  const edit = (l: string, index: number) => {
    const newBlocks = [...blocks];
    newBlocks[index] = {
      type: BlockType.TEXT,
      data: l,
    };
    setBlocks(newBlocks);
  };

  const add = (l: string) => {
    const newBlocks = [...blocks];
    newBlocks.push({
      type: BlockType.TEXT,
      data: l,
    });
    setBlocks(newBlocks);
  };

  // update content
  useEffect(() => {
    if (note?.title !== debouncedTitle || !note?.content.every((x, i) => debouncedBlocks[i]?.data === x.data)) {
      console.log("updateNote", note, debouncedTitle, debouncedBlocks);
      console.log(note?.title !== debouncedTitle, note?.content !== debouncedBlocks);
      dispatch(updateNote({ ...note, title: debouncedTitle, content: debouncedBlocks } as Note));
    }
  }, [debouncedTitle, debouncedBlocks, note, dispatch]);

  window.onkeypress = (e) => {
    if (e.key === "Enter") {
      const activeEl = document.activeElement;
      if (activeEl?.id === "title-input" || activeEl?.classList.contains("editor-line")) {
        e.preventDefault();
        add("");

        const el = document.getElementsByClassName("editor-line");
        if (el && el.item(blocks.length - 1)) {
          (el.item(blocks.length - 1) as HTMLElement).focus();
        }
      }
    }
  };

  return (
    <div className="m-10 text-left bg-gray-100 rounded-lg py-3 px-5 cursor-default">
      <input
        id="title-input"
        ref={titleEl}
        value={title}
        className="text-3xl font-serif bg-gray-100 outline-none my-2 hover:bg-gray-300 focus:bg-gray-300 px-3 py-1 rounded-md"
        onChange={(e) => setTitle(e.target.value)}
      />
      <ul className="">
        {blocks.map((b, index) => (
          <li key={index} className="flex py-1">
            <div className="mr-2 text-gray-400">{index + 1}</div>
            <EditorLine className="editor-line w-full" value={b.data} onChange={(l) => edit(l, index)} />
          </li>
        ))}
        {blocks.length === 0 && (
          <li className="flex py-1">
            <div className="mr-2 text-gray-400">{blocks.length + 1}</div>
            <EditorLine disabled className="text-gray-500 italic" value="Press Enter to add a new line" onChange={() => {}} />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Editor;
