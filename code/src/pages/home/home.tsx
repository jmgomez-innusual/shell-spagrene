import "./home.css";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Grid, { Row, Col } from "@amiga-fwk-web/components-layout/grid";
import useIntl from "@amiga-fwk-web/components-intl/use-intl";
import amigaLogo from "./amiga-logo.svg";
import HomePageCard from "./home-card";

type Props = {
  testId?: string;
};

export const HomePage: React.FC<Props> = ({ testId }) => {
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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="homePage"
        initial="hidden"
        variants={pageVariants}
        animate="visible"
        exit="hidden"
        data-testid={testId}
      >
        <Grid type="fluid">
          <Row>
            <Col>
              <div className="homePageContainer">
                <div className="homePageContainerCenter">
                  <div className="homePageContainerAFW">
                    <div className="homePageContainerAFW__logo">
                      <img src={amigaLogo} />
                      <div className="homePageContainerAFW__titleContainer">
                        <div className="homePageContainerAFW__title">AMIGA Framework Web</div>
                        <div className="homePageContainerAFW__type">
                          {intl.formatMessage({ id: "app.homePage.type.label" })}
                        </div>
                      </div>
                    </div>
                    <div className="homePageContainerAFW__version">10</div>
                  </div>
                </div>
                <div className="homePageContainerFooter">
                  <div className="homePageContainerCards">
                    <HomePageCard
                      testId={`${testId}-cardDocs`}
                      onClick={() => {
                        window.open("https://amiga-web.docs.inditex.dev/fwk-amigaweb/latest");
                      }}
                      title={intl.formatMessage({ id: "app.homePage.card.title.docs" })}
                      content={intl.formatMessage({ id: "app.homePage.card.content.docs" })}
                    />
                    <HomePageCard
                      testId={`${testId}-cardLearn`}
                      onClick={() => {
                        window.open("https://apps.inditex.com/devportal/iop-codelabs?clb_t=pathway%2Ccodelab");
                      }}
                      title={intl.formatMessage({ id: "app.homePage.card.title.learn" })}
                      content={intl.formatMessage({ id: "app.homePage.card.content.learn" })}
                    />
                    <HomePageCard
                      testId={`${testId}-cardDS`}
                      onClick={() => {
                        window.open(
                          "https://amiga-web.docs.inditex.dev/fwk-amigaweb/latest/guides/design-foundations/introduction.html",
                        );
                      }}
                      title={intl.formatMessage({ id: "app.homePage.card.title.designSystem" })}
                      content={intl.formatMessage({ id: "app.homePage.card.content.designSystem" })}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
      </motion.div>
    </AnimatePresence>
  );
};

export default HomePage;
