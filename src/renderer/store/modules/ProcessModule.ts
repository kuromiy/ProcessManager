import { IFConnection, Table } from "typefiledb";
import { Action, getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { DBConnection } from "../../../database/DBConnection";
import { Process } from "../../../database/models/Process";
import { store } from "../index";

@Module({dynamic: true, store, name: "processmodule"})
class ProcessModule extends VuexModule {
  private _processes: Array<Process> = new Array<Process>();

  public get processes(): Array<Process> {
    return this._processes;
  }

  @Mutation
  public INIT_PROCESS(processes: Array<Process>) {
    this._processes = processes;
  }

  @Mutation
  public ADD_PROCESS(process: Process) {
    this._processes.push(process);
  }

  @Mutation
  public UPDATE_PROCESS(process: Process) {
    const fProcess: Process | undefined = this._processes.find((findProcess: Process) => findProcess._id === process._id);
    if (fProcess) {
      fProcess._name = process._name;
      fProcess._args = process._args;
      fProcess._exec_id = process._exec_id;
      fProcess._project_id = process._project_id;
    }
  }

  @Action
  public async initProcess() {
    const conn: IFConnection = await DBConnection.instance();
    const processTable: Table<Process> = conn.table(Process);
    const processes: Array<Process> = await processTable.find({});
    this.INIT_PROCESS(processes);
  }

  @Action
  public async addProcess(process: Process) {
    const conn: IFConnection = await DBConnection.instance();
    const processTable: Table<Process> = conn.table(Process);
    const insertedProcess: Process = await processTable.insert(process);
    this.ADD_PROCESS(insertedProcess);
  }

  @Action
  public async updateProcess(process: Process) {
    const conn: IFConnection = await DBConnection.instance();
    const processTable: Table<Process> = conn.table(Process);
    await processTable.update(
      {_id: process._id},
      {_name: process._name, _args: process._args, _exec_id: process._exec_id, _project_id: process._project_id},
    );
    this.UPDATE_PROCESS(process);
  }
}

const processModule = getModule(ProcessModule);

export { processModule };
