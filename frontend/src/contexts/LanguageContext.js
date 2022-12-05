import { createContext, useContext, useState } from "react";

const LangContext = createContext();
const LangUpdateContext = createContext();

export function useLang() {
  return useContext(LangContext);
}

export function useLangUpdate() {
  return useContext(LangUpdateContext);
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(null);

  function updateLang(info) {
    setLang(info);
  }

  return (
    <LangContext.Provider value={lang}>
      <LangUpdateContext.Provider value={updateLang}>
        {children}
      </LangUpdateContext.Provider>
    </LangContext.Provider>
  );
}
