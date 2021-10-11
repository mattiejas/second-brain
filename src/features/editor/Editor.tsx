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
  const content = useSelector((state: RootState) => state.notes.notes.find((n) => n.id === state.notes.currentNoteId)?.content);
  const history = useHistory();
  const dispatch = useDispatch();

  // navigate away from editor if note is not found
  if (!note) {
    history.push("/");
  }

  const [title, setTitle] = useState(note?.title || "New Note");
  const titleEl = useRef<HTMLInputElement>(null);
  const debouncedTitle = useDebounce(title, 1000);

  const [blocks, setBlocks] = useState<Block[]>(content || []);
  const debouncedBlocks = useDebounce(blocks, 1000);

  // focus title when note new
  useEffect(() => {
    if (note?.content.length === 0 && titleEl.current) {
      titleEl.current.focus();
    }
  }, [note?.content.length]);

  const edit = (l: string, index: number) => {
    setBlocks((old) => {
      const newBlocks = [...old];
      newBlocks[index] = {
        type: BlockType.TEXT,
        data: l,
      };
      return newBlocks;
    });
  };

  const add = (l: string, index?: number) => {
    setBlocks((old) => {
      if (!index) index = blocks.length; // add to the end if index is not specified

      const newBlocks = [
        ...old.slice(0, index + 1),
        {
          type: BlockType.TEXT,
          data: l,
        },
        ...old.slice(index),
      ];
      return newBlocks;
    });
  };

  // update content
  useEffect(() => {
    if (
      note &&
      content &&
      (note.title !== title || content.length !== blocks.length || !content.every((x, i) => blocks[i]?.data === x.data))
    ) {
      dispatch(updateNote({ ...note, title: title, content: blocks }));
    }
  }, [debouncedBlocks, debouncedTitle]);

  window.onkeypress = (e) => {
    if (e.key === "Enter") {
      const activeEl = document.activeElement;
      if (activeEl?.id === "title-input" || activeEl?.classList.contains("editor-line")) {
        e.preventDefault();
        add("");

        // const el = document.getElementsByClassName("editor-line");
        // if (el && el.item(blocks.length - 1)) {
        //   (el.item(blocks.length - 1) as HTMLElement).focus();
        // }
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
