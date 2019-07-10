import { IFConnection, Table } from "typefiledb";
import { Action, getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { DBConnection } from "../../../database/DBConnection";
import { Message } from "../../../database/models/Message";
import { store } from "../index";

@Module({dynamic: true, store, name: "messagemodule"})
class MessageModule extends VuexModule {
  private _messages: Array<Message> = new Array<Message>();

  public get messages(): Array<Message> {
    return this._messages;
  }

  @Mutation
  public INIT_MESSAGE(messages: Array<Message>) {
    this._messages = messages;
  }

  @Mutation
  public ADD_MESSAGE(message: Message) {
    this._messages.push(message);
  }

  @Action
  public async initMessage() {
    const conn: IFConnection = await DBConnection.instance();
    const messageTable: Table<Message> = conn.table(Message);
    const messages: Array<Message> = await messageTable.find({});
    this.INIT_MESSAGE(messages);
  }

  @Action
  public async addMessage(message: Message) {
    const conn: IFConnection = await DBConnection.instance();
    const messageTable: Table<Message> = conn.table(Message);
    const insertMessage: Message = await messageTable.insert(message);
    this.ADD_MESSAGE(insertMessage);
  }
}

const messageModule = getModule(MessageModule);

export { messageModule };
