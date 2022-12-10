import { Parser } from "../src/parser.ts";

const input = Deno.readTextFileSync("./test/sample.xml");

const parser = new Parser();

(async function () {
  for await (const node of parser.readable) {
    console.log(node);
  }
})();

const writer = parser.writable.getWriter();

writer.write(input);

// or char by char
// for (const char of input.split("")) {
//   writer.write(char);
// }

writer.close();
