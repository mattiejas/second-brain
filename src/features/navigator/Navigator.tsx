import Button from "app/components/Button";
import { RootState } from "app/store";
import { addNote, selectNote } from "features/notes/notesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import cn from "classnames";
import { useHistory } from "react-router-dom";

const Navigator: React.FC<{}> = () => {
  const history = useHistory();
  const notes = useSelector((state: RootState) => state.notes.notes);
  const selectedNoteId = useSelector((state: RootState) => state.notes.currentNoteId);
  const dispatch = useDispatch();

  const onNoteClick = (id: string) => {
    dispatch(selectNote(id));
  };

  useEffect(() => {
    if (selectedNoteId) {
      history.push(`/notes/${selectedNoteId}`);
    }
  }, [selectedNoteId, history]);

  return (
    <div className="bg-gray-100 rounded-lg ml-10 mt-10 p-4 px-4 w-80 h-full cursor-default">
      <h2 className="font-serif text-3xl mb-3 px-1">Notes</h2>
      <ul className="space-y-2 mb-4">
        {notes.map((note) => (
          <li
            key={note.id}
            className={cn("w-full hover:bg-gray-200 rounded-md text-sm py-1 px-3 cursor-pointer", {
              "bg-gray-300 hover:bg-gray-300": note.id === selectedNoteId,
            })}
            onClick={() => onNoteClick(note.id)}
          >
            {note.title || "New Note"}
          </li>
        ))}
      </ul>
      <Button text="Add Note" onClick={() => dispatch(addNote())} />
    </div>
  );
};

export default Navigator;
