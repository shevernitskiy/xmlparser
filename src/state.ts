import { Token } from "./tokenizer.ts";

type Attr = {
  name: string;
  value?: string;
};

export type Node = {
  id: number[];
  parent: number[];
  tag: string;
  value?: string;
  attr?: Attr[];
  children?: Node[];
};

type State = "unknown" | "root" | "tag" | "close_tag" | "content";

export class StateMachine extends TransformStream<Token, Node> {
  private id = 0;
  private current = {
    id: [],
    parent: [],
    tag: "ROOT",
    value: undefined as string | undefined,
    attr: [] as Attr[],
  } as Node;
  private state: State = "root";

  constructor() {
    super({
      transform: (chunk, controller) => {
        const node = this.rules(chunk);
        if (this.isNode(node)) {
          controller.enqueue(node);
        }
      },
    });
  }

  isNode(value: unknown): value is Node {
    return (value as Node)?.tag !== undefined && typeof (value as Node)?.tag === "string";
  }

  private push(): Node {
    this.current.parent = [...this.current.id];

    const node = {
      id: this.current.id,
      parent: this.current.parent,
      tag: this.current.tag,
      value: this.current.value,
      attr: this.current.attr!.length > 0 ? this.current.attr : undefined,
    };

    this.current.tag = "";
    this.current.value = undefined;
    this.current.attr = [];

    return node;
  }

  private rules(chunk: Token): Node | void {
    switch (this.state) {
      case "root": {
        if (chunk.name === "OPEN_BRACKET") {
          this.state = "tag";
        }
        break;
      }
      case "tag": {
        if (chunk.name === "VALUE") {
          this.current.tag = chunk.value!;
        }
        if (chunk.name === "ATTR") {
          const temp = chunk.value!.split("=");
          this.current.attr!.push({ name: temp[0], value: temp[1] });
        }
        if (chunk.name === "CLOSE_BRACKET") {
          this.state = "content";
        }
        if (chunk.name === "SLASH") {
          this.state = "close_tag";
        }
        break;
      }
      case "close_tag": {
        if (chunk.name === "CLOSE_BRACKET") {
          if (this.current.tag !== "") {
            const node = this.push();
            this.id++;
            this.current.id.push(this.id);
            this.current.id = [...this.current.id];
            return node;
          } else {
            this.current.id.pop();
          }
          this.state = "unknown";
        }
        break;
      }
      case "content": {
        if (chunk.name === "OPEN_BRACKET") {
          const node = this.push();
          this.id++;
          this.current.id.push(this.id);
          this.current.id = [...this.current.id];
          this.state = "tag";
          return node;
        }
        if (chunk.name === "VALUE") {
          this.current.value = chunk.value;
        }
        break;
      }
      case "unknown": {
        if (chunk.name === "OPEN_BRACKET") {
          this.state = "tag";
        }
        break;
      }
    }
  }
}
