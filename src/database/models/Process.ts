import { AutoIncrementColumn, Column, Model } from "typefiledb";

@Model
export class Process {
  @AutoIncrementColumn public _id!: number;
  @Column public _name!: string;
  @Column public _exec_id!: number;
  @Column public _args!: string;
  @Column public _project_id!: number;
}
