/* eslint-disable @typescript-eslint/no-explicit-any */
/* istanbul ignore file */

import "./app-wrapper-feedback.css";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import IconWarningOutlined from "@amiga-fwk-web/icons/alerts/icon-warning-outlined";
import FeedbackState from "@amiga-fwk-web/components-feedback/feedback-state";

type Props = {
  error: boolean;
  message?: React.ReactNode;
};

export const AppWrapperFeedback: React.FC<Props> = ({ error, message }) => {
  const variants = {
    visible: {
      opacity: 1,
      transition: {
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
    <AnimatePresence>
      <motion.div className="appWrapperFeedback" initial="hidden" variants={variants} animate="visible" exit="hidden">
        {!error && <FeedbackState kind="loading" mainText={message} />}
        {error && <FeedbackState kind="custom" icon={<IconWarningOutlined />} mainText={message} />}
      </motion.div>
    </AnimatePresence>
  );
};

export default AppWrapperFeedback;
