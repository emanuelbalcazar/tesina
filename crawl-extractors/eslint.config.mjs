import globals from "globals";
import pluginJs from "@eslint/js";


export default [
    { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    {
        rules: {
            indent: [
                "error",
                4
            ],
            quotes: [
                "error",
                "single"
            ],
            semi: [
                "error",
                "always"
            ],
            "no-undef": 0,
            "no-unused-vars": 0
        }
    }
];
