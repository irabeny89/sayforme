import { error4xx, error5xx } from "config";
import { NextApiResponse } from "next";
import handleRequestError from "utils/api/rest/handleRequestError";

jest.spyOn(console, "error").mockReturnValue(undefined);

describe("handleRequestError function", () => {
  const res = {
    status: (statusCode: number) => ({
      end: (errorMsg: string) => ({
        statusCode,
        errorMsg,
      }),
    }),
  } as unknown as NextApiResponse;

  it("responds with `4xx` type error for errors with code `11000`.", () => {
    const error = { code: 11000 },
      response = { statusCode: 406, errorMsg: error4xx };

    expect(handleRequestError(error, res)).toMatchObject(response);
  });

  it("responds with `4xx` type error for errors with `validation failed` messages.", () => {
    const error = { message: "validation failed" },
      response = { statusCode: 406, errorMsg: error4xx };

    expect(handleRequestError(error, res)).toMatchObject(response);
  });

  it("responds with `5xx` type error for any other errors.", () => {
    const error = {},
      response = { statusCode: 500, errorMsg: error5xx };

    expect(handleRequestError(error, res)).toMatchObject(response);
  });
});
