import { error4xx } from "config";
import { NextApiRequest, NextApiResponse } from "next";
import registerHandler from "utils/api/rest/register";

jest.mock("utils/validateObjectFields", () => ({
  __esModule: true,
  default: jest.fn(() => true),
}));
// the request will respond with `undefined` now
jest.mock("utils/api/rest/register/handleRegisterRequest");
// invalid methods
const methods = ["GET", "PUT", "PATCH", "DELETE"],
  res = {
    status: (code: number) => ({
      end: (message: string) => ({ code, message }),
    }),
  } as unknown as NextApiResponse,
  assertMethod = async (method: string) => {
    const req = { method } as NextApiRequest,
      response = await registerHandler(req, res),
      expectedResponse = { code: 400, message: error4xx };
    return expect(response).toMatchObject(expectedResponse);
  },
  tests = methods.map(assertMethod);

describe("registerHandler function", () => {
  it("responds with error if method is not `POST`.", () => {
    Promise.resolve(tests);
  });
  
  it("respond well with `POST` methods.", async () => {
    const postReq = { method: "POST" } as NextApiRequest;
    expect(await registerHandler(postReq, res)).toBeUndefined();
  });
});
