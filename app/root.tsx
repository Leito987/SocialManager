import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";

import "./tailwind.css";
import { useEffect } from "react";
import { getDictionary } from "./utils/i18n.server";
import { I18nProvider } from "./contexts/I18nContext";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,100..900;1,100..900&display=swap",
  },
];

export async function loader({ request }: LoaderFunctionArgs) {
  // Default to French as specified in requirements
  const locale = "fr";
  const dictionary = await getDictionary(locale);
  
  return json({
    locale,
    dictionary,
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { locale, dictionary } = useLoaderData<typeof loader>();

  // Set the HTML lang attribute based on the current locale
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <I18nProvider locale={locale} dictionary={dictionary}>
      <Outlet />
    </I18nProvider>
  );
}
