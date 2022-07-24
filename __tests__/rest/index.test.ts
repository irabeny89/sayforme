import handlers from "utils/rest";

describe("REST handlers object", () => {
  it("contains `register` and `login` handlers", () => {
    expect(typeof handlers.login).toBe("function");
    expect(typeof handlers.register).toBe("function");
  });
});
