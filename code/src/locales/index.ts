/* istanbul ignore file */
import shared from "./shared";

const messages = {
  es: {
    ...shared.es,
  },
  en: {
    ...shared.en,
  },
};

export const getLocales = () => Object.keys(messages);

export default messages;
