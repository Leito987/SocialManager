import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { I18nProvider } from "./contexts/I18nContext";
import { DemoProvider } from "./contexts/DemoContext";
import { AuthProvider } from "./contexts/AuthContext";
import { getDictionary } from "./utils/i18n.server";

import "./tailwind.css";

export const links: LinksFunction = () => [
  // Remove the cssBundleHref import that's causing the error
];

export async function loader({ request }: LoaderFunctionArgs) {
  // For now, we'll just use French as the default language
  const locale = "fr";
  const dictionary = await getDictionary(locale);
  
  return { locale, dictionary };
}

export default function App() {
  const { locale, dictionary } = useLoaderData<typeof loader>();
  
  return (
    <html lang={locale} className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <I18nProvider locale={locale} dictionary={dictionary}>
          <DemoProvider>
            <AuthProvider>
              <Outlet />
            </AuthProvider>
          </DemoProvider>
        </I18nProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
