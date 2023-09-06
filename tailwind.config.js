/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ttred': '#FE2C55',
        'ttblue': '#25F4EE'
      },
      width:{
        '58':'232px',
        '320':'320px',
        '380':'380px',
        '480':'480px',
        '520':'520px',
        '590':'590px',
        '620':'620px',
      },
      height:{
        '58':'232px',
        '320':'320px',
        '380':'380px',
        '480':'480px',
        '520':'520px',
        '590':'590px',
        '620':'620px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
