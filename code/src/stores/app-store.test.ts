import useAppStore from "@/stores/app-store";
import { renderHook } from "@testing-library/react";
import { AppState } from "./app-store";

describe("AppStore", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Feature A counter initial state should be 10", async () => {
    const { result } = renderHook(() => useAppStore((state: AppState) => state.app["featureA"]));
    expect(result.current.counter).toBe(10);
  });

  test("Feature B counter initial state should be 0", async () => {
    const { result } = renderHook(() => useAppStore((state: AppState) => state.app["featureB"]));
    expect(result.current.counter).toBe(0);
  });

  test("Set Feature A counter to 11", async () => {
    const { result } = renderHook(() => useAppStore((state: AppState) => state.setCounter));
    result.current("featureA", 11);
    const { result: updatedResult } = renderHook(() => useAppStore((state: AppState) => state.app["featureA"]));
    expect(updatedResult.current.counter).toBe(11);
  });
});
