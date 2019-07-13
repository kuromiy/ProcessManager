import { Action, getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { store } from "../index";

@Module({dynamic: true, store, name: "modalmodule"})
class ModaulModule extends VuexModule {
  private _projectModal: boolean = false;
  private _projectModalEdit: boolean = false;
  private _processModal: boolean = false;
  private _execModal: boolean = false;
  private _execModalEdit: boolean = false;

  public get projectModal() {
    return this._projectModal;
  }

  public get projectModalEdit() {
    return this._projectModalEdit;
  }

  public get processModal() {
    return this._processModal;
  }

  public get execModal() {
    return this._execModal;
  }

  public get execModalEdit() {
    return this._execModalEdit;
  }

  @Mutation
  public OPEN_PROJECT_MODAL() {
    this._projectModal = true;
  }

  @Mutation
  public CLOSE_PROJECT_MODAL() {
    this._projectModal = false;
  }

  @Mutation
  public OPEN_PROCESS_MODAL() {
    this._processModal = true;
  }

  @Mutation
  public CLOSE_PROCESS_MODAL() {
    this._processModal = false;
  }

  @Mutation
  public OPEN_EXEC_MODAL() {
    this._execModal = true;
  }

  @Mutation
  public CLOSE_EXEC_MODAL() {
    this._execModal = false;
  }

  @Mutation
  public OPEN_EXEC_MODAL_EDIT() {
    this._execModalEdit = true;
  }

  @Mutation
  public CLOSE_EXEC_MODAL_EDIT() {
    this._execModalEdit = false;
  }

  @Mutation
  public OPEN_PROJECT_MODAL_EDIT() {
    this._projectModalEdit = true;
  }

  @Mutation
  public CLOSE_PROJECT_MODAL_EDIT() {
    this._projectModalEdit = false;
  }

  @Action
  public async openProjectModal() {
    this.OPEN_PROJECT_MODAL();
  }

  @Action
  public async closeProjectModal() {
    this.CLOSE_PROJECT_MODAL();
  }

  @Action
  public async openProcessModal() {
    this.OPEN_PROCESS_MODAL();
  }

  @Action
  public async closeProcessModal() {
    this.CLOSE_PROCESS_MODAL();
  }

  @Action
  public async openExecModal() {
    this.OPEN_EXEC_MODAL();
  }

  @Action
  public async closeExecModal() {
    this.CLOSE_EXEC_MODAL();
  }

  @Action
  public async openExecModalEdit() {
    this.OPEN_EXEC_MODAL_EDIT();
  }

  @Action
  public async closeExecModalEdit() {
    this.CLOSE_EXEC_MODAL_EDIT();
  }

  @Action
  public async openProjectModalEdit() {
    this.OPEN_PROJECT_MODAL_EDIT();
  }

  @Action
  public async closeProjectModalEdit() {
    this.CLOSE_PROJECT_MODAL_EDIT();
  }
}

const modalModule = getModule(ModaulModule);

export { modalModule };
