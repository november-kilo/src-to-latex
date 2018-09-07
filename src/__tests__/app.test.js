import refractor from 'refractor/core';
import c from 'refractor/lang/c';
import {parseJsonToLatexCallback} from "../app";

describe('parse json to latex', () => {
  let json;

  beforeEach(() => {
    const sourceCode = '#include <stdio.h>\n' +
      '#include <string.h>\n' +
      '\n' +
      'int main(void) {\n' +
      '    int space;\n' +
      '    char *str;\n' +
      '\n' +
      '    space = 40;\n' +
      '    str = "hello, world!";\n' +
      '\n' +
      '    printf("%*s\\n", (int) (space / 2 + strlen(str) / 2), str);\n' +
      '\n' +
      '    return 0;\n' +
      '}';
    json = refractor.highlight(sourceCode, 'c');
  });

  it('should parse', () => {
    const actual = parseJsonToLatexCallback(json);
    expect(actual).toMatchSnapshot();
  });
});
