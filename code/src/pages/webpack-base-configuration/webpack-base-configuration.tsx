import "./webpack-base-configuration.css";
import React from "react";
import PageProperties from "@amiga-fwk-web/components-layout/page-properties";
import { motion, AnimatePresence } from "framer-motion";
import Grid, { Row, Col } from "@amiga-fwk-web/components-layout/grid";
import Markdown from "@amiga-fwk-web/x-markdown/markdown";
import useLocale from "@amiga-fwk-web/components-intl/use-locale";
import useIntl from "@amiga-fwk-web/components-intl/use-intl";
import CodeBlock from "@amiga-fwk-web/components-content/code-block";
import enwebpackBaseConfigurationText from "./webpack-base-configuration.en.md";
import eswebpackBaseConfigurationText from "./webpack-base-configuration.es.md";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import file from "!raw-loader!./../../../config/webpack.config.js";

type Props = {
  testId?: string;
};

type MarkdownContent = {
  [key: string]: string;
};

const webpackBaseConfigurationContent: MarkdownContent = {
  en: enwebpackBaseConfigurationText,
  es: eswebpackBaseConfigurationText,
};

export const WebpackBaseConfiguration: React.FC<Props> = ({ testId }) => {
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

  const selectedMarkdownContent: string = (webpackBaseConfigurationContent as MarkdownContent)[currentLocale];

  return (
    <>
      <PageProperties title={intl.formatMessage({ id: "app.webpackBaseConfiguration.title" })} />
      <AnimatePresence mode="wait">
        <motion.div
          className="webpackBaseConfiguration"
          initial="hidden"
          variants={pageVariants}
          animate="visible"
          exit="hidden"
          data-testid={testId}
        >
          <Grid type="fluid">
            <Row>
              <Col>
                <div className="webpackBaseConfiguration__Container">
                  <div className="webpackBaseConfiguration__ContainerContent">
                    <Markdown className="webpackBaseConfiguration__ContainerMarkdown">
                      {selectedMarkdownContent}
                    </Markdown>
                    <CodeBlock className="webpackBaseConfiguration__ContainerMarkdown" language="javascript">
                      {file}
                    </CodeBlock>
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

export default WebpackBaseConfiguration;
