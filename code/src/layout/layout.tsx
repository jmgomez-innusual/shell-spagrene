/* istanbul ignore file */

import "./layout.css";
import React from "react";
import { useNavigate, useMatch } from "react-router-dom";
import IOPMenuProvider from "@amiga-fwk-web/components-iop/iop-menu-provider";
import IOPDefaultLayout, { IOPHeaderLogo, IOPContentWrapper } from "@amiga-fwk-web/components-iop/iop-default-layout";
import IOPHeaderMenu from "@amiga-fwk-web/components-iop/iop-header-menu";
import IOPMenu from "@amiga-fwk-web/components-iop/iop-menu";
import NotificationContainer from "@amiga-fwk-web/components-feedback/notification-container";
import useMenu from "@/hooks/use-menu";
import { generateValidUrls } from "./app-menu";

type Props = {
  children?: React.ReactNode;
};

const PURPOUSE_URL_TEMPLATE = "/:product/:purpose/:feature";

const validUrls = generateValidUrls();

const Layout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const appMenu = useMenu();
  const match = useMatch(PURPOUSE_URL_TEMPLATE);

  let isValidUrl = false;
  if (match) {
    isValidUrl = validUrls.includes(match?.pathname);
  }

  let currentSectionId = match?.params?.product ?? "app";
  let currentSubsectionId = match?.params?.purpose ?? "home";
  let currentItemId = match?.params?.feature ?? "home";

  if (!isValidUrl) {
    currentSectionId = "app";
    currentSubsectionId = "home";
    currentItemId = "home";
  }

  return (
    <IOPMenuProvider
      sections={appMenu}
      currentSectionId={currentSectionId}
      currentSubsectionId={currentSubsectionId}
      currentItemId={currentItemId}
    >
      <IOPDefaultLayout
        menu={<IOPMenu />}
        headerStartSlot={
          <IOPHeaderLogo
            brand="inditex"
            onClick={() => {
              navigate("/");
            }}
          />
        }
        headerCenterSlot={isValidUrl && <IOPHeaderMenu itemsOverflow={{ m: 2, l: 3, xl: 4 }} />}
      >
        <IOPContentWrapper>{children}</IOPContentWrapper>
        <NotificationContainer />
      </IOPDefaultLayout>
    </IOPMenuProvider>
  );
};

export default Layout;
