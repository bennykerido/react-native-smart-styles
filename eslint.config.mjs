import js from "@eslint/js";

export default [
    {
        ...js.configs.recommended,
        ignores: ["**/*.js"]
    },

    {
        rules: {
            "no-unused-vars": "warn",
            "no-undef": "warn"
        },
        ignores: ["**/*.js"]
    }
];
