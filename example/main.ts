import { Tokenizer } from "../src/tokenizer.ts";
import { Node, StateMachine } from "../src/state.ts";

const input = Deno.readTextFileSync("./test/sample.xml");

const tokenizer = new Tokenizer();
const state = new StateMachine();
tokenizer.readable.pipeThrough(state);

const writer = tokenizer.writable.getWriter();

writer.write(input);

// or char by char
// for (const char of input.split("")) {
//   writer.write(char);
// }

writer.close();

const out: Node[] = [];

for await (const node of state.readable) {
  console.log(node);
}


