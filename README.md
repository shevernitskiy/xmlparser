# XML streaming parser

Basic streaming xml parser based on transform streams. It recieves `ReadableStream<string>` and provide `WritableStream<Node>`.

### Transform sequence

```shell
string -> Token -> Node
```

`id` and `parent id` of nodes is `number[]`. They contains encoded position in tree structure and can be used to recreate tree from output
node stream. Kinda suffix tree i guess.

### Example

```ts
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
```

<details>
  <summary>Output</summary>

```js
{ id: [ 1 ], parent: [], tag: "metadata", value: undefined, attr: undefined }
{
  id: [ 1, 2 ],
  parent: [ 1 ],
  tag: "oneline",
  value: undefined,
  attr: [ { name: "hello", value: '"world"' } ]
}
{ id: [ 1, 3 ], parent: [ 1 ], tag: "title", value: "War", attr: undefined }
{
  id: [ 1, 4 ],
  parent: [ 1 ],
  tag: "track-list",
  value: undefined,
  attr: [ { name: "count", value: '"10"' }, { name: "year", value: '"2003"' } ]
}
{ id: [ 1, 4, 5 ], parent: [ 1, 4 ], tag: "track", value: undefined, attr: undefined }
{ id: [ 1, 4, 5, 6 ], parent: [ 1, 4, 5 ], tag: "number", value: "1", attr: undefined }
{
  id: [ 1, 4, 5, 7 ],
  parent: [ 1, 4, 5 ],
  tag: "length",
  value: "280173",
  attr: undefined
}
{
  id: [ 1, 4, 5, 8 ],
  parent: [ 1, 4, 5 ],
  tag: "title",
  value: "Sunday",
  attr: undefined
}
{ id: [ 1, 4, 9 ], parent: [ 1, 4 ], tag: "track", value: undefined, attr: undefined }
{
  id: [ 1, 4, 9, 10 ],
  parent: [ 1, 4, 9 ],
  tag: "number",
  value: "2",
  attr: undefined
}
{
  id: [ 1, 4, 9, 11 ],
  parent: [ 1, 4, 9 ],
  tag: "title",
  value: "Seconds",
  attr: undefined
}
{
  id: [ 1, 4, 9, 12 ],
  parent: [ 1, 4, 9 ],
  tag: "length",
  value: "190533",
  attr: undefined
}
{ id: [ 1, 4, 13 ], parent: [ 1, 4 ], tag: "track", value: undefined, attr: undefined }
{
  id: [ 1, 4, 13, 14 ],
  parent: [ 1, 4, 13 ],
  tag: "number",
  value: "3",
  attr: undefined
}
{
  id: [ 1, 4, 13, 15 ],
  parent: [ 1, 4, 13 ],
  tag: "length",
  value: "335693",
  attr: undefined
}
{
  id: [ 1, 4, 13, 16 ],
  parent: [ 1, 4, 13 ],
  tag: "title",
  value: "Day",
  attr: undefined
}
{ id: [ 1, 4, 17 ], parent: [ 1, 4 ], tag: "track", value: undefined, attr: undefined }
{
  id: [ 1, 4, 17, 18 ],
  parent: [ 1, 4, 17 ],
  tag: "number",
  value: "4",
  attr: undefined
}
{
  id: [ 1, 4, 17, 19 ],
  parent: [ 1, 4, 17 ],
  tag: "length",
  value: "286933",
  attr: undefined
}
{
  id: [ 1, 4, 17, 20 ],
  parent: [ 1, 4, 17 ],
  tag: "title",
  value: "Song...",
  attr: undefined
}
{ id: [ 1, 4, 21 ], parent: [ 1, 4 ], tag: "track", value: undefined, attr: undefined }
{
  id: [ 1, 4, 21, 22 ],
  parent: [ 1, 4, 21 ],
  tag: "number",
  value: "5",
  attr: undefined
}
{
  id: [ 1, 4, 21, 23 ],
  parent: [ 1, 4, 21 ],
  tag: "length",
  value: "254973",
  attr: undefined
}
{
  id: [ 1, 4, 21, 24 ],
  parent: [ 1, 4, 21 ],
  tag: "title",
  value: "Man",
  attr: undefined
}
{ id: [ 1, 4, 25 ], parent: [ 1, 4 ], tag: "track", value: undefined, attr: undefined }
{
  id: [ 1, 4, 25, 26 ],
  parent: [ 1, 4, 25 ],
  tag: "number",
  value: "6",
  attr: undefined
}
{
  id: [ 1, 4, 25, 27 ],
  parent: [ 1, 4, 25 ],
  tag: "length",
  value: "220866",
  attr: undefined
}
{
  id: [ 1, 4, 25, 28 ],
  parent: [ 1, 4, 25 ],
  tag: "title",
  value: "Refugee",
  attr: undefined
}
{ id: [ 1, 4, 29 ], parent: [ 1, 4 ], tag: "track", value: undefined, attr: undefined }
{
  id: [ 1, 4, 29, 30 ],
  parent: [ 1, 4, 29 ],
  tag: "number",
  value: "7",
  attr: undefined
}
{
  id: [ 1, 4, 29, 31 ],
  parent: [ 1, 4, 29 ],
  tag: "length",
  value: "243093",
  attr: undefined
}
{
  id: [ 1, 4, 29, 32 ],
  parent: [ 1, 4, 29 ],
  tag: "title",
  value: "One",
  attr: undefined
}
{ id: [ 1, 4, 33 ], parent: [ 1, 4 ], tag: "track", value: undefined, attr: undefined }
{
  id: [ 1, 4, 33, 34 ],
  parent: [ 1, 4, 33 ],
  tag: "number",
  value: "8",
  attr: undefined
}
{
  id: [ 1, 4, 33, 35 ],
  parent: [ 1, 4, 33 ],
  tag: "length",
  value: "226400",
  attr: undefined
}
{
  id: [ 1, 4, 33, 36 ],
  parent: [ 1, 4, 33 ],
  tag: "title",
  value: "Light",
  attr: undefined
}
{ id: [ 1, 4, 37 ], parent: [ 1, 4 ], tag: "track", value: undefined, attr: undefined }
{
  id: [ 1, 4, 37, 38 ],
  parent: [ 1, 4, 37 ],
  tag: "number",
  value: "9",
  attr: undefined
}
{
  id: [ 1, 4, 37, 39 ],
  parent: [ 1, 4, 37 ],
  tag: "length",
  value: "334440",
  attr: undefined
}
{
  id: [ 1, 4, 37, 40 ],
  parent: [ 1, 4, 37 ],
  tag: "title",
  value: "Surrender",
  attr: undefined
}
{ id: [ 1, 4, 41 ], parent: [ 1, 4 ], tag: "track", value: undefined, attr: undefined }
{
  id: [ 1, 4, 41, 42 ],
  parent: [ 1, 4, 41 ],
  tag: "number",
  value: "10",
  attr: undefined
}
{
  id: [ 1, 4, 41, 43 ],
  parent: [ 1, 4, 41 ],
  tag: "length",
  value: "155893",
  attr: undefined
}
{
  id: [ 1, 4, 41, 44 ],
  parent: [ 1, 4, 41 ],
  tag: "title",
  value: '"40"',
  attr: undefined
}
```

</details>
