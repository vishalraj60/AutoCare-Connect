/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        sidebar:         '#0B1220',
        'sidebar-hover': '#162035',
        'sidebar-active':'#162035',
        primary:         '#0F2A4A',
        accent:          '#2563EB',
        'bg-light':      '#EFF6FF',
        'page-bg':       '#F8FAFC',
        surface:         '#FFFFFF',
        border:          '#E2E8F0',
        'text-primary':  '#0F172A',
        'text-secondary':'#64748B',
        success:         '#16A34A',
        warning:         '#D97706',
        danger:          '#DC2626',
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0,0,0,0.07), 0 1px 2px -1px rgba(0,0,0,0.07)',
        'card-md': '0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.07)',
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
}
