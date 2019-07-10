import { AutoIncrementColumn, Column, Model } from "typefiledb";

@Model
export class Project {
  @AutoIncrementColumn public _id!: number;
  @Column public _name!: string;
  @Column public _description!: string;
  @Column public _directoryPath!: string;
}
