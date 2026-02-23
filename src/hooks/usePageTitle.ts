import { useEffect } from "react";
import { useMatches } from "react-router-dom";

const APP_NAME = "Spending Insights Hub";

export const usePageTitle = () => {
  const matches = useMatches();
  const match = matches.find((m) => (m.handle as { title?: string })?.title);
  const title = (match?.handle as { title?: string })?.title;

  useEffect(() => {
    document.title = title ? `${title} | ${APP_NAME}` : APP_NAME;

    return () => {
      document.title = APP_NAME;
    };
  }, [title]);
};
