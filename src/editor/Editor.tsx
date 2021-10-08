import React, { useState } from "react";
import EditorLine from "./EditorLine";

const Editor = () => {
  const [lines, setLines] = useState<string[]>(["This is a text line.", "This is another text line.", "A third line."]);

  const edit = (line: string, index: number) => {
    const newLines = [...lines];
    newLines[index] = line;
    setLines(newLines);
  };

  return (
    <ul className="m-10 text-left bg-gray-100 rounded-lg py-3 cursor-default">
      {lines.map((line, index) => (
        <li key={index} className="flex py-1">
          <div className="ml-5 mr-2 text-gray-400">{index + 1}</div>
          <EditorLine value={line} onChange={(l) => edit(l, index)} />
        </li>
      ))}
    </ul>
  );
};

export default Editor;
