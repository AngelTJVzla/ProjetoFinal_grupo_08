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
  theme: { 
    extend: {
      fontFamily: {
        'cice': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        'circe': ['Poppins', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        'jacksons-purple': {
          '50': '#e5f2ff',
          '100': '#d0e8ff',
          '200': '#abd2ff',
          '300': '#78b3ff',
          '400': '#4480ff',
          '500': '#1a4fff',
          '600': '#002eff',
          '700': '#0031ff',
          '800': '#002ade',
          '900': '#031ea4',
          '950': '#021064',
        },
      },
      scrollBehavior: {
        'smooth': 'smooth',
      },
      scrollPadding: {
        '70': '70px',
      }
    } 
  },
  plugins: [],
}