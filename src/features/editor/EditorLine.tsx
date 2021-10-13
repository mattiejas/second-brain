import ContentEditable from "./ContentEditable";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import { editBlock } from "features/notes/notesSlice";
import React from "react";

interface Props {
  noteId: string;
  id: string;
  className?: string;
  disabled?: boolean;
}

export type EditorLineProps = Props;

const EditorLine: React.FC<EditorLineProps> = ({ noteId, id, className, disabled, ...props }) => {
  const block = useSelector((state: RootState) => state.notes.notes.find((n) => n.id === noteId)?.content.find((b) => b.id === id));
  const dispatch = useDispatch();

  const edit = (data: string) => {
    if (block) {
      dispatch(
        editBlock({
          ...block,
          data,
        })
      );
    }
  };

  return (
    <ContentEditable
      {...props}
      disabled={disabled}
      className={cn(className, "whitespace-nowrap overflow-hidden")}
      initialValue={block?.data ?? ""}
      onEdit={edit}
      tabIndex={0}
    />
  );
};

export default EditorLine;
