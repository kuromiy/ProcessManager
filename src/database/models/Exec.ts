import { AutoIncrementColumn, Column, Model } from "typefiledb";

@Model
export class Exec {
  @AutoIncrementColumn public _id!: number;
  @Column public _name!: string;
  @Column public _path!: string;
}
