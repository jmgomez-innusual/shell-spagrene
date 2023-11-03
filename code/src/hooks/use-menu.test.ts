import { renderHook } from "@testing-library/react";
import useMenu from "@/hooks/use-menu";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(() => "test"),
}));

describe("useMenu hook", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("get", async () => {
    const { result } = renderHook(() => useMenu());
    expect(result.current).toHaveLength(1);
  });
});
