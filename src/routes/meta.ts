import { RouteLocationNormalized } from "vue-router";

const defaultTitle = "Page Title";
const defaultDescription = "Page Description";
const baseUrl = window.location.origin;

const setMetaTag = (name: string, content: string) => {
  let element = document.querySelector(`meta[name="${name}"]`);
  if (element) {
    element.setAttribute("content", content);
  } else {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    element.setAttribute("content", content);
    document.head.appendChild(element);
  }
};

export const updateMetaTags = (to: RouteLocationNormalized) => {
  document.title = (to.meta.title as string) || defaultTitle;

  setMetaTag(
    "description",
    (to.meta.description as string) || defaultDescription
  );
  setMetaTag("og:title", (to.meta.title as string) || defaultTitle);
  setMetaTag(
    "og:description",
    (to.meta.description as string) || defaultDescription
  );
  setMetaTag("og:url", baseUrl + to.fullPath);

  if (to.meta.image) {
    setMetaTag("og:image", baseUrl + (to.meta.image as string));
  } else {
    const existingImageTag = document.querySelector('meta[name="og:image"]');
    if (existingImageTag) {
      existingImageTag.remove();
    }
  }
};
