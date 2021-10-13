import React, { useEffect, useMemo, useRef, DetailedHTMLProps } from "react";
import cn from "classnames";

interface Props {
  html: string;
  onEdit: (html: string) => void;
  disabled?: boolean;
}

export type ContentEditableProps = DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & Props;

const ContentEditable: React.FC<ContentEditableProps> = ({ html, onEdit, className, disabled, ...props }) => {
  const target = useRef<HTMLDivElement>(null);
  const text = useMemo(() => html, []);

  const updateCaretPosition = () => {
    if (target && target.current && document.activeElement === target.current) {
      const selection = window.getSelection();
      console.log(selection?.getRangeAt(0));
    }
  };

  const emitChange = () => {
    var text = target?.current?.innerHTML || "";

    updateCaretPosition();

    if (onEdit) {
      onEdit(text);
    }
  };

  return (
    <div
      {...props}
      className={cn("outline-none cursor-text", className)}
      ref={target}
      onInput={emitChange}
      onBlur={emitChange}
      contentEditable={!disabled}
      dangerouslySetInnerHTML={{ __html: text }}
    ></div>
  );
};

export default ContentEditable;
