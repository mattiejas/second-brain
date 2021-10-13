import React, { ReactHTML, useEffect, useRef, useState } from "react";
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
import { createNoSubstitutionTemplateLiteral } from "typescript";

const Editor = () => {
  const note = useSelector((state: RootState) => state.notes.notes.find((n) => n.id === state.notes.currentNoteId));
  const content = useSelector((state: RootState) => state.notes.notes.find((n) => n.id === state.notes.currentNoteId)?.content);
  const history = useHistory();
  const dispatch = useDispatch();

  const [activeElement, setActiveElement] = useState<HTMLDivElement | null>(null);

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

  const onEnterPress = (e: KeyboardEvent) => {
    let addedElementIndex: number | null = null;
    let data = "";

    e.preventDefault();
    e.stopPropagation();

    // listen to whole page when no line has been added yet
    if (!content || content.length === 0) {
      add("");
      addedElementIndex = 0;
    } else {
      const activeEl = document.activeElement;
      if (activeEl?.id === "title-input" || activeEl?.classList.contains("editor-line")) {
        let index = content?.length ?? -1;

        // calculate index for new block
        if (activeEl?.id === "title-input") index = -1;
        else {
          const line = activeEl as HTMLDivElement;
          index = line.dataset.lineno ? Number.parseInt(line.dataset.lineno) : index;

          if (!e.shiftKey) {
            // remove selected characters
            let currentLine = content[index];
            const selection = window.getSelection();
            const range = selection?.getRangeAt(0);
            data = content[index].data.slice(range?.endOffset); // move characters after cursor down a line
            dispatch(editBlock({ ...content[index], data: currentLine.data.slice(0, range?.startOffset) }));
          }
        }

        // add new block
        add(data, index + 1);
        addedElementIndex = index + 1;
      }
    }

    // focus new block
    if (addedElementIndex !== null) focusLine(addedElementIndex);
  };

  const focusLine = (index: number) => {
    setTimeout(() => {
      const el = document.getElementsByClassName("editor-line");
      if (content && el && el.item(index)) {
        const item = el.item(index) as HTMLElement;
        item.focus();

        if (item.firstChild) {
          console.log(item.firstChild);
          const selection = window.getSelection();
          selection?.removeAllRanges();

          const range = document.createRange();
          range.setStart(item.firstChild, (item.firstChild as Text).data.length);
          selection?.addRange(range);
        }
      }
    }, 0);
  };

  window.onkeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      onEnterPress(e);
    } else if (e.key === "Backspace") {
      console.log("backspace");
      const activeEl = document.activeElement;
      if (activeEl?.classList.contains("editor-line")) {
        const line = activeEl as HTMLDivElement;
        const index = line.dataset.lineno ? Number.parseInt(line.dataset.lineno) : -1;

        // prevent deletion when the user has a selection or the cursor is not at the start of the line
        const selection = window.getSelection();
        const range = selection?.getRangeAt(0);
        const hasEmptySelection = range?.startOffset === range?.endOffset;
        const isAtTheBeginningOfTheLine = range?.startOffset === 0;

        if (note && content && index < content?.length && index > -1 && hasEmptySelection && isAtTheBeginningOfTheLine) {
          if (content[index].data === "") {
            dispatch(removeBlock({ id: content[index].id, noteId: note.id }));

            // focus new block
            focusLine(index - 1);
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
        {note &&
          content &&
          content.map((b, index) => (
            <li key={index} className="flex py-1">
              <div className="mr-2 text-gray-400">{index + 1}</div>
              <EditorLine noteId={note?.id} id={b.id} className="editor-line w-full" data-lineno={index} />
            </li>
          ))}
        {content && content.length === 0 && (
          <li className="flex py-1">
            <span className="pl-3 text-gray-500 italic">Press enter to add a new line</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Editor;
