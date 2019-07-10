import { AutoIncrementColumn, Column, Model } from "typefiledb";

@Model
export class Message {
  @AutoIncrementColumn public _id!: number;
  @Column public _context!: string;
  @Column public _process_id!: number;
}
