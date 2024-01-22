/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bgWOSP': "url('/img/tlo-wosp-2024-2.png')",
      },
      dropShadow: {
        'WOSPshadow': ['', '-5px 0px 0px rgba(2, 3, 0)', '0px 5px 0px rgba(2, 3, 0)', '0px -5px 0px rgba(2, 3, 0)',
                       '-2.5px -2.5px 0px rgba(2, 3, 0)',  '2.5px -2.5px 0px rgba(2, 3, 0)',   '-2.5px 2.5px 0px rgba(2, 3, 0)',  '2.5px 2.5px 0px rgba(2, 3, 0)',
                       '-3px 0px 0px #fff', '0px -3px 0px #fff', '3px 0px 0px #fff', '0px 3px 0px #fff'],
        'WOSPshadow2': ['4px 0px 0px rgba(2, 3, 0)', '-4px 0px 0px rgba(2, 3, 0)', '0px 4px 0px rgba(2, 3, 0)', '0px -4px 0px rgba(2, 3, 0)',
                       '-2px -2px 0px rgba(2, 3, 0)',  '2px -2px 0px rgba(2, 3, 0)',   '-2px 2px 0px rgba(2, 3, 0)',  '2px 2px 0px rgba(2, 3, 0)',]
      },
      fontSize: {
        sm: '0.8rem',
        base: '1rem',
        xl: '1.25rem',
        '2xl': '1.563rem',
        '3xl': '1.953rem',
        '4xl': '2.441rem',
        '5xl': '3.052rem',
        'bigMain':'20rem',
      },
      colors: {
        'FINAŁ1': '#E5007E',
        'FINAŁ2': '#E20613',
        'FINAŁ3': '#EB6608',
        'FINAŁ4': '#EDB411',
        'FINAŁ5': '#F9F00B',
        '1ZST2024': '#1397D4',
        '2ZST2024': '#BCE1F5'
      },
      fontFamily: {
        Scansky: ['Scansky', "sans-serif"],
      },
      borderWidth: {
        '12': '12px',
      },
    },
  },
  plugins: [],
}

