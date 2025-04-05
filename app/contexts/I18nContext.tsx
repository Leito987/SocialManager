import { createContext, useContext } from "react";

type Dictionary = Record<string, string>;

interface I18nContextType {
  locale: string;
  dictionary: Dictionary;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({
  children,
  locale,
  dictionary,
}: {
  children: React.ReactNode;
  locale: string;
  dictionary: Dictionary;
}) {
  // Simple translation function that replaces parameters in the format {{param}}
  const t = (key: string, params?: Record<string, string | number>): string => {
    const value = dictionary[key] || key;
    
    if (!params) {
      return value;
    }

    return Object.entries(params).reduce(
      (acc, [paramKey, paramValue]) => 
        acc.replace(new RegExp(`{{${paramKey}}}`, "g"), String(paramValue)),
      value
    );
  };

  return (
    <I18nContext.Provider value={{ locale, dictionary, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  
  return context;
}
