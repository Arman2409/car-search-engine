export default {
    content: [
        './index.html',
        './src/**/*.{html,js,jsx,ts,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                // ! Any changes here require corresponding updates in ./src/styles/colors.scss
                primary: "#3F7D58",
                secondary: "#EFEFEF",
                accent: "#EC5228",
                neutral: "#ffcba3",
            }
        },
    },
    plugins: [],
};