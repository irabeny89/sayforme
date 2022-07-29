import signAndGetToken from "utils/api/rest/signAndGetToken";
// mock environment variables
jest.mock("config", () => ({ envVariables: { tokenSecret: "mock secret" } }));

describe("signAndGetToken", () => {
  it("signs an object payload and return a token", () => {
    const payload: PayloadT = {
      email: "mock@gmail.com",
      role: "CUSTOMER",
      username: "jester",
      userId: "12340595nnxxxxzzaaa2",
    };
    expect(typeof signAndGetToken(payload)).toBe("string");
  });
});
