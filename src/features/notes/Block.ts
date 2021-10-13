import { BlockType } from "./BlockType";

export interface Block {
  id: string;
  noteId: string;
  type: BlockType;
  data: string;
}
