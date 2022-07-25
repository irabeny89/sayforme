import getPageName from "utils/getPageName";

describe("getPageName", () => {
  it("returns `HOME` for route `/`", () => {
    expect(getPageName("/")).toBe("HOME")
  })
  it("returns uppercase name for pathname after `/`", () => {
    expect(getPageName("/about")).toBe("ABOUT")
    expect(getPageName("/login")).toBe("LOGIN")
  })
})