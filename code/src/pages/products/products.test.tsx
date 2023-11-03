import React from "react";
import { render, waitFor, fireEvent, screen } from "@testing-library/react";
import { AppWrapper } from "#/test.utils";
import ProductsPage from "@/pages/products/products";
import getProducts from "@/rest-clients/wscproducts/get-products";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: "success" }),
  }),
) as jest.Mock;

jest.mock("@/rest-clients/wscproducts/get-products");

jest.mock(
  "react-virtualized-auto-sizer",
  () =>
    ({ children }: { children: (size: { width: number; height: number }) => React.ReactNode }) => {
      return children({ width: 1280, height: 1024 });
    },
);

const mockGetEndpoint = jest.fn();
jest.mock("@amiga-fwk-web/config/use-config", () => {
  return {
    ["__esModule"]: true,
    default: () => ({
      getEndpoint: mockGetEndpoint,
    }),
  };
});

Object.defineProperty(window, "matchMedia", {
  value: () => {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  },
});

describe("ProductsPage", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("Loader visible", async () => {
    mockGetEndpoint.mockImplementation((): string => "http://test.com");
    (getProducts as jest.Mock).mockImplementation(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ ok: true, json: () => Promise.resolve([{ id: "product-id", name: "Product Name" }]) } as Response);
        }, 2000);
      });
    });

    render(
      <AppWrapper>
        <ProductsPage testId="instanceId" />
      </AppWrapper>,
    );

    expect(screen.getByTestId("instanceId-loader")).toBeInTheDocument();
    expect(getProducts).toHaveBeenCalledTimes(1);
    const productList = screen.queryByTestId("instanceId-list");
    expect(productList).toBeNull();
  });

  test("Products fetched OK", async () => {
    mockGetEndpoint.mockImplementation((): string => "http://test.com");
    (getProducts as jest.Mock).mockResolvedValueOnce([{ id: "product-id", name: "Product Name" }]);

    render(
      <AppWrapper>
        <ProductsPage testId="instanceId" />
      </AppWrapper>,
    );

    await waitFor(() => screen.getByTestId("instanceId-list"));
    expect(getProducts).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("instanceId-list")).toBeInTheDocument();
    expect(screen.getByTestId("instanceId-list-element-product-id")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("instanceId-list-element-product-id"));

    expect(screen.getByTestId("instanceId-list-element-product-id")).toBeInTheDocument();
  });

  test("Products fetched KO", async () => {
    mockGetEndpoint.mockImplementation((): string => "http://test.com");
    (getProducts as jest.Mock).mockRejectedValueOnce(new Error("Failed fetch"));

    render(
      <AppWrapper>
        <ProductsPage testId="instanceId" />
      </AppWrapper>,
    );

    await waitFor(() => screen.getByTestId("instanceId-list"));
    expect(getProducts).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("instanceId-list")).toBeInTheDocument();
    const productListItem = screen.queryByTestId("instanceId-list-element-product-id");
    expect(productListItem).toBeNull();
  });
});
