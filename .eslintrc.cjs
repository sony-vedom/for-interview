module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react-refresh"],
    extends: [
        "plugin:eslint-plugin-import/recommended",
        "plugin:react-hooks/recommended",
        "eslint-config-prettier",
        "prettier",
    ],
    env: {
        browser: true,
        es2020: true,
    },
    rules: {
        "react/react-in-jsx-scope": "off",
        "react/require-default-props": "off",
        "react/destructuring-assignment": "off",
        "react/jsx-props-no-spreading": "off",
        "consistent-return": "off",
        "import/order": [
            "error",
            {
                pathGroups: [
                    {pattern: "react", group: "builtin"},
                    {pattern: "vite", group: "builtin"},
                    {pattern: "pages/**", group: "internal"},
                    {pattern: "widgets/**", group: "internal"},
                    {pattern: "features/**", group: "internal"},
                    {pattern: "entities/**", group: "internal"},
                    {pattern: "shared/**", group: "internal"},
                ],
                pathGroupsExcludedImportTypes: ["builtin"],
                groups: [
                    "builtin",
                    "external",
                    "internal",
                    "parent",
                    "sibling",
                    "index",
                ],
                "newlines-between": "never",
                alphabetize: {order: "asc", caseInsensitive: true},
            },
        ],
        "no-restricted-imports": [
            "error",
            {
                patterns: [
                    {
                        group: [
                            "shared/*/*/**",
                            "entities/*/**",
                            "features/*/**",
                            "widgets/*/**",
                            "pages/*/**",
                            "app/**",
                        ],
                        message:
                            "Direct access to the internal parts of the module is prohibited",
                    },
                    {
                        group: [
                            "../**/shared",
                            "../**/entities",
                            "../**/features",
                            "../**/widgets",
                            "../**/pages",
                            "../**/app",
                        ],
                        message: "Prefer absolute imports instead of relatives",
                    },
                ],
            },
        ],
        "import/no-extraneous-dependencies": [
            "error",
            {devDependencies: ["./vite.config.tsx"]},
        ],
        "import/prefer-default-export": "off",
    },
    overrides: [
        {
            files: ["./src/**/*.ts", "./src/**/*.tsx"],
            extends: [
                "plugin:eslint-plugin-import/typescript",
            ],
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
                project: ["tsconfig.json"],
            },
            plugins: ["@typescript-eslint/eslint-plugin"],
            rules: {
                "@typescript-eslint/no-use-before-define": "off",
                "@typescript-eslint/no-throw-literal": "off",
                "@typescript-eslint/no-shadow": "off",
                "object-curly-newline": "off",
                "@typescript-eslint/indent": "off",
                "import/no-extraneous-dependencies": [
                    "error",
                    {
                        devDependencies: [
                            "**/msw/**",
                            "**/react-query/utils.tsx",
                            "**/react-navigation/utils.ts",
                        ],
                    },
                ],
            },
        }
    ],
    settings: {
        "import/resolver": {
            typescript: {
                alwaysTryTypes: true,
            },
        },
    },
}
