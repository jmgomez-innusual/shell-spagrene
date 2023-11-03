import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { AppWrapper } from "#/test.utils";
import HomePageCard from "@/pages/home/home-card";

describe("HomePageCard", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Default render", async () => {
    const cardOnClick = jest.fn();

    render(
      <AppWrapper>
        <HomePageCard testId="instanceId" title="Test Title" content="Test Content" />
      </AppWrapper>,
    );

    fireEvent.click(screen.getByTestId("instanceId-homeCard"));

    expect(cardOnClick).toHaveBeenCalledTimes(0);
    expect(screen.getByTestId("instanceId-homeCardTitle")).toBeInTheDocument();
    expect(screen.getByTestId("instanceId-homeCardContent")).toBeInTheDocument();
  });

  test("Define an onClick event", async () => {
    const cardOnClick = jest.fn();

    render(
      <AppWrapper>
        <HomePageCard testId="instanceId" title="Test Title" content="Test Content" onClick={cardOnClick} />
      </AppWrapper>,
    );

    fireEvent.click(screen.getByTestId("instanceId-homeCard"));

    expect(cardOnClick).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId("instanceId-homeCardTitle")).toBeInTheDocument();
    expect(screen.getByTestId("instanceId-homeCardContent")).toBeInTheDocument();
  });
});
