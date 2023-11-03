/* istanbul ignore file */

import React, { useEffect } from "react";
import AppWrapperMfe from "@/components/app-wrapper-mfe/app-wrapper-mfe";
import useEventBus from "@amiga-fwk-web/components-microfrontends/use-event-bus";
import useAppStore from "@/stores/app-store";
import type { AppState } from "@/stores/app-store";
import type { CountStatePayload } from "@/eventbus";

type Props = {
  id: string;
  remote: string;
  title: string;
};

export const WorkshopRemote: React.FC<Props> = ({ id, remote, title }) => {
  const { counter } = useAppStore((state: AppState) => state.app[id]);
  const setCounter = useAppStore((state: AppState) => state.setCounter);
  const { listen } = useEventBus();

  useEffect(() => {
    return listen("SPAGRENE::count-state", ({ featureId, count }: CountStatePayload) => {
      setCounter(featureId, count);
    });
  }, [listen, setCounter]);

  return (
    <AppWrapperMfe
      key={id}
      id={id}
      name="aremote"
      microfrontend={remote}
      initialProps={{
        title,
        featureId: id,
        defaultCounter: counter,
      }}
    />
  );
};

export default WorkshopRemote;
