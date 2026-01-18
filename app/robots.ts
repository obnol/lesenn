import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/login", "/onboarding", "/[username]/new"],
    },
    sitemap: "https://www.lesenn.com/sitemap.xml",
  };
}
