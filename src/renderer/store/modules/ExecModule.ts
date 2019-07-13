import { IFConnection, Table } from "typefiledb";
import { Action, getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { DBConnection } from "../../../database/DBConnection";
import { Exec } from "../../../database/models/Exec";
import { store } from "../index";

@Module({dynamic: true, store, name: "execmodule"})
class ExecModule extends VuexModule {
  private _execs: Array<Exec> = new Array<Exec>();

  public get execs(): Array<Exec> {
    return this._execs;
  }

  @Mutation
  public INIT_EXEC(execs: Array<Exec>) {
    this._execs = execs;
  }

  @Mutation
  public ADD_EXEC(exec: Exec) {
    this._execs.push(exec);
  }

  @Mutation
  public UPDATE_EXEC(exec: Exec) {
    const fExec: Exec | undefined = this._execs.find((findExec: Exec) => findExec._id === exec._id);
    if (fExec) {
      fExec._name = exec._name;
      fExec._path = exec._path;
    }
  }

  @Action
  public async initExec() {
    const conn: IFConnection = await DBConnection.instance();
    const execTable: Table<Exec> = conn.table(Exec);
    const execs: Array<Exec> = await execTable.find({});
    this.INIT_EXEC(execs);
  }

  @Action
  public async addExec(exec: Exec) {
    const conn: IFConnection = await DBConnection.instance();
    const execTable: Table<Exec> = conn.table(Exec);
    const insertExec: Exec = await execTable.insert(exec);
    this.ADD_EXEC(insertExec);
  }

  @Action
  public async updateExec(exec: Exec) {
    const conn: IFConnection = await DBConnection.instance();
    const execTable: Table<Exec> = conn.table(Exec);
    await execTable.update({_id: exec._id}, {_name: exec._name, _path: exec._path});
    this.UPDATE_EXEC(exec);

  }
}

const execModule = getModule(ExecModule);

export { execModule };
