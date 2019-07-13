import { IFConnection, Table } from "typefiledb";
import { Action, getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { DBConnection } from "../../../database/DBConnection";
import { Project } from "../../../database/models/Project";
import { store } from "../index";

@Module({dynamic: true, store, name: "projectmodule"})
class ProjectModule extends VuexModule {
  private _projects: Array<Project> = new Array<Project>();

  public get projects(): Array<Project> {
    return this._projects;
  }

  @Mutation
  public INIT_PROJECT(projects: Array<Project>) {
    this._projects = projects;
  }

  @Mutation
  public ADD_PROJECT(project: Project) {
    this._projects.push(project);
  }

  @Mutation
  public UPDATE_PROJECT(project: Project) {
    const fProject: Project | undefined = this._projects.find((findProject: Project) => findProject._id === project._id);
    if (fProject) {
      fProject._name = project._name;
      fProject._description = project._description;
      fProject._directoryPath = project._directoryPath;
    }
  }

  @Action
  public async initProject() {
    console.log("projectModule init");
    const conn: IFConnection = await DBConnection.instance();
    const projectTable: Table<Project> = conn.table(Project);
    const projects: Array<Project> = await projectTable.find({});
    this.INIT_PROJECT(projects);
  }

  @Action
  public async addProject(project: Project) {
    console.log("projectModule addProject");
    const conn: IFConnection = await DBConnection.instance();
    const projectTable: Table<Project> = conn.table(Project);
    const insertedProject: Project = await projectTable.insert(project);
    this.ADD_PROJECT(insertedProject);
  }

  @Action
  public async updateProject(project: Project) {
    const conn: IFConnection = await DBConnection.instance();
    const projectTable: Table<Project> = conn.table(Project);
    await projectTable.update({_id: project._id}, {_name: project._name, _description: project._description, _directoryPath: project._directoryPath});
    this.UPDATE_PROJECT(project);
  }
}

const projectModule = getModule(ProjectModule);

export { projectModule };
