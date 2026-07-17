/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        theme: "var(--theme-radius, 0.75rem)",
      },
      colors: {
        sutra: {
          base: "#cccec0",
          accent: "#d89d03",
          deep: "#302300",
          white: "#ffffff",
        }
      },
      fontFamily: {
        display: ["Anton", "sans-serif"],
        heading: ["Outfit", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
      animation: {
        'bob': 'bob 1.6s ease-in-out infinite',
      },
      keyframes: {
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(10px)' },
        }
      }
    },
  },
  plugins: [],
}
