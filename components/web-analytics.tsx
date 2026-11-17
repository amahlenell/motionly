"use client";

import { Analytics } from "@vercel/analytics/next";

export function WebAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => {
        const url = new URL(event.url, window.location.origin);
        if (url.pathname === "/contact") url.searchParams.delete("website");
        url.hash = "";
        return { ...event, url: url.href };
      }}
    />
  );
}
