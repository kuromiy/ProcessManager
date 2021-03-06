import { IFConnection, Table } from "typefiledb";
import { Action, getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { DBConnection } from "../../../database/DBConnection";
import { Process } from "../../../database/models/Process";
import { Project } from "../../../database/models/Project";
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

  @Mutation
  public DELETE_PROCESS(process: Process) {
    this._processes.forEach((vProcess: Process, index: number) => {
      if (vProcess._id === process._id) this._processes.splice(index, 1);
    });
  }

  @Mutation
  public DELETE_PROCESS_BY_PROJECT(project: Project) {
    this._processes.forEach((vProcess: Process, index: number) => {
      if (vProcess._project_id === project._id) this._processes.splice(index, 1);
    });
  }

  @Mutation
  public START_PROCESS(processid: number) {
    const proc: Process | undefined = this._processes.find((process: Process) => process._id === processid);
    if (proc) proc._status = true;
  }

  @Mutation
  public CLOSE_PROCESS(processid: number) {
    const proc: Process | undefined = this._processes.find((process: Process) => process._id === processid);
    if (proc) proc._status = false;
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

  @Action
  public async deleteProcess(process: Process) {
    const conn: IFConnection = await DBConnection.instance();
    const processTable: Table<Process> = conn.table(Process);
    await processTable.delete({_id: process._id});
    this.DELETE_PROCESS(process);
  }

  @Action
  public async deleteProcessByProject(project: Project) {
    const conn: IFConnection = await DBConnection.instance();
    const processTable: Table<Process> = conn.table(Process);
    await processTable.delete({_project_id: project._id});
    this.DELETE_PROCESS_BY_PROJECT(project);
  }

  @Action
  public async startProcess(processid: number) {
    console.log("vuex startprocess");
    this.START_PROCESS(processid);
  }

  @Action
  public async closeProcess(processid: number) {
    console.log("vuex closeprocess");
    this.CLOSE_PROCESS(processid);
  }
}

const processModule = getModule(ProcessModule);

export { processModule };
