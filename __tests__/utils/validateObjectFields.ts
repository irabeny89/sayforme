import validateObjectFields from "utils/validateObjectFields";

describe("ValidateObjectFields", () => {
  it("returns true when `fields` are in the `object`.", () => {
    const object = {test: true}
    expect(validateObjectFields(object, Object.keys(object))).toBeTruthy()
    expect(validateObjectFields(object, ["wrong"])).toBeFalsy()
  })
})