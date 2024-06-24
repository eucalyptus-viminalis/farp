import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'app-tw': {
          DEFAULT: '#fff',
          light: '#fff',
          dark: '#17101f'
        },
        'mention-text': {
          DEFAULT: '#7c65c1',
          light: '#7c65c1',
          dark: '#c848ff'
        },
        'link': {
          DEFAULT: '#7c65c1',
          light: '#7c65c1',
          dark: '#c848ff'
        }
      }
    },
  },
  plugins: [],
};
export default config;
