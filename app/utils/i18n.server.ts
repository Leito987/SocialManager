import frDictionary from "../dictionaries/fr.json";

// This will be expanded to support more languages in the future
export async function getDictionary(locale: string) {
  switch (locale) {
    case "fr":
      return frDictionary;
    default:
      return frDictionary; // Default to French
  }
}
