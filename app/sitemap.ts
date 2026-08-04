import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { products } from "@/config/products";
import { getAllPostsMeta } from "@/features/blog/mdx";

const staticRoutes = [
  "",
  "/empresa",
  "/servicios",
  "/productos",
  "/tecnologias",
  "/casos-de-exito",
  "/portafolio",
  "/planes",
  "/blog",
  "/faq",
  "/contacto",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${siteConfig.url}/productos/${product.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllPostsMeta().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticEntries, ...productEntries, ...blogEntries];
}
