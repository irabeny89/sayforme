import { NextApiRequest, NextApiResponse } from "next";
import restHandler from "pages/api/rest";
import { error4xx } from "config";
import handlers from "utils/rest";

jest.mock("utils/rest");

const res = {
  status: jest.fn((statusCode: number) => ({
      statusCode,
      end: jest.fn((message: string) => ({ message, statusCode })),
    })),
  } as unknown as NextApiResponse,
  failResponse = { statusCode: 400, message: error4xx },
  registerResponse = "register handled",
  loginResponse = "login handled";
  
  // @ts-ignore
  handlers.register = jest.fn().mockResolvedValue(registerResponse)
  handlers.login = jest.fn().mockResolvedValue(loginResponse)

describe("REST Handler", () => {
  it("fails requests without `action` field or with invalid value in their body", async () => {
    const req1 = { body: {} } as NextApiRequest,
      req2 = { body: { action: "invalid entry" } } as NextApiRequest,
      response1 = await restHandler(req1, res),
      response2 = await restHandler(req2, res);

    expect(response1).toMatchObject(failResponse);
    expect(response2).toMatchObject(failResponse);
    expect(response2).not.toMatchObject({ invalid: "something" });
  });

  it("accepts `register` and `login` actions", async () => {
    const req1 = { body: { action: "register" } } as NextApiRequest,
      req2 = { body: { action: "login" } } as NextApiRequest,
      response1 = await restHandler(req1, res),
      response2 = await restHandler(req2, res);

    expect(response1).toBe(registerResponse)
    expect(response2).toBe(loginResponse)
  });
});
