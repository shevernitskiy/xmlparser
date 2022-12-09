export type Token = {
  name: TokenType;
  pattern: RegExp;
  value?: string;
};

type TokenType =
  | "SPACE"
  | "OPEN_BRACKET"
  | "CLOSE_BRACKET"
  | "SLASH"
  | "ATTR"
  | "VALUE";

const token_list: readonly Token[] = [
  { name: "SPACE", pattern: /\s/ },
  { name: "OPEN_BRACKET", pattern: /</ },
  { name: "CLOSE_BRACKET", pattern: />/ },
  { name: "SLASH", pattern: /\// },
  { name: "ATTR", pattern: /[a-zA-Z-_]+=(".+"|'.+')/ },
];

export class Tokenizer extends TransformStream<string, Token> {
  private tokens: readonly Token[];
  private state = "";

  constructor() {
    super({
      transform: (chunk, controller) => {
        if (typeof chunk !== "string") {
          throw new Error("Invalid type, should be string");
        }
        const seq = chunk.split("");
        for (const char of seq) {
          this.state += char;
          const result = this.test(this.state);
          if (result !== null) {
            const value = this.value(this.state, result.pattern);
            if (value !== null) {
              controller.enqueue({ name: "VALUE", pattern: /.*/, value: value });
            }
            controller.enqueue(result);
            this.state = "";
          }
        }
      },
    });

    this.tokens = token_list;
  }

  private test(chunk: string): Token | null {
    for (const token of this.tokens) {
      if (token.pattern.test(chunk)) {
        return token.name === "ATTR" ? { name: "ATTR", pattern: /[a-zA-Z-_]+=(".+"|'.+')/, value: chunk } : token;
      }
    }
    return null;
  }

  private value(chunk: string, strip: RegExp): string | null {
    const out = chunk.replace(strip, "");
    return out === "" ? null : out;
  }
}
