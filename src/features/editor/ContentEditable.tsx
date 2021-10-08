import React, { useEffect, useMemo, useRef, DetailedHTMLProps } from "react";

interface Props {
  html: string;
  onEdit: (html: string) => void;
}

export type ContentEditableProps = DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & Props;

const ContentEditable: React.FC<ContentEditableProps> = ({ html, onEdit, className, ...props }) => {
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
      className="outline-none cursor-text"
      ref={target}
      onInput={emitChange}
      onBlur={emitChange}
      contentEditable
      dangerouslySetInnerHTML={{ __html: text }}
    ></div>
  );
};

export default React.memo(ContentEditable, (prevProps, nextProps) => prevProps.html === nextProps.html);
