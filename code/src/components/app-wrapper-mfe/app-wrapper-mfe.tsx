/* eslint-disable @typescript-eslint/no-explicit-any */
/* istanbul ignore file */

import "./app-wrapper-mfe.css";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import useConfig from "@amiga-fwk-web/config/use-config";
import CodeBlock from "@amiga-fwk-web/components-content/code-block";
import Remote from "@amiga-fwk-web/components-microfrontends/remote";
import useIntl from "@amiga-fwk-web/components-intl/use-intl";
import AppWrapperFeedback from "@/components/app-wrapper-feedback/app-wrapper-feedback";

type Props = {
  id: string;
  name: string;
  microfrontend: string;
  initialProps: object;
};

export const AppWrapperMfe: React.FC<Props> = ({ id, name, microfrontend, initialProps }) => {
  const intl = useIntl();
  const config = useConfig();

  let activeDevRemotes = false;
  try {
    activeDevRemotes = config("amiga.commons.web.remotes.dev", false);
  } catch (ex) {
    activeDevRemotes = false;
  }

  const mfeVariants = {
    visible: {
      opacity: 1,
      transition: {
        delay: 0.25,
        ease: "easeOut",
        duration: 0.25,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        ease: "easeIn",
        duration: 0.25,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="appWrapperMicrofrontend"
        initial="hidden"
        variants={mfeVariants}
        animate="visible"
        exit="hidden"
      >
        <Remote
          id={id}
          className="remote"
          name={name}
          microfrontend={microfrontend}
          initialProps={initialProps}
          dev={activeDevRemotes}
          devFallback={
            <div className="appWrapperMicrofrontendDevFallback">
              <div className="containerDevFallback">
                <span className="containerDevFallback__label">Remote</span>
                <span className="containerDevFallback__value">{name}</span>
                <span className="containerDevFallback__label">Microfrontend</span>
                <span className="containerDevFallback__value">{microfrontend}</span>
                <span className="containerDevFallback__label">Instance ID</span>
                <span className="containerDevFallback__value">{id}</span>
              </div>
              <div className="containerDevFallbackInitialPropsContainer">
                <CodeBlock title="Initial Props" language="javascript">
                  {JSON.stringify(initialProps, null, 2)}
                </CodeBlock>
              </div>
            </div>
          }
          loadError={
            <AppWrapperFeedback
              error={true}
              message={intl.formatMessage({ id: "amigaComponentsMicrofrontends.remote.loadingError" })}
            />
          }
          remoteError={
            <AppWrapperFeedback
              error={true}
              message={intl.formatMessage({ id: "amigaComponentsMicrofrontends.remote.remoteError" })}
            />
          }
          fallback={<AppWrapperFeedback error={false} />}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default AppWrapperMfe;
