/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-purple": "#081A51",
        "bar-violet": "#233142",
        "light-white": "rgba(255,255,255,0.17)",
        "blue-gray": "#88A9C3",
        "midnight-blue": "#2B4257",
        "navy-blue": "#14202E",
        "royal-blue": "#091235",
        "blue1": "#cdffd8",
        "blue2": "#3c77e9",
        "pink1": "#f276c9",
        "pinkwhite": "#f08dcf",
        "purple-1": "#cd1e93",
        "purple-black": "#5d0a4d",
        "white-1": "#ffffff",
        "yellow": "#f2da35",
      },
      width: {
        '180': '62rem',
      },
      height: {
        '180': '50rem',
      },
      backgroundImage: {
        'signup-bg': "url('./src/assets/Signup-Background.png')",
      },
      minHeight: {
        '128': '44rem',
      },
      fontFamily: {
        'IBM': ['IBM Plex Sans Thai Looped', 'sans-serif'],
        'Kanit': ['Kanit', 'sans-serif'],
        'Lato': ['Lato', 'sans-serif'],
        'Hind': ['Hind', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

