import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        lamaSky: "#C3EBFA",
        lamaSkyLite: "#EDF9FD",
        lamaPurple: "#CFCEFF",
        lamaPurpleLite: "#F1F0FF",
        lamaYellow: "#FAE27C",
        lamaYellowLite: "#FEDCE8",
      },
    },
  },
  plugins: [],
} satisfies Config;
