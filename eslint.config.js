import tseslint from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';

export default [{
  files: ['src/**/*.{ts,tsx}'],
  languageOptions: { parser: tseslint, parserOptions: { ecmaFeatures: { jsx: true }, sourceType: 'module' } },
  plugins: { 'react-hooks': reactHooks },
  rules: { 'no-unused-vars': 'off', 'react-hooks/rules-of-hooks': 'error' },
}];
