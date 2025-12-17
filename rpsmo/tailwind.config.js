// tailwind.config.js

module.exports = {
  content: [
    // This array tells Tailwind where your component files are located.
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // <--- This line is CRUCIAL!
  ],
  theme: {
    extend: {
      colors: {
        'sg-pink': '#ed1b76',
        'sg-magenta': '#f44786',
        'sg-teal': '#249f9c',
        'sg-dark-teal': '#037a76' 
      }
    }
  },
  plugins: [],
}