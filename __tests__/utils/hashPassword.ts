import hashPassword from "utils/hashPassword";

describe("Hashpassword", () => {
  it("hashes password with salt.", () => {
    const mock = "mock",
      mockSalt = "salt",
      { hashedPassword, salt } = hashPassword(mock, mockSalt);

    // cipher text should be longer than the plain text
    expect(hashedPassword.length).not.toBe(mock.length);
    expect(salt).toBe(mockSalt);
  });
});
