const { text } = require('stream/consumers')

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
        button3: {
          DEFAULT: "#F9FAFE",
          light: "#DFE3FA",
          dark: "#252945",
        },
        button4: {
          DEFAULT: "#373B53",
          light: "#7E88C3",
        },

        navSplitter: {
          DEFAULT: "#494E6E",
        },
        cardtext: {
          DEFAULT: "#858BB2",
        },
        cardBg: {
          DEFAULT: "#33D69F",
        },
        cardPending: {
          DEFAULT: "#FF8F00",
        },
      },
      fontSize: {
        'h1': ['32px', { lineHeight: '36px', letterSpacing: '-1px', fontWeight: '700' }], 
        'h2': ['20px', { lineHeight: '22px', letterSpacing: '-0.63px', fontWeight: '700' }], 
        'h3': ['16px', { lineHeight: '24px', letterSpacing: '-0.8px', fontWeight: '700' }], 
        'h3-small': ['12px', { lineHeight: '15px', letterSpacing: '-0.25px', fontWeight: '700' }], 
        'body1': ['12px', { lineHeight: '15px', letterSpacing: '-0.25px', fontWeight: '500' }],
        'body2': ['11px', { lineHeight: '18px', letterSpacing: '-0.23px', fontWeight: '500' }],
      },
      fontFamily: {
        'spartan': ['Spartan', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
