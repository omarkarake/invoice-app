/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7C5DFA",
          light: "#9277FF",
        },
        secondary: {
          dark: "#1E2139", 
          darker: "#252945", 
        },
        accent: {
          light: "#DFE3FA", 
          muted: "#888EB0", 
          medium: "#7E88C3", 
          dark: "#0C0E16", 
        },
        danger: {
          DEFAULT: "#EC5757",
          light: "#FF9797",
        },
        background: {
          light: "#F8F8FB",
          dark: "#141625",
        },
      },
    },
  },
  plugins: [],
};
