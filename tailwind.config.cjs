module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // --- COLORES KEEPER (Hexadecimales Directos) ---
        'keeper-primary': '#bc7fff',
        'keeper-background-light': '#f7f6f8',
        'keeper-background-dark': '#1e0539',
        // Mantenemos 'primary' por si es usado en el código migrado (apunta al mismo color)
        primary: '#bc7fff',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
};
