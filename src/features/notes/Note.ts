export interface Note {
  id: string;
  title: string;
  content: Block[];
  createdAt: number;
  updatedAt: number;
}

export interface Block {
  type: BlockType;
  data: string;
}

export enum BlockType {
  TEXT,
}
