import ContentEditable from "./ContentEditable";
import cn from "classnames";

interface Props {
  value: string;
  onChange: (line: string) => void;
  className?: string;
  disabled?: boolean;
}

export type EditorLineProps = Props;

const EditorLine: React.FC<EditorLineProps> = ({ value, onChange, className, disabled }) => {
  return (
    <ContentEditable
      disabled={disabled}
      className={cn(className, "whitespace-nowrap overflow-hidden")}
      html={value}
      onEdit={onChange}
      tabIndex={0}
    />
  );
};

export default EditorLine;
