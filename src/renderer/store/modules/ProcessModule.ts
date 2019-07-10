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
}

const processModule = getModule(ProcessModule);

export { processModule };
