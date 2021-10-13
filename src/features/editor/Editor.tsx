import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import EditorLine from "./EditorLine";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import { useHistory } from "react-router-dom";
import { updateNote, addBlock, editBlock, removeBlock } from "features/notes/notesSlice";
import { Note } from "features/notes/Note";
import useDebounce from "./../../app/utils/debounce";
import { Block } from "features/notes/Block";
import { BlockType } from "features/notes/BlockType";

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

  // focus title when note new
  useEffect(() => {
    if (note?.content.length === 0 && titleEl.current) {
      titleEl.current.focus();
    }
  }, [note?.content.length]);

  const edit = (data: string, b: Block) => {
    if (note) {
      dispatch(
        editBlock({
          ...b,
          data,
        })
      );
    }
  };

  const add = (l: string, index?: number) => {
    if (note) {
      dispatch(addBlock({ type: BlockType.TEXT, data: l, noteId: note.id, index }));
    }
  };

  // update title
  useEffect(() => {
    if (note && note.title !== title) {
      dispatch(updateNote({ ...note, title: title }));
    }
  }, [title]);

  window.onkeypress = (e) => {
    if (e.key === "Enter") {
      const activeEl = document.activeElement;
      if (activeEl?.id === "title-input" || activeEl?.classList.contains("editor-line")) {
        e.preventDefault();
        let index = content?.length ?? -1;

        // calculate index for new block
        if (activeEl?.id === "title-input") {
          index = -1;
        } else {
          const line = activeEl as HTMLDivElement;
          index = line.dataset.lineno ? Number.parseInt(line.dataset.lineno) : index;
        }

        // add new block
        add("", index === -1 ? 0 : index);
        console.log(index);

        // focus new block
        setTimeout(() => {
          const el = document.getElementsByClassName("editor-line");
          console.log(index, el, el.item(index));
          if (el && el.item(index + 1)) {
            console.log("hello");
            // content is not updated yet
            (el.item(index + 1) as HTMLElement).focus();
          }
        }, 0);
      }
    }
  };

  window.onkeyup = (e) => {
    if (e.key === "Backspace") {
      console.log("backspace");
      const activeEl = document.activeElement;
      if (activeEl?.classList.contains("editor-line")) {
        const line = activeEl as HTMLDivElement;
        const index = line.dataset.lineno ? Number.parseInt(line.dataset.lineno) : -1;

        if (note && content && index < content?.length && index > -1) {
          if (content[index].data === "") {
            dispatch(removeBlock({ id: content[index].id, noteId: note.id }));

            // focus new block
            setTimeout(() => {
              if (content) {
                const el = document.getElementsByClassName("editor-line");
                if (el && el.item(index - 1)) {
                  // content is not updated yet
                  (el.item(index - 1) as HTMLElement).focus();
                }
              }
            }, 0);
          }
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
        {(content ?? []).map((b, index) => (
          <li key={index} className="flex py-1">
            <div className="mr-2 text-gray-400">{index + 1}</div>
            <EditorLine className="editor-line w-full" data-lineno={index} value={b.data} onChange={(l) => edit(l, b)} />
          </li>
        ))}
        {content && content.length === 0 && (
          <li className="flex py-1">
            <div className="mr-2 text-gray-400">{content.length + 1}</div>
            <EditorLine disabled className="text-gray-500 italic" value="Press Enter to add a new line" onChange={() => {}} />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Editor;
