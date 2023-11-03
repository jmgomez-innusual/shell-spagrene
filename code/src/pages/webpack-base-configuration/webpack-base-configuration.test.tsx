import React from "react";
import { render, screen } from "@testing-library/react";
import { AppWrapper } from "#/test.utils";
import WebpackBaseConfiguration from "@/pages/webpack-base-configuration/webpack-base-configuration";

jest.mock("@amiga-fwk-web/x-markdown/markdown", () => () => <div />);
jest.mock("@amiga-fwk-web/components-content/code-block", () =>
  jest.requireActual("@amiga-fwk-web/tools/testing/code-block-mock.jsx"),
);

describe("WebpackBaseConfiguration", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Default render", async () => {
    render(
      <AppWrapper>
        <WebpackBaseConfiguration testId="instanceId" />
      </AppWrapper>,
    );

    expect(screen.getByTestId("instanceId")).toBeInTheDocument();
  });
});
