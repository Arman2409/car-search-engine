export default {
    content: [
        './index.html',
        './src/**/*.{html,js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                // ! Any changes here require corresponding updates in ./src/styles/colors.scss
                primary: "#3f5a7d",
                secondary: "#9edef7",
                accent: "#EC5228",
                neutral: "#7df74d",
            }
        },
    },
    plugins: [],
};