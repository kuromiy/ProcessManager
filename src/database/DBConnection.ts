import { remote } from "electron";
import path from "path";
import { IFConnection, TypeFileDB } from "typefiledb";

export class DBConnection {
  public static instance(): Promise<IFConnection> {
    return new Promise(async (resolve, reject) => {
      if (!this._conn) {
        console.log("TypeFileDB Init");
        const db: TypeFileDB = new TypeFileDB();
        // TODO パス指定を本番環境だとelectronのメソッドを使用すること
        // this._conn = await db.connection(path.join(__dirname, "db"));
        this._conn = await db.connection(path.join(remote.app.getPath("userData"), "db"));
      }
      resolve(this._conn);
    });
  }
  private static _conn: IFConnection;
  private constructor() {}
}
