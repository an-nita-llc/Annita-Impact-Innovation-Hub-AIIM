import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
  canonical?: string;
  noindex?: boolean;
};

const SITE = "AIIM";

export function Seo({ title, description, canonical, noindex }: SeoProps) {
  useEffect(() => {
    document.title = `${title} | ${SITE}`;
    setMeta("description", description);
    setMeta("og:title", `${title} | ${SITE}`);
    setMeta("og:description", description);
    setMeta("twitter:title", `${title} | ${SITE}`);
    setMeta("twitter:description", description);
    if (noindex) setMeta("robots", "noindex, nofollow");
    else setMeta("robots", "index, follow");
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }
  }, [title, description, canonical, noindex]);

  return null;
}

function setMeta(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    if (name.startsWith("og:") || name.startsWith("twitter:")) {
      meta.setAttribute("property", name);
    } else {
      meta.setAttribute("name", name);
    }
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}