import "./setup-sass.css";
import React from "react";
import PageProperties from "@amiga-fwk-web/components-layout/page-properties";
import { motion, AnimatePresence } from "framer-motion";
import Grid, { Row, Col } from "@amiga-fwk-web/components-layout/grid";
import Markdown from "@amiga-fwk-web/x-markdown/markdown";
import useLocale from "@amiga-fwk-web/components-intl/use-locale";
import useIntl from "@amiga-fwk-web/components-intl/use-intl";
import enSetupSassText from "./setup-sass.en.md";
import esSetupSassText from "./setup-sass.es.md";

type Props = {
  testId?: string;
};

type MarkdownContent = {
  [key: string]: string;
};

const setupSassContent: MarkdownContent = {
  en: enSetupSassText,
  es: esSetupSassText,
};

export const SetupSass: React.FC<Props> = ({ testId }) => {
  const { currentLocale } = useLocale();
  const intl = useIntl();

  const pageVariants = {
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

  const selectedMarkdownContent: string = (setupSassContent as MarkdownContent)[currentLocale];

  return (
    <>
      <PageProperties title={intl.formatMessage({ id: "app.setupSass.title" })} />
      <AnimatePresence mode="wait">
        <motion.div
          className="setupSass"
          initial="hidden"
          variants={pageVariants}
          animate="visible"
          exit="hidden"
          data-testid={testId}
        >
          <Grid type="fluid">
            <Row>
              <Col>
                <div className="setupSass__Container">
                  <div className="setupSass__ContainerContent">
                    <Markdown className="setupSass__ContainerMarkdown">{selectedMarkdownContent}</Markdown>
                  </div>
                </div>
              </Col>
            </Row>
          </Grid>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default SetupSass;
