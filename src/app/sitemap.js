export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "https://outmail.in";

  const routes = ["", "/Aboutus", "/Contactus", "/Pricing", "/partnership"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
