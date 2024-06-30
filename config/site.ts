export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Quizz",
  description: "Quizz Examén Website",
  navItems: [
    {
      label: "Regresar",
      href: "/",
    },
  ],
  navMenuItems: [
    {
      label: "Regresar",
      href: "/",
    },
  ],
  components: {
    rules: "@/components/rules-modal",
  },
};