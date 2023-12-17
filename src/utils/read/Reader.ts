export interface Reader {
  question(query: string): Promise<string>;
  close(): void;
}
