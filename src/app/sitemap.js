export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL || "https://outmail.in";

  const routes = [
    {
      path: "",
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      path: "/Pricing",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      path: "/partnership",
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      path: "/Aboutus",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/mentorships",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/Contactus",
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
