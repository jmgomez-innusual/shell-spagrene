import { renderHook } from "@testing-library/react";
import useApi from "@/hooks/use-api";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: "success" }),
  }),
) as jest.Mock;

describe("useApi hook", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("get", async () => {
    const { result } = renderHook(() => useApi());
    (jest.spyOn(result.current, 0) as jest.Mock).mockImplementation(() => {
      return Promise.resolve({ json: () => Promise.resolve({ message: "success" }) });
    });
    const returned = await (await result.current[0]("http://mocked.url/test")).json();
    expect(returned).toStrictEqual({ message: "success" });
  });
});
