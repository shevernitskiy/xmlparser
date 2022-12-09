import { assertEquals } from "std/testing/asserts.ts";

import { Tokenizer } from "../src/tokenizer.ts";
import { Node, StateMachine } from "../src/state.ts";

Deno.test("basic parse test", async () => {
  const input = Deno.readTextFileSync("./test/sample.xml");

  const tokenizer = new Tokenizer();
  const state = new StateMachine();
  tokenizer.readable.pipeThrough(state);

  const writer = tokenizer.writable.getWriter();

  writer.write(input);
  writer.close();

  const out: Node[] = [];

  for await (const node of state.readable) {
    out.push(node);
  }

  assertEquals(out.length, 44);
  assertEquals(out[1].id, [1, 2]);
  assertEquals(out[3].attr, [{ name: "count", value: '"10"' }, { name: "year", value: '"2003"' }]);
  assertEquals(out[43].tag, "title");
  assertEquals(out[43].value, '"40"');
});
