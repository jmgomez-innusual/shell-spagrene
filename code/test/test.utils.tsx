import React from "react";
import IntlProvider from "@amiga-fwk-web/components-intl/intl-provider";
import messages, { getLocales } from "@/locales";

type Props = {
  children?: React.ReactNode;
};

export const AppWrapper: React.FC<Props> = ({ children }) => {
  return (
    <IntlProvider defaultLocale={getLocales()[0]} supportedLocales={getLocales()} messages={messages}>
      {children}
    </IntlProvider>
  );
};
