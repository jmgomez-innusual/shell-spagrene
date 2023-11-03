import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { AppWrapper } from "#/test.utils";
import HomePage from "@/pages/home/home";

describe("HomePage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Default render", async () => {
    render(
      <AppWrapper>
        <HomePage testId="instanceId" />
      </AppWrapper>,
    );

    expect(screen.getByTestId("instanceId")).toBeInTheDocument();
  });

  test("Click docs card", async () => {
    jest.spyOn(window, "open").mockImplementation();

    render(
      <AppWrapper>
        <HomePage testId="instanceId" />
      </AppWrapper>,
    );

    const docsButton = screen.getByTestId("instanceId-cardDocs-homeCard");
    fireEvent.click(docsButton);

    expect(window.open).toHaveBeenCalledTimes(1);
  });

  test("Click learn card", async () => {
    jest.spyOn(window, "open").mockImplementation();

    render(
      <AppWrapper>
        <HomePage testId="instanceId" />
      </AppWrapper>,
    );

    const docsButton = screen.getByTestId("instanceId-cardLearn-homeCard");
    fireEvent.click(docsButton);

    expect(window.open).toHaveBeenCalledTimes(1);
  });

  test("click design system card", async () => {
    jest.spyOn(window, "open").mockImplementation();

    render(
      <AppWrapper>
        <HomePage testId="instanceId" />
      </AppWrapper>,
    );

    const docsButton = screen.getByTestId("instanceId-cardDS-homeCard");
    fireEvent.click(docsButton);

    expect(window.open).toHaveBeenCalledTimes(1);
  });
});
