import { Reader } from '../../../src/utils/read/Reader';

export class ScenarioReader implements Reader {
  private readonly scenarios: string[] = [];

  constructor(scenario: string[]) {
    this.scenarios = scenario;
  }

  async question(query: string): Promise<string> {
    const scenario = this.scenarios.shift();
    console.log(`${query} ${scenario}`);
    return Promise.resolve(scenario);
  }
  close(): void {
    if (this.scenarios.length !== 0) {
      throw new Error('아직 종료되지 않은 시나리오가 있습니다.');
    }
  }
}
