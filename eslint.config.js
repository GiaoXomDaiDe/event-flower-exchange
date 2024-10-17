import js from '@eslint/js'
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

export default [
  {
    // Ignore certain folders and files
    ignores: ['dist', 'vite.config.ts', 'node_modules', 'src/assets']
  },
  {
    // Apply ESLint configuration for JS/TS/React files
    files: ['*/.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020, // Set ECMAScript version
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true // Enable JSX
        }
      },
      globals: {
        ...globals.browser // Use browser-specific globals
      }
    },
    settings: {
      react: {
        version: 'detect' // Automatically detect React version
      }
    },
    plugins: {
      react, // React-specific linting rules
      'react-hooks': reactHooks, // React Hooks linting
      import: importPlugin, // Import linting rules
      'jsx-a11y': jsxA11y, // Accessibility linting
      prettier: eslintPluginPrettier, // Prettier for code formatting
      'react-refresh': reactRefresh // React Refresh linting
    },
    rules: {
      // ESLint recommended JS rules
      ...js.configs.recommended.rules,
      // React recommended rules and JSX runtime
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      // React Hooks recommended rules
      ...reactHooks.configs.recommended.rules,
      // Import plugin recommended rules
      ...importPlugin.configs.recommended.rules,
      // JSX accessibility recommended rules
      ...jsxA11y.configs.recommended.rules,

      // Prettier integration
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          semi: false,
          trailingComma: 'none',
          tabWidth: 2,
          endOfLine: 'auto',
          useTabs: false,
          singleQuote: true,
          printWidth: 120,
          jsxSingleQuote: true
        }
      ],

      // Disable import of React in React 17+ (JSX runtime)
      'react/react-in-jsx-scope': 'off',
      // Disable the rule for target="_blank"
      'react/jsx-no-target-blank': 'off',
      // Enable React Refresh only export components rule
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    }
  }
]
