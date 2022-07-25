import verifyPassword from "utils/api/rest/login/verifyPassword";

describe("verifyPassword function", () => {
  it("verifies and return true for valid inputs.", async () => {
    expect(await verifyPassword("test", "test")).toBeTruthy()
    expect(await verifyPassword("test", "inva")).toBeFalsy()
  })
})