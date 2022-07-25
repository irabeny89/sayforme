import signAndGetToken from "utils/api/rest/register/signAndGetToken";
// mock environment variables
jest.mock("config", () => ({ envVariables: { tokenSecret: "mock secret" } }));

describe("signAndGetToken", () => {
  it("signs an object payload and return a token", () => {
    const payload = {
      email: "mock@gmail.com",
      role: "mocker",
      username: "jester",
    };
    expect(typeof signAndGetToken(payload)).toBe("string");
  });
});
