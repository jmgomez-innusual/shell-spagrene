/* eslint-disable @typescript-eslint/no-explicit-any */
/* istanbul ignore file */

import React from "react";
import Devtools from "@amiga-fwk-web/devtools/devtools";
import ComponentEventsDevtool from "@amiga-fwk-web/devtools/component-events-devtool";
import useConfig from "@amiga-fwk-web/config/use-config";

type Props = {
  schemas: any[];
};

const mergeSchemas = (...schemas: any) => ({
  $defs: {
    ...schemas.reduce((acc: any, cs: any) => ({ ...acc, ...cs["$defs"] }), {}),
  },
});

const MicrofrontendsDevTools: React.FC<Props> = ({ schemas }) => {
  const config = useConfig();

  let activeDevTools = false;
  try {
    activeDevTools = config("amiga.commons.web.devTools.enabled", false);
  } catch (ex) {
    activeDevTools = false;
  }

  if (!activeDevTools) {
    return null;
  }

  return (
    <Devtools>
      <ComponentEventsDevtool schema={mergeSchemas(...schemas)} />
    </Devtools>
  );
};

export default MicrofrontendsDevTools;
