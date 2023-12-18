import { Writer } from '../../../src/utils/write/Writer';

export class ScenarioWriter implements Writer {
  private readonly _messages = [];
  write(message: string): void {
    this._messages.push(message);
  }

  get messages(): any[] {
    return this._messages;
  }

  get pop(): string {
    return this._messages.pop();
  }
}
