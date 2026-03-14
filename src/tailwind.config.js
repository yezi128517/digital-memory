/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 如果你的代码里用到了特殊的毛玻璃透明度，可以在这里扩展
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
