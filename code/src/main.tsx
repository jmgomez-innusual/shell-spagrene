/* istanbul ignore file */
import "./assets/styles/custom.css";
import React from "react";
import ReactDOM from "react-dom/client";
import Auth from "@amiga-fwk-web/auth/auth";
import AuthSwitch from "@amiga-fwk-web/auth/auth-switch";
import ComponentEventsProvider from "@amiga-fwk-web/components-utils/component-events-provider";
import ConfigProvider from "@amiga-fwk-web/config/config-provider";
import IntlProvider from "@amiga-fwk-web/components-intl/intl-provider";
import AppAuthProvider from "@/components/auth-provider/auth-provider";
import Layout from "@/layout/layout";
import LogProvider from "@amiga-fwk-web/logging/log-provider";
import NotificationsProvider from "@amiga-fwk-web/components-feedback/notifications-provider";
import consoleTransport from "@amiga-fwk-web/logging/console-transport";
import logger from "@amiga-fwk-web/logging/logger";
import messages, { getLocales } from "@/locales";
import { AppRoutes } from "./routes";
import Login from "@amiga-fwk-web/components-login/login";
import { defaultErrorHandler } from "@amiga-fwk-web/errors";
import Router from "@/components/router-integration/router";
import loginBg from "./assets/img/login-bg.jpg";
import MicrofrontendsDevTools from "@/components/microfrontend-dev-tools/microfrontend-dev-tools";
import eventsSchemas from "@/eventbus";

const createLogger = () =>
  logger({
    transports: [consoleTransport()],
  });

const Application = () => (
  <ConfigProvider>
    {() => {
      return (
        <LogProvider logger={createLogger()}>
          <ComponentEventsProvider>
            <MicrofrontendsDevTools schemas={eventsSchemas} />
            <NotificationsProvider>
              <Auth provider={<AppAuthProvider />}>
                <IntlProvider supportedLocales={getLocales()} messages={messages}>
                  <AuthSwitch layout={<Login backgroundUrl={loginBg} />}>
                    <Router>
                      <Layout>
                        <AppRoutes />
                      </Layout>
                    </Router>
                  </AuthSwitch>
                </IntlProvider>
              </Auth>
            </NotificationsProvider>
          </ComponentEventsProvider>
        </LogProvider>
      );
    }}
  </ConfigProvider>
);

window.addEventListener("error", defaultErrorHandler);
window.addEventListener("unhandledrejection", defaultErrorHandler);

const container = document.getElementById("app") as HTMLElement;
const root = ReactDOM.createRoot(container);

root.render(<Application />);
