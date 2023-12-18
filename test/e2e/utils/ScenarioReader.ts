import { Reader } from '../../../src/utils/read/Reader';

export class ScenarioReader implements Reader {
  private readonly scenario: string[] = [];

  constructor(scenario: string[]) {
    this.scenario = scenario;
  }

  async question(query: string): Promise<string> {
    return Promise.resolve(this.scenario.pop());
  }
  close(): void {
    if (this.scenario.length !== 0) {
      throw new Error('아직 종료되지 않은 시나리오가 있습니다.');
    }
  }
}
