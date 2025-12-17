import { defineConfig, globalIgnores } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores([
    "**/dist/",
    "**/node_modules",
    "**/node_modules",
    "**/dist",
    "**/tsdown.config.ts",
    "**/vitest.config.ts",
    'eslint.config.mjs'
]), {
    extends: compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended"),

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "commonjs",

        parserOptions: {
            project: ["./tsconfig.json"],
        },
    },

    rules: {
        "no-inner-declarations": 0,
        "no-useless-escape": 1,
        "@typescript-eslint/ban-ts-comment": 1,
        "@typescript-eslint/no-extra-semi": 0,
        "@typescript-eslint/no-shadow": 2,
        "@typescript-eslint/ban-types": 0,
        "@typescript-eslint/no-namespace": 0,
    },
}, {
    files: ["src/**/*.js", "src/**/*.ts"],

    rules: {
        "prefer-const": "off",
    },
}]);