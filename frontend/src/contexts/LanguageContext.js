import { createContext, useContext, useState } from "react";

const LangInfoContext = createContext();
const LangInfoUpdateContext = createContext();

export function useLangInfo() {
  return useContext(LangInfoContext);
}

export function useLangInfoUpdate() {
  return useContext(LangInfoUpdateContext);
}

export function LangInfoProvider({ children }) {
  const [langInfo, setLangInfo] = useState(null);

  function updateLangInfo(info) {
    setLangInfo(info);
  }

  return (
    <LangInfoContext.Provider value={langInfo}>
      <LangInfoUpdateContext.Provider value={updateLangInfo}>
        {children}
      </LangInfoUpdateContext.Provider>
    </LangInfoContext.Provider>
  );
}
