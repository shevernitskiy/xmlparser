import { Tokenizer } from "../src/tokenizer.ts";
import { Node, StateMachine } from "../src/state.ts";

export class Parser {
  private tokenizer: Tokenizer;
  private state: StateMachine;
  readonly writable: WritableStream<string>;
  readonly readable: ReadableStream<Node>;

  constructor() {
    this.tokenizer = new Tokenizer();
    this.writable = this.tokenizer.writable;
    this.state = new StateMachine();
    this.readable = this.state.readable;
    this.tokenizer.readable.pipeThrough(this.state);
  }
}
