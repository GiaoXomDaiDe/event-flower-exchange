// eslint.config.js
import path from 'path'

// Import các plugin
import importPlugin from 'eslint-plugin-import'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import { default as eslintPluginPrettier } from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

// Cấu hình ESLint
export default [
  {
    ignores: ['dist', 'vite.config.ts', 'node_modules', 'src/assets']
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
      prettier: eslintPluginPrettier
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        node: {
          paths: [path.resolve()],
          extensions: ['.js', '.jsx']
        }
      }
    },
    rules: {
      // Sử dụng các rules mặc định
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...importPlugin.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      // Tích hợp Prettier
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
      // Tắt yêu cầu import React trong file JSX (React 17+)
      'react/react-in-jsx-scope': 'off',
      // Cảnh báo khi sử dụng target="_blank" mà không có rel="noreferrer"
      'react/jsx-no-target-blank': 'warn'
    }
  }
]
