import en from "./en";
import de from "./de";
import it from "./it";

const Languages = {
  en,
  de,
  it,
};

export type LanguageKey = keyof typeof en;

export default Languages;