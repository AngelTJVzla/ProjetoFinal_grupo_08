export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx,css,html}"
  ],
  safelist: [
    'bg-blue-600', 'hover:bg-blue-800', 'text-white', 'text-green-600',
    'bg-blue-700', 'bg-green-500', 'bg-red-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500', 'bg-gray-500',
    'bg-red-600', 'hover:bg-red-800', 'font-semibold', 'py-1', 'px-3', 'rounded', 'shadow'
  ],
  theme: { extend: {} },
  plugins: [],
}