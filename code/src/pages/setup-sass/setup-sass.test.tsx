import React from "react";
import { render, screen } from "@testing-library/react";
import { AppWrapper } from "#/test.utils";
import SetupSass from "@/pages/setup-sass/setup-sass";

jest.mock("@amiga-fwk-web/x-markdown/markdown", () => () => <div />);

describe("SetupSass", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Default render", async () => {
    render(
      <AppWrapper>
        <SetupSass testId="instanceId" />
      </AppWrapper>,
    );

    expect(screen.getByTestId("instanceId")).toBeInTheDocument();
  });
});
