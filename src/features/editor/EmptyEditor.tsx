import illustration from "app/assets/No_list_found.png";
import { useDispatch } from "react-redux";
import { addNote } from "features/notes/notesSlice";

const EmptyEditor = () => {
  const dispatch = useDispatch();

  return (
    <div className="m-10 bg-gray-100 rounded-lg p-3 cursor-default text-center">
      <img src={illustration} className="max-w-md mx-auto" alt="no note selected" />
      <span className="block mb-2">Select a note on the left handside...</span>
      <a href="#addnote" className="block italic mb-10 text-purple-500 underline" onClick={() => dispatch(addNote())}>
        or create a new one
      </a>
    </div>
  );
};

export default EmptyEditor;
