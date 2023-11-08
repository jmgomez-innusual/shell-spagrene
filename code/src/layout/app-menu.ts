/* istanbul ignore file */

import { IOPMenuAPI } from "@amiga-fwk-web/components-iop/iop-menu-provider";
import { NavigateFunction } from "react-router-dom";

type IOPMenuOptions = {
  api: IOPMenuAPI;
};

export const generateValidUrls = (): string[] => {
  const validUrls: string[] = [];
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const menu = appMenu(() => {});
  menu.forEach((sections) => {
    if (sections.subsections && sections.subsections.length > 0) {
      sections.subsections.forEach((subsection) => {
        if (subsection.items && subsection.items.length > 0) {
          subsection.items.forEach((item) => {
            validUrls.push(`/${sections.id}/${subsection.id}/${item.id}`);
          });
        }
      });
    }
  });
  return validUrls;
};

export const appMenu = (navigate: NavigateFunction) => [
  {
    id: "app",
    name: "App",
    subsections: [
      {
        id: "home",
        name: "Home",
        defaultItemId: "home",
        items: [
          {
            id: "home",
            name: "Home",
            onClick: (e: MouseEvent, { api }: IOPMenuOptions) => {
              e.preventDefault();
              navigate("/app/home/home");
              api.hideMenu();
            },
          },
        ],
      },
      {
        id: "config",
        name: "Configuration",
        defaultItemId: "webpack-base-configuration",
        items: [
          {
            id: "webpack-base-configuration",
            name: "Webpack base configuration",
            onClick: (e: MouseEvent, { api }: IOPMenuOptions) => {
              e.preventDefault();
              navigate("/app/config/webpack-base-configuration");
              api.hideMenu();
            },
          },
          {
            id: "setup-sass",
            name: "Setup Sass",
            onClick: (e: MouseEvent, { api }: IOPMenuOptions) => {
              e.preventDefault();
              navigate("/app/config/setup-sass");
              api.hideMenu();
            },
          },
        ],
      },
      {
        id: "products",
        name: "Products",
        defaultItemId: "list",
        items: [
          {
            id: "list",
            name: "List",
            onClick: (e: MouseEvent, { api }: IOPMenuOptions) => {
              e.preventDefault();
              navigate("/app/products/list");
              api.hideMenu();
            },
          },
        ],
      },
      {
        id: "aremote",
        name: "Remote",
        defaultItemId: "feature-a",
        items: [
          {
            id: "feature-a",
            name: "Block edit",
            onClick: (e: MouseEvent, { api }: IOPMenuOptions) => {
              e.preventDefault();
              navigate("/app/remote/block-edit");
              api.hideMenu();
            },
          },
        ],
      },
    ],
  },
];
