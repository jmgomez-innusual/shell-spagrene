/* istanbul ignore file */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { contextPath } from "@amiga-fwk-web/env";
import type { PropsWithChildren } from "react";

const NORMALIZE_BASENAME_REGEX = /\/$/;

const Router = ({ children }: PropsWithChildren) => (
  <BrowserRouter basename={contextPath().replace(NORMALIZE_BASENAME_REGEX, "")}>{children}</BrowserRouter>
);

export default Router;
