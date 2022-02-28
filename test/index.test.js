const readFile = require("../index");

const arrayResult = [[{ BEM: "http://getbem.com" }], "There are no links"];

describe("readFile::", () => {
  it("should be a function", () => {
    expect(typeof readFile).toBe("function");
  });

  it("should return files", async () => {
    const result = await readFile("./test/files/");

    expect(result).toEqual(arrayResult);
  });

  it("should return message 'There are no links'", async () => {
    const result = await readFile("./test/files/");
    const emptyMessage = result.find((r) => r === "There are no links");

    expect(emptyMessage).toBe("There are no links");
  });
});
