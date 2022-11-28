import {
  Client,
  User,
  ChatInputCommandInteraction,
} from "discord.js";
import { ParsedCommand } from './testUtils';

export default class MockDiscord {
  private client!: Client;
  private user!: User;
  public interaction!: ChatInputCommandInteraction;

  constructor(command: ParsedCommand) {
    this.mockClient();
    this.mockUser();
    this.mockInteracion(command)
  }

  public getInteraction(): ChatInputCommandInteraction {
    return this.interaction;
  }

  private mockClient(): void {
    this.client = new Client({ intents: [] });
    this.client.login = jest.fn(() => Promise.resolve("LOGIN_TOKEN"));
  }

  private mockUser(): void {
    this.user = Reflect.construct(User, [
      this.client, {
        id: "user-id",
        username: "USERNAME",
        discriminator: "user#0000",
        avatar: "user avatar url",
        bot: false,
      }
    ]
    )
  }

  private mockInteracion(command: ParsedCommand): void {
    this.interaction = Reflect.construct(ChatInputCommandInteraction, [
      this.client,
      {
        data: command,
        id: BigInt(1),
        user: this.user,
      }
    ]
    )
    this.interaction.reply = jest.fn()
    this.interaction.deferReply = jest.fn()
    this.interaction.editReply = jest.fn()
    this.interaction.isCommand = jest.fn(() => true)
  }
}
