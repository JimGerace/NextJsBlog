/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      margin: {
        "0-auto": "0 auto",
      },
      textColor: {
        primary: "#409eff",
        white: "#ffffff",
        999: "#999",
        404040: "#404040",
      },
      borderRadius: {
        "50%": "50%",
      },
      borderWidth: {
        2: "2px",
        6: "6px",
      },
      borderColor: (theme) => ({
        ...theme("colors"),
        "2586a3": "#2586a3",
      }),
      width: {
        "1.5px": "1.5px",
      },
      boxShadow: {
        sm: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        "sm-base": "0 0 15px 0 rgba(0, 0, 0, .1)",
      },
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      f2f2f2: "#f2f2f2",
      mask: "hsla(0, 0%, 100%, .98)",
      "mobile-mask": "rgba(0, 0, 0, .5)",
      eee: "#eee",
      "menu-mask": "rgba(0,0,0, .1)",
      f5: "#f5f5f5",
      "727cf5": "#727cf5",
      a4a4a4: "#a4a4a4",
      f2f6fc: "#f2f6fc",
      "2586A3": "#2586A3",
      "1f2937": "#1f2937",
    }),
    borderWidth: {
      1: "1px",
      2: "2px",
    },
    minHeight: {
      28: "7rem",
    },
  },
  plugins: [],
};
