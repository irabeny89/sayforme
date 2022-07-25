import { NextApiResponse } from "next";
import handleRequest from "utils/api/rest/register/handleRegisterRequest";
import handleRequestError from "utils/api/rest/handleRequestError";
// mock error handler
jest.mock("utils/api/rest/handleRequestError");
// mock db connecction call
jest.mock("utils/db");

describe("handleRequest function", () => {
  const reqbody = { email: "a@g.c", password: "pass", username: "mocker" };
  it("catches and handles errors", async () => {
    // empty res object will throw an error
    const res = {} as NextApiResponse,
      response = await handleRequest(reqbody, res);

    expect(response).toBeUndefined();
    expect(handleRequestError).toBeCalled();
  });
});
