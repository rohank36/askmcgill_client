import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        iconsNotClicked: "#f9fafc",
        iconsClicked: "#ff5d62",
        regularText: "#7c7c7c",
        headlineText: "484848",
        mcgillRed: "#ed1b2f",
      },
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"], 
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
} satisfies Config;
