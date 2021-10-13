import { Block } from "./Block";

export interface Note {
  id: string;
  title: string;
  content: Block[];
  createdAt: number;
  updatedAt: number;
}
