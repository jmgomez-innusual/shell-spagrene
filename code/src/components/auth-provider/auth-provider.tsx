/* eslint-disable @typescript-eslint/no-explicit-any */
/* istanbul ignore file */

import React from "react";
import useConfig from "@amiga-fwk-web/config/use-config";
import OAuth2Provider from "@amiga-fwk-web/auth-oauth2v2/oauth2-provider";
import MockAuthProvider from "@amiga-fwk-web/auth/mock-auth-provider";
import mockedUser from "./mocked-user";

const AppAuthProvider = (props: any) => {
  const config = useConfig();

  let mockAuth = false;
  try {
    mockAuth = config("amiga.commons.web.mockAuth.enabled", false);
  } catch (ex) {
    mockAuth = false;
  }

  if (mockAuth) {
    return <MockAuthProvider {...props} user={mockedUser} />;
  }

  return <OAuth2Provider {...props} />;
};

export default AppAuthProvider;
