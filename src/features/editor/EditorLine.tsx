import ContentEditable from "./ContentEditable";

const EditorLine = ({ value, onChange }: { value: string; onChange: (line: string) => void }) => {
  return <ContentEditable html={value} onEdit={onChange} />;
};

export default EditorLine;
