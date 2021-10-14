import { BlockType } from "./BlockType";

export interface AddBlockToNote {
  noteId: string;
  index?: number;
  type: BlockType;
  data: string;
}
